import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Home, Building2, Filter, Bed, Bath, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import apartmentInterior from '@/assets/apartment-interior.jpg';
import commercialBuilding from '@/assets/commercial-building.jpg';
import heroBuilding from '@/assets/hero-building.jpg';

const Portfolio = () => {
  const [filter, setFilter] = useState('todos');

  const properties = [
    {
      id: 1,
      slug: 'apartamento-centro-curitiba',
      title: "Apartamento Centro",
      location: "Centro, Curitiba - PR",
      type: "locacao",
      category: "Residencial",
      price: "R$ 2.500",
      period: "/mês",
      description: "Apartamento mobiliado no centro de Curitiba, próximo ao transporte público e comércio.",
      image: apartmentInterior,
      features: ["2 dormitórios", "1 banheiro", "1 vaga", "Mobiliado"],
      area: "65m²",
      bedrooms: 2,
      bathrooms: 1,
      parking: 1
    },
    {
      id: 2,
      slug: 'casa-jardim-botanico',
      title: "Casa Jardim Botânico",
      location: "Jardim Botânico, Curitiba - PR",
      type: "venda",
      category: "Residencial",
      price: "R$ 650.000",
      period: "",
      description: "Casa em condomínio fechado no Jardim Botânico, área nobre de Curitiba.",
      image: heroBuilding,
      features: ["3 dormitórios", "2 banheiros", "2 vagas", "Jardim"],
      area: "150m²",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2
    },
    {
      id: 3,
      slug: 'sala-comercial-batel',
      title: "Sala Comercial Batel",
      location: "Batel, Curitiba - PR", 
      type: "locacao",
      category: "Comercial",
      price: "R$ 3.800",
      period: "/mês",
      description: "Sala comercial em edifício moderno no Batel, ideal para escritórios.",
      image: commercialBuilding,
      features: ["50m²", "1 banheiro", "1 vaga", "Ar condicionado"],
      area: "50m²",
      bedrooms: 0,
      bathrooms: 1,
      parking: 1
    },
    {
      id: 4,
      slug: 'cobertura-agua-verde',
      title: "Cobertura Água Verde",
      location: "Água Verde, Curitiba - PR",
      type: "venda",
      category: "Residencial",
      price: "R$ 950.000",
      period: "",
      description: "Cobertura duplex com vista panorâmica da cidade, acabamento de alto padrão.",
      image: apartmentInterior,
      features: ["4 dormitórios", "3 banheiros", "3 vagas", "Terraço"],
      area: "200m²",
      bedrooms: 4,
      bathrooms: 3,
      parking: 3
    }
  ];

  const filteredProperties = properties.filter(property => {
    if (filter === 'todos') return true;
    return property.type === filter;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <Card key={property.id} className="group hover:shadow-elegant transition-all duration-500 bg-card border-border animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={property.image}
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
                        {property.price}
                        <span className="text-sm font-normal">{property.period}</span>
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
                    <p className="text-muted-foreground mb-4 text-sm">{property.description}</p>
                    
                    {/* Property details */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Home className="w-4 h-4 mr-1" />
                        {property.area}
                      </div>
                      {property.bedrooms > 0 && (
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.bathrooms}
                      </div>
                      <div className="flex items-center">
                        <Car className="w-4 h-4 mr-1" />
                        {property.parking}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {property.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

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

            {filteredProperties.length === 0 && (
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
                  <Button variant="whatsapp" size="lg">
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