import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Building2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import placeholderImage from '@/assets/rotas-do-sol-new.jpg';

const Projects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
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
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-10 pb-0 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <Badge variant="outline" className="mb-6 bg-secondary/20 text-secondary border-secondary/30">
                <Building2 className="w-4 h-4 mr-2" />
                Incorporação Imobiliária
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
                Nossos
                <span className="text-secondary block">Empreendimentos</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Descubra os projetos de incorporação da Lalu Adm no Paraná e Santa Catarina. 
                Qualidade, inovação e valorização patrimonial em cada empreendimento.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {projects?.map((project, index) => (
                  <Card key={project.id} className="group hover:shadow-elegant transition-all duration-500 bg-card border-border animate-slide-up" style={{animationDelay: `${index * 200}ms`}}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={getImageUrl(project.images)}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="default" className="bg-primary text-primary-foreground">
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
                          <h3 className="text-2xl font-bold text-primary mb-2">{project.title}</h3>
                          <div className="flex items-center text-muted-foreground mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{project.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                      
                      {project.features && project.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {project.highlights && project.highlights.length > 0 && (
                        <div className="space-y-3 mb-6">
                          <h4 className="font-semibold text-primary">Principais características:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {project.highlights.slice(0, 4).map((highlight, idx) => (
                              <div key={idx} className="flex items-center text-sm text-muted-foreground">
                                <div className="w-2 h-2 bg-secondary rounded-full mr-2 flex-shrink-0" />
                                <span className="break-words">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Link to={`/empreendimentos/${project.slug}`}>
                        <Button variant="outline" className="w-full group">
                          Ver Detalhes
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && (!projects || projects.length === 0) && (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Nenhum empreendimento encontrado</h3>
                <p className="text-muted-foreground">Em breve novos projetos serão adicionados.</p>
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4 px-2">
                  Interessado em nossos empreendimentos?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Entre em contato conosco para mais informações sobre disponibilidade, 
                  preços e condições especiais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contato">
                    <Button variant="hero" size="lg" className="group">
                      Solicitar Informações
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button 
                    variant="whatsapp" 
                    size="lg"
                    onClick={() => window.open('https://wa.me/5541984305403', '_blank')}
                  >
                    <span className="mr-2">📱</span>
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;