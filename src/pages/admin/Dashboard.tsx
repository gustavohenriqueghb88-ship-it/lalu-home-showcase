import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Building2, Home, Plus, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      const [projectsRes, propertiesRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('properties').select('id', { count: 'exact', head: true }),
      ]);

      setProjectsCount(projectsRes.count || 0);
      setPropertiesCount(propertiesRes.count || 0);
      setLoading(false);
    };

    fetchCounts();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Empreendimentos
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? '...' : projectsCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total de empreendimentos cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Imóveis no Portfólio
              </CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? '...' : propertiesCount}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total de imóveis disponíveis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-secondary" />
                Empreendimentos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Gerencie os empreendimentos da Lalu Adm, incluindo loteamentos e condomínios.
              </p>
              <div className="flex gap-2">
                <Link to="/admin/empreendimentos/novo">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Empreendimento
                  </Button>
                </Link>
                <Link to="/admin/empreendimentos">
                  <Button variant="outline" size="sm">
                    Ver Todos
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-accent" />
                Portfólio de Imóveis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Gerencie imóveis para locação e venda, incluindo residenciais e comerciais.
              </p>
              <div className="flex gap-2">
                <Link to="/admin/imoveis/novo">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Imóvel
                  </Button>
                </Link>
                <Link to="/admin/imoveis">
                  <Button variant="outline" size="sm">
                    Ver Todos
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
