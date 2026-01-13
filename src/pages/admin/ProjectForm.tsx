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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';

const ProjectForm = () => {
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
    type: 'Loteamento',
    status: 'Disponível',
    description: '',
    price: '',
    features: [] as string[],
    highlights: [] as string[],
    images: [] as string[],
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    if (isEditing) {
      fetchProject();
    }
  }, [slug]);

  const fetchProject = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      toast({
        title: 'Erro ao carregar empreendimento',
        description: error?.message || 'Empreendimento não encontrado',
        variant: 'destructive',
      });
      navigate('/admin/empreendimentos');
      return;
    }

    setFormData({
      title: data.title,
      slug: data.slug,
      location: data.location,
      type: data.type,
      status: data.status,
      description: data.description || '',
      price: data.price || '',
      features: data.features || [],
      highlights: data.highlights || [],
      images: data.images || [],
      is_featured: data.is_featured,
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

    const projectData = {
      title: formData.title,
      slug: formData.slug,
      location: formData.location,
      type: formData.type,
      status: formData.status,
      description: formData.description,
      price: formData.price || null,
      features: formData.features,
      highlights: formData.highlights,
      images: formData.images,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
    };

    let error;

    if (isEditing) {
      const result = await supabase
        .from('projects')
        .update(projectData)
        .eq('slug', slug);
      error = result.error;
    } else {
      const result = await supabase.from('projects').insert([projectData]);
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
      title: isEditing ? 'Empreendimento atualizado' : 'Empreendimento criado',
      description: 'As alterações foram salvas com sucesso.',
    });

    navigate('/admin/empreendimentos');
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
    <AdminLayout title={isEditing ? 'Editar Empreendimento' : 'Novo Empreendimento'}>
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
                  placeholder="Nome do empreendimento"
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
                  placeholder="nome-do-empreendimento"
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

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Tipo *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Loteamento">Loteamento</SelectItem>
                    <SelectItem value="Condomínio">Condomínio</SelectItem>
                    <SelectItem value="Residencial">Residencial</SelectItem>
                    <SelectItem value="Comercial">Comercial</SelectItem>
                    <SelectItem value="Logístico">Logístico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Em obras">Em obras</SelectItem>
                    <SelectItem value="Lançamento">Lançamento</SelectItem>
                    <SelectItem value="Vendido">Vendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço/Condição</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="Ex: A partir de R$ 100.000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Descrição detalhada do empreendimento..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Características */}
        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DynamicListInput
              items={formData.features}
              onChange={(features) => setFormData((prev) => ({ ...prev, features }))}
              placeholder="Adicionar característica (ex: 71 lotes disponíveis)"
              label="Características do Empreendimento"
            />
          </CardContent>
        </Card>

        {/* Diferenciais */}
        <Card>
          <CardHeader>
            <CardTitle>Diferenciais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DynamicListInput
              items={formData.highlights}
              onChange={(highlights) => setFormData((prev) => ({ ...prev, highlights }))}
              placeholder="Adicionar diferencial (ex: Ruas asfaltadas)"
              label="Diferenciais do Empreendimento"
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
              folder="projects"
              maxImages={10}
            />
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Empreendimento Ativo</Label>
                <p className="text-sm text-muted-foreground">
                  Empreendimentos inativos não aparecem no site
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(is_active) =>
                  setFormData((prev) => ({ ...prev, is_active }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Destacar na Home</Label>
                <p className="text-sm text-muted-foreground">
                  Exibir este empreendimento em destaque na página inicial
                </p>
              </div>
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(is_featured) =>
                  setFormData((prev) => ({ ...prev, is_featured }))
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
            {isEditing ? 'Salvar Alterações' : 'Criar Empreendimento'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/empreendimentos')}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default ProjectForm;
