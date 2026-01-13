import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  category: string;
  price: number | null;
  period: string | null;
  is_active: boolean;
  images: string[];
  created_at: string;
}

const PropertiesList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro ao carregar imóveis',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('properties').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Erro ao excluir',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Imóvel excluído',
        description: 'O imóvel foi removido com sucesso.',
      });
      fetchProperties();
    }
  };

  const formatPrice = (price: number | null, period: string | null) => {
    if (!price) return 'Consulte';
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
    return period ? `${formatted}${period}` : formatted;
  };

  return (
    <AdminLayout title="Imóveis do Portfólio">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Gerencie os imóveis disponíveis para locação e venda
          </p>
          <Link to="/admin/imoveis/novo">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Imóvel
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : properties.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                Nenhum imóvel cadastrado ainda.
              </p>
              <Link to="/admin/imoveis/novo">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Imóvel
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {properties.map((property) => (
              <Card key={property.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      {property.images?.[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          Sem imagem
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg truncate">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {property.location}
                          </div>
                          <p className="text-lg font-bold text-secondary mt-1">
                            {formatPrice(property.price, property.period)}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap justify-end">
                          <Badge variant={property.is_active ? 'default' : 'secondary'}>
                            {property.is_active ? 'Ativo' : 'Inativo'}
                          </Badge>
                          <Badge variant={property.type === 'locacao' ? 'outline' : 'default'}>
                            {property.type === 'locacao' ? 'Locação' : 'Venda'}
                          </Badge>
                          <Badge variant="outline">{property.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Link to={`/admin/imoveis/${property.slug}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir "{property.title}"? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(property.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PropertiesList;
