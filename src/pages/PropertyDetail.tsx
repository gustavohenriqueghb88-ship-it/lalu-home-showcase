import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Phone, MessageSquare, Check, Home, Bed, Bath, Car, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import apartmentInterior from '@/assets/apartment-interior.jpg';
import commercialBuilding from '@/assets/commercial-building.jpg';
import heroBuilding from '@/assets/hero-building.jpg';

const PropertyDetail = () => {
  const { slug } = useParams();

  const properties = {
    'apartamento-centro-curitiba': {
      id: 1,
      title: "Apartamento Centro",
      location: "Centro, Curitiba - PR",
      type: "locacao",
      category: "Residencial",
      price: "R$ 2.500",
      period: "/mês",
      description: "Apartamento mobiliado localizado no coração de Curitiba, oferecendo praticidade e conforto. Próximo ao transporte público, comércio e principais pontos da cidade. Ideal para profissionais que buscam localização central.",
      images: [apartmentInterior, heroBuilding, commercialBuilding],
      features: [
        "Apartamento mobiliado",
        "2 dormitórios",
        "1 banheiro",
        "1 vaga de garagem",
        "Cozinha equipada",
        "Área de serviço",
        "Próximo ao transporte público",
        "Comércio na região",
        "Internet fibra",
        "Portaria 24h"
      ],
      details: {
        area: "65m²",
        bedrooms: 2,
        bathrooms: 1,
        parking: 1,
        furnished: "Sim",
        floor: "5º andar"
      }
    },
    'casa-jardim-botanico': {
      id: 2,
      title: "Casa Jardim Botânico",
      location: "Jardim Botânico, Curitiba - PR",
      type: "venda",
      category: "Residencial", 
      price: "R$ 650.000",
      period: "",
      description: "Casa em condomínio fechado no nobre bairro Jardim Botânico. Propriedade com excelente localização, próxima ao Jardim Botânico de Curitiba e com fácil acesso às principais vias da cidade. Ideal para famílias que buscam qualidade de vida.",
      images: [heroBuilding, apartmentInterior, commercialBuilding],
      features: [
        "Casa em condomínio",
        "3 dormitórios",
        "2 banheiros",
        "2 vagas de garagem",
        "Jardim privativo",
        "Área gourmet",
        "Segurança 24h",
        "Área de lazer completa",
        "Próximo ao Jardim Botânico",
        "Localização nobre"
      ],
      details: {
        area: "150m²",
        bedrooms: 3,
        bathrooms: 2,
        parking: 2,
        garden: "Sim",
        condominium: "Fechado"
      }
    },
    'sala-comercial-batel': {
      id: 3,
      title: "Sala Comercial Batel",
      location: "Batel, Curitiba - PR",
      type: "locacao", 
      category: "Comercial",
      price: "R$ 3.800",
      period: "/mês",
      description: "Sala comercial em edifício moderno e conceituado no Batel, uma das regiões mais valorizadas de Curitiba. Ideal para escritórios, consultorias e empresas que buscam localização estratégica e infraestrutura de qualidade.",
      images: [commercialBuilding, heroBuilding, apartmentInterior],
      features: [
        "Edifício moderno",
        "50m² de área útil",
        "1 banheiro",
        "1 vaga de garagem",
        "Ar condicionado",
        "Recepção",
        "Elevadores",
        "Segurança",
        "Localização premium",
        "Fácil acesso"
      ],
      details: {
        area: "50m²",
        bathrooms: 1,
        parking: 1,
        airConditioning: "Sim",
        building: "Comercial",
        floor: "8º andar"
      }
    },
    'cobertura-agua-verde': {
      id: 4,
      title: "Cobertura Água Verde",
      location: "Água Verde, Curitiba - PR",
      type: "venda",
      category: "Residencial",
      price: "R$ 950.000",
      period: "",
      description: "Cobertura duplex com vista panorâmica da cidade de Curitiba. Acabamento de alto padrão, terraço amplo e localização privilegiada no Água Verde. Propriedade única para quem busca sofisticação e exclusividade.",
      images: [apartmentInterior, commercialBuilding, heroBuilding],
      features: [
        "Cobertura duplex",
        "4 dormitórios",
        "3 banheiros",
        "3 vagas de garagem",
        "Terraço amplo",
        "Vista panorâmica",
        "Acabamento alto padrão",
        "Área gourmet",
        "Localização privilegiada",
        "Exclusividade"
      ],
      details: {
        area: "200m²",
        bedrooms: 4,
        bathrooms: 3,
        parking: 3,
        terrace: "Sim",
        view: "Panorâmica"
      }
    }
  };

  const property = properties[slug as keyof typeof properties];

  if (!property) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Imóvel não encontrado</h1>
            <Link to="/portfolio">
              <Button variant="outline">Voltar ao Portfólio</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <section className="py-6 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
              <span>/</span>
              <Link to="/portfolio" className="hover:text-primary transition-smooth">Portfólio</Link>
              <span>/</span>
              <span className="text-primary">{property.title}</span>
            </div>
          </div>
        </section>

        {/* Property Header */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/portfolio" className="inline-flex items-center text-muted-foreground hover:text-primary transition-smooth mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Portfólio
              </Link>
              
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Badge variant={property.type === 'locacao' ? 'default' : 'secondary'}>
                      {property.type === 'locacao' ? 'Locação' : 'Venda'}
                    </Badge>
                    <Badge variant="outline">{property.category}</Badge>
                  </div>
                  <div className="text-3xl font-bold text-secondary">
                    {property.price}
                    <span className="text-lg font-normal text-muted-foreground">{property.period}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="lg" className="group">
                    <Phone className="w-5 h-5 mr-2" />
                    Ligar Agora
                  </Button>
                  <Button variant="whatsapp" size="lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Images */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <img 
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-lg shadow-elegant"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <img 
                    src={property.images[1]}
                    alt={`${property.title} - Imagem 2`}
                    className="w-full h-44 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src={property.images[2]}
                    alt={`${property.title} - Imagem 3`}
                    className="w-full h-44 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Details */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-4">Sobre o Imóvel</h2>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>

                  {/* Property Specs */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Características</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <Card className="text-center p-4">
                        <Square className="w-8 h-8 text-secondary mx-auto mb-2" />
                        <div className="text-lg font-bold text-primary">{property.details.area}</div>
                        <div className="text-sm text-muted-foreground">Área</div>
                      </Card>
                      {'bedrooms' in property.details && property.details.bedrooms && property.details.bedrooms > 0 && (
                        <Card className="text-center p-4">
                          <Bed className="w-8 h-8 text-secondary mx-auto mb-2" />
                          <div className="text-lg font-bold text-primary">{property.details.bedrooms}</div>
                          <div className="text-sm text-muted-foreground">Quartos</div>
                        </Card>
                      )}
                      <Card className="text-center p-4">
                        <Bath className="w-8 h-8 text-secondary mx-auto mb-2" />
                        <div className="text-lg font-bold text-primary">{property.details.bathrooms}</div>
                        <div className="text-sm text-muted-foreground">Banheiros</div>
                      </Card>
                      <Card className="text-center p-4">
                        <Car className="w-8 h-8 text-secondary mx-auto mb-2" />
                        <div className="text-lg font-bold text-primary">{property.details.parking}</div>
                        <div className="text-sm text-muted-foreground">Vagas</div>
                      </Card>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Comodidades e Características</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Localização</h3>
                    <Card className="bg-muted/50">
                      <CardContent className="p-8 text-center">
                        <MapPin className="w-16 h-16 text-secondary mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">{property.location}</p>
                        <p className="text-sm text-muted-foreground">Mapa interativo em breve</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  
                  {/* Property Info */}
                  <Card className="bg-card border-border shadow-elegant">
                    <CardHeader>
                      <CardTitle className="text-primary">Informações do Imóvel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(property.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                          <span className="font-medium text-primary">{value}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Contact Form */}
                  <Card className="bg-gradient-gold text-secondary-foreground border-0">
                    <CardHeader>
                      <CardTitle className="text-secondary-foreground">Interessado?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-secondary-foreground/90">
                        {property.type === 'locacao' ? 'Agende uma visita' : 'Solicite mais informações'} sobre este imóvel.
                      </p>
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="Seu nome"
                          className="w-full px-4 py-3 rounded-lg border border-secondary-foreground/20 bg-background/10 text-secondary-foreground placeholder:text-secondary-foreground/60 focus:ring-2 focus:ring-secondary-foreground/20 focus:border-transparent"
                        />
                        <input 
                          type="email" 
                          placeholder="Seu e-mail"
                          className="w-full px-4 py-3 rounded-lg border border-secondary-foreground/20 bg-background/10 text-secondary-foreground placeholder:text-secondary-foreground/60 focus:ring-2 focus:ring-secondary-foreground/20 focus:border-transparent"
                        />
                        <input 
                          type="tel" 
                          placeholder="Seu telefone"
                          className="w-full px-4 py-3 rounded-lg border border-secondary-foreground/20 bg-background/10 text-secondary-foreground placeholder:text-secondary-foreground/60 focus:ring-2 focus:ring-secondary-foreground/20 focus:border-transparent"
                        />
                        <Button variant="outline" className="w-full bg-background/10 border-background/20 text-secondary-foreground hover:bg-background hover:text-primary">
                          {property.type === 'locacao' ? 'Agendar Visita' : 'Solicitar Informações'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Contact */}
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-primary">Contato Direto</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-secondary mr-3" />
                        <div>
                          <p className="font-medium text-primary">(41) 98430-5403</p>
                          <p className="text-sm text-muted-foreground">Ligue agora</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-5 h-5 text-accent mr-3" />
                        <div>
                          <p className="font-medium text-primary">WhatsApp</p>
                          <p className="text-sm text-muted-foreground">Atendimento rápido</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Properties */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">Outros Imóveis</h2>
                <p className="text-muted-foreground">Conheça mais propriedades disponíveis</p>
              </div>
              
              <div className="text-center">
                <Link to="/portfolio">
                  <Button variant="outline" size="lg" className="group">
                    Ver Todo o Portfólio
                    <ArrowLeft className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;