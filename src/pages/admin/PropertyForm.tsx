import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import DynamicListInput from '@/components/admin/DynamicListInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

const PropertyForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!slug;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: '',
    type: 'locacao' as 'locacao' | 'venda',
    category: 'Residencial' as 'Residencial' | 'Comercial',
    price: '',
    period: '/mês',
    description: '',
    area: '',
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    features: [] as string[],
    images: [] as string[],
    is_active: true,
  });

  useEffect(() => {
    if (isEditing) {
      fetchProperty();
    }
  }, [slug]);

  const fetchProperty = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      toast({
        title: 'Erro ao carregar imóvel',
        description: error?.message || 'Imóvel não encontrado',
        variant: 'destructive',
      });
      navigate('/admin/imoveis');
      return;
    }

    setFormData({
      title: data.title,
      slug: data.slug,
      location: data.location,
      type: data.type as 'locacao' | 'venda',
      category: data.category as 'Residencial' | 'Comercial',
      price: data.price?.toString() || '',
      period: data.period || '/mês',
      description: data.description || '',
      area: data.area || '',
      bedrooms: data.bedrooms || 0,
      bathrooms: data.bathrooms || 0,
      parking: data.parking || 0,
      features: data.features || [],
      images: data.images || [],
      is_active: data.is_active,
    });
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const propertyData = {
      title: formData.title,
      slug: formData.slug,
      location: formData.location,
      type: formData.type,
      category: formData.category,
      price: formData.price ? parseFloat(formData.price) : null,
      period: formData.type === 'locacao' ? formData.period : null,
      description: formData.description,
      area: formData.area || null,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      parking: formData.parking,
      features: formData.features,
      images: formData.images,
      is_active: formData.is_active,
    };

    let error;

    if (isEditing) {
      const result = await supabase
        .from('properties')
        .update(propertyData)
        .eq('slug', slug);
      error = result.error;
    } else {
      const result = await supabase.from('properties').insert([propertyData]);
      error = result.error;
    }

    if (error) {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive',
      });
      setSaving(false);
      return;
    }

    toast({
      title: isEditing ? 'Imóvel atualizado' : 'Imóvel criado',
      description: 'As alterações foram salvas com sucesso.',
    });

    navigate('/admin/imoveis');
  };

  if (loading) {
    return (
      <AdminLayout title="Carregando...">
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? 'Editar Imóvel' : 'Novo Imóvel'}>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Nome do imóvel"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="nome-do-imovel"
                  disabled={isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localização Completa *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="Endereço completo (ex: Rua, Número, Bairro, Cidade - Estado)"
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label>Tipo *</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value as 'locacao' | 'venda' }))
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="locacao" id="locacao" />
                    <Label htmlFor="locacao" className="cursor-pointer">Locação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="venda" id="venda" />
                    <Label htmlFor="venda" className="cursor-pointer">Venda</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Categoria *</Label>
                <RadioGroup
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value as 'Residencial' | 'Comercial' }))
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Residencial" id="residencial" />
                    <Label htmlFor="residencial" className="cursor-pointer">Residencial</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Comercial" id="comercial" />
                    <Label htmlFor="comercial" className="cursor-pointer">Comercial</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              {formData.type === 'locacao' && (
                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Input
                    id="period"
                    value={formData.period}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, period: e.target.value }))
                    }
                    placeholder="/mês"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Descrição detalhada do imóvel..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Detalhes do Imóvel */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Imóvel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="area">Área</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, area: e.target.value }))
                  }
                  placeholder="Ex: 65m²"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Quartos</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bedrooms: parseInt(e.target.value) || 0 }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Banheiros</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bathrooms: parseInt(e.target.value) || 0 }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parking">Vagas</Label>
                <Input
                  id="parking"
                  type="number"
                  min="0"
                  value={formData.parking}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, parking: parseInt(e.target.value) || 0 }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Características */}
        <Card>
          <CardHeader>
            <CardTitle>Características e Comodidades</CardTitle>
          </CardHeader>
          <CardContent>
            <DynamicListInput
              items={formData.features}
              onChange={(features) => setFormData((prev) => ({ ...prev, features }))}
              placeholder="Adicionar característica (ex: Ar condicionado)"
            />
          </CardContent>
        </Card>

        {/* Imagens */}
        <Card>
          <CardHeader>
            <CardTitle>Imagens</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              images={formData.images}
              onChange={(images) => setFormData((prev) => ({ ...prev, images }))}
              folder="properties"
              maxImages={10}
            />
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Imóvel Ativo</Label>
                <p className="text-sm text-muted-foreground">
                  Imóveis inativos não aparecem no site
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(is_active) =>
                  setFormData((prev) => ({ ...prev, is_active }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isEditing ? 'Salvar Alterações' : 'Criar Imóvel'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/imoveis')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default PropertyForm;
