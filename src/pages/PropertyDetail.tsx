import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleMap from '@/components/GoogleMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { ArrowLeft, MapPin, Phone, MessageSquare, Check, Bed, Bath, Car, Square, Loader2, Images } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const PropertyDetail = () => {
  const { slug } = useParams();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return '/placeholder.svg';
    if (imagePath.startsWith('http')) return imagePath;
    return supabase.storage.from('property-images').getPublicUrl(imagePath).data.publicUrl;
  };

  const formatPrice = (price: number | null, type: string) => {
    if (!price) return 'Consulte';
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(price);
    return formatted;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 flex justify-center items-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
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

  const images = property.images || [];
  const features = property.features || [];
  const details = (property.details as Record<string, string | number>) || {};

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
                    {formatPrice(property.price, property.type)}
                    {property.type === 'locacao' && property.period && (
                      <span className="text-lg font-normal text-muted-foreground">{property.period}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="lg" className="group">
                    <Phone className="w-5 h-5 mr-2" />
                    Ligar Agora
                  </Button>
                  <Button 
                    variant="whatsapp" 
                    size="lg"
                    onClick={() => window.open('https://wa.me/5541984305403', '_blank')}
                  >
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
                <div className="md:col-span-2 relative group">
                  <img 
                    src={getImageUrl(images[0] || null)}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-lg shadow-elegant cursor-pointer"
                    onClick={() => images.length > 0 && setGalleryOpen(true)}
                  />
                  {images.length > 3 && (
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setGalleryOpen(true)}
                        className="bg-background/90 hover:bg-background"
                      >
                        <Images className="w-4 h-4 mr-2" />
                        Ver todas ({images.length})
                      </Button>
                    </div>
                  )}
                </div>
                <div className="grid grid-rows-2 gap-4">
                  {images[1] && (
                    <img 
                      src={getImageUrl(images[1])}
                      alt={`${property.title} - Imagem 2`}
                      className="w-full h-44 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setGalleryOpen(true)}
                    />
                  )}
                  {images[2] ? (
                    <div className="relative">
                      <img 
                        src={getImageUrl(images[2])}
                        alt={`${property.title} - Imagem 3`}
                        className="w-full h-44 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setGalleryOpen(true)}
                      />
                      {images.length > 3 && (
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors" onClick={() => setGalleryOpen(true)}>
                          <span className="text-white font-bold text-lg">+{images.length - 3}</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
              {images.length > 3 && (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setGalleryOpen(true)}
                    className="group"
                  >
                    <Images className="w-4 h-4 mr-2" />
                    Ver todas as {images.length} fotos
                  </Button>
                </div>
              )}
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
                    <div className="flex flex-wrap gap-4 mb-6">
                      {property.area && (
                        <Card className="text-center p-4 flex-1 min-w-[140px]">
                          <Square className="w-8 h-8 text-secondary mx-auto mb-2" />
                          <div className="text-lg font-bold text-primary">{property.area}</div>
                          <div className="text-sm text-muted-foreground">Área</div>
                        </Card>
                      )}
                      {(property.bedrooms != null && Number(property.bedrooms) > 0) && (
                        <Card className="text-center p-4 flex-1 min-w-[140px]">
                          <Bed className="w-8 h-8 text-secondary mx-auto mb-2" />
                          <div className="text-lg font-bold text-primary">{property.bedrooms}</div>
                          <div className="text-sm text-muted-foreground">Quartos</div>
                        </Card>
                      )}
                      {(property.bathrooms != null && Number(property.bathrooms) > 0) && (
                        <Card className="text-center p-4 flex-1 min-w-[140px]">
                          <Bath className="w-8 h-8 text-secondary mx-auto mb-2" />
                          <div className="text-lg font-bold text-primary">{property.bathrooms}</div>
                          <div className="text-sm text-muted-foreground">Banheiros</div>
                        </Card>
                      )}
                      {(property.parking != null && Number(property.parking) > 0) && (
                        <Card className="text-center p-4 flex-1 min-w-[140px]">
                          <Car className="w-8 h-8 text-secondary mx-auto mb-2" />
                          <div className="text-lg font-bold text-primary">{property.parking}</div>
                          <div className="text-sm text-muted-foreground">Vagas</div>
                        </Card>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  {features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">Comodidades e Características</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <Check className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Map */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Localização</h3>
                    <GoogleMap address={property.location} height="350px" />
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
                      {property.area && (
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Área</span>
                          <span className="font-medium text-primary">{property.area}</span>
                        </div>
                      )}
                      {property.bedrooms !== null && property.bedrooms > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Quartos</span>
                          <span className="font-medium text-primary">{property.bedrooms}</span>
                        </div>
                      )}
                      {property.bathrooms !== null && property.bathrooms > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Banheiros</span>
                          <span className="font-medium text-primary">{property.bathrooms}</span>
                        </div>
                      )}
                      {property.parking !== null && property.parking > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Vagas</span>
                          <span className="font-medium text-primary">{property.parking}</span>
                        </div>
                      )}
                      {Object.entries(details)
                        .filter(([key, value]) => {
                          // Não exibe valores 0, null, undefined ou strings vazias
                          if (value === null || value === undefined || value === '') return false;
                          if (typeof value === 'number' && value === 0) return false;
                          if (typeof value === 'string' && value.trim() === '0') return false;
                          return true;
                        })
                        .map(([key, value]) => (
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
                    Ver Todos os Imóveis
                    <ArrowLeft className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Image Gallery Dialog */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-6xl w-full p-0 flex flex-col" style={{ maxHeight: '90vh' }}>
          <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0">
            <DialogTitle className="text-2xl">{property.title} - Galeria de Fotos ({images.length})</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6" style={{ height: 'calc(90vh - 120px)', minHeight: '400px' }}>
            {images.length > 0 ? (
              <div className="relative w-full h-full flex flex-col">
                <div className="flex-1 relative">
                  <Carousel setApi={setApi} className="w-full h-full">
                    <CarouselContent>
                      {images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="flex items-center justify-center w-full h-full p-4" style={{ minHeight: '400px' }}>
                            <img
                              src={getImageUrl(image)}
                              alt={`${property.title} - Foto ${index + 1}`}
                              className="max-h-[600px] max-w-full object-contain rounded-lg"
                              loading="eager"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 lg:left-4 bg-background/80 hover:bg-background" />
                    <CarouselNext className="right-2 lg:right-4 bg-background/80 hover:bg-background" />
                  </Carousel>
                </div>
                
                {/* Indicador de página */}
                <div className="text-center py-3 text-sm text-muted-foreground font-medium">
                  {images.length > 0 ? `Total: ${images.length} fotos` : 'Nenhuma foto'}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Nenhuma imagem disponível
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyDetail;