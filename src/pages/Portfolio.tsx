import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Home, Building2, Filter, Bed, Bath, Car, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import placeholderImage from '@/assets/apartment-interior.jpg';

const Portfolio = () => {
  const [filter, setFilter] = useState('todos');

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
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

  const formatPrice = (price: number | null, type: string, period: string | null) => {
    if (!price) return 'Consulte';
    const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    return type === 'locacao' ? `${formatted}${period || '/mês'}` : formatted;
  };

  const filteredProperties = properties?.filter(property => {
    if (filter === 'todos') return true;
    return property.type === filter;
  }) || [];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-0 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <Badge variant="outline" className="mb-6 bg-secondary/20 text-secondary border-secondary/30">
                <Home className="w-4 h-4 mr-2" />
                Locação e Venda
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Nosso
                <span className="text-secondary block">Portfólio</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                Descubra imóveis selecionados para locação e venda em Curitiba e região. 
                Qualidade e localização privilegiada em cada propriedade.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant={filter === 'todos' ? 'default' : 'outline'}
                onClick={() => setFilter('todos')}
                className="group"
              >
                <Filter className="w-4 h-4 mr-2" />
                Todos
              </Button>
              <Button 
                variant={filter === 'locacao' ? 'default' : 'outline'}
                onClick={() => setFilter('locacao')}
                className="group"
              >
                Locação
              </Button>
              <Button 
                variant={filter === 'venda' ? 'default' : 'outline'}
                onClick={() => setFilter('venda')}
                className="group"
              >
                Venda
              </Button>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <Card key={property.id} className="group hover:shadow-elegant transition-all duration-500 bg-card border-border animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={getImageUrl(property.images)}
                        alt={property.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant={property.type === 'locacao' ? 'default' : 'secondary'}>
                          {property.type === 'locacao' ? 'Locação' : 'Venda'}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-background/80">
                          {property.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-2xl font-bold text-white bg-background/10 backdrop-blur-sm rounded px-3 py-1">
                          {formatPrice(Number(property.price), property.type, property.period)}
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">{property.title}</h3>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{property.description}</p>
                      
                      {/* Property details */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          {property.area || '-'}
                        </div>
                        {(property.bedrooms ?? 0) > 0 && (
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            {property.bedrooms}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.bathrooms ?? 0}
                        </div>
                        <div className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          {property.parking ?? 0}
                        </div>
                      </div>

                      {property.features && property.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {property.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Link to={`/portfolio/${property.slug}`}>
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

            {!isLoading && filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Nenhum imóvel encontrado</h3>
                <p className="text-muted-foreground">Tente ajustar os filtros para ver mais resultados.</p>
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Não encontrou o que procura?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Entre em contato conosco. Temos outros imóveis disponíveis 
                  que podem atender às suas necessidades.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contato">
                    <Button variant="hero" size="lg" className="group">
                      Falar com Consultor
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

export default Portfolio;