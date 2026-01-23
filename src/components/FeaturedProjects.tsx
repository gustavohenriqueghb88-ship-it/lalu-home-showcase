import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Building2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import placeholderImage from '@/assets/rotas-do-sol-1.jpg';

const FeaturedProjects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      // First try to get featured projects
      let { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(2);
      
      if (error) throw error;
      
      // If no featured projects, get the 2 most recent
      if (!data || data.length === 0) {
        const result = await supabase
          .from('projects')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (result.error) throw result.error;
        data = result.data;
      }
      
      return data;
    }
  });

  const getImageUrl = (images: string[] | null) => {
    if (!images || images.length === 0) return placeholderImage;
    const firstImage = images[0];
    if (firstImage.startsWith('http')) return firstImage;
    return supabase.storage.from('property-images').getPublicUrl(firstImage).data.publicUrl;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 bg-secondary/10 text-secondary border-secondary/30">
            <Building2 className="w-4 h-4 mr-2" />
            Empreendimentos em Destaque
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6 px-2">
            Nossos Principais
            <span className="text-secondary block">Empreendimentos</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Conheça os projetos que demonstram nossa excelência em incorporação 
            e desenvolvimento imobiliário.
          </p>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {projects?.map((project, index) => (
              <Card key={project.id} className={`group hover:shadow-elegant transition-all duration-500 bg-card border-border animate-slide-up`} style={{animationDelay: `${index * 200}ms`}}>
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={getImageUrl(project.images)}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={project.type === 'Residencial' ? 'default' : 'secondary'}>
                      {project.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/80">
                      {project.status}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-secondary">{project.price || 'Consulte'}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  
                  {project.features && project.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.slice(0, 4).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Link to={`/empreendimentos/${project.slug}`} className="w-full">
                    <Button variant="outline" className="w-full group">
                      Saiba Mais
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && (!projects || projects.length === 0) && (
          <div className="text-center py-12 mb-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">Nenhum empreendimento encontrado</h3>
            <p className="text-muted-foreground">Em breve novos projetos serão adicionados.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link to="/empreendimentos">
            <Button variant="hero" size="lg" className="group">
              Ver Todos os Empreendimentos
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;