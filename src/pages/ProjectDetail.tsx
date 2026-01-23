import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleMap from '@/components/GoogleMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Phone, MessageSquare, Check, Loader2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { maskPhone, maskName, submitToGoogleSheets } from '@/utils/formUtils';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
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

  if (error || !project) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Empreendimento não encontrado</h1>
            <Link to="/empreendimentos">
              <Button variant="outline">Voltar aos Empreendimentos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = project.images || [];
  const features = project.features || [];
  const highlights = project.highlights || [];
  const details = (project.details as Record<string, string | number>) || {};

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
              <Link to="/empreendimentos" className="hover:text-primary transition-smooth">Empreendimentos</Link>
              <span>/</span>
              <span className="text-primary">{project.title}</span>
            </div>
          </div>
        </section>

        {/* Project Header */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/empreendimentos" className="inline-flex items-center text-muted-foreground hover:text-primary transition-smooth mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Empreendimentos
              </Link>
              
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{project.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="default">{project.type}</Badge>
                    <Badge variant="outline">{project.status}</Badge>
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

        {/* Project Images */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <img 
                    src={getImageUrl(images[0] || null)}
                    alt={project.title}
                    className="w-full h-96 object-cover rounded-lg shadow-elegant"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <img 
                    src={getImageUrl(images[1] || null)}
                    alt={`${project.title} - Imagem 2`}
                    className="w-full h-44 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src={getImageUrl(images[2] || null)}
                    alt={`${project.title} - Imagem 3`}
                    className="w-full h-44 object-contain rounded-lg shadow-lg bg-white p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-4">Sobre o Empreendimento</h2>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  {/* Features */}
                  {features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">Características</h3>
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

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-4">Principais Diferenciais</h3>
                      <div className="grid gap-4">
                        {highlights.map((highlight, index) => (
                          <Card key={index} className="border-l-4 border-l-secondary">
                            <CardContent className="p-4">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                                <span className="font-medium text-primary">{highlight}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Map */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Localização</h3>
                    <GoogleMap address={project.location} height="350px" />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  
                  {/* Project Info */}
                  <Card className="bg-card border-border shadow-elegant">
                    <CardHeader>
                      <CardTitle className="text-primary">Informações do Projeto</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(details).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                          <span className="font-medium text-primary">{value}</span>
                        </div>
                      ))}
                      {project.price && (
                        <div className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                          <span className="text-muted-foreground">Preço</span>
                          <span className="font-medium text-primary">{project.price}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Contact Form */}
                  <Card className="bg-gradient-gold text-secondary-foreground border-0">
                    <CardHeader>
                      <CardTitle className="text-secondary-foreground">Interessado?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-secondary-foreground/90">
                        Solicite mais informações sobre este empreendimento.
                      </p>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        
                        // Validação
                        if (!formData.nome.trim() || !formData.email.trim() || !formData.telefone.trim()) {
                          toast({
                            title: 'Campos obrigatórios',
                            description: 'Por favor, preencha todos os campos.',
                            variant: 'destructive',
                          });
                          return;
                        }

                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(formData.email)) {
                          toast({
                            title: 'E-mail inválido',
                            description: 'Por favor, insira um e-mail válido.',
                            variant: 'destructive',
                          });
                          return;
                        }

                        setFormLoading(true);

                        const success = await submitToGoogleSheets({
                          nome: formData.nome,
                          email: formData.email,
                          telefone: formData.telefone,
                          interesse: project.title,
                          mensagem: 'Estou interessado'
                        });

                        if (success) {
                          toast({
                            title: 'Mensagem enviada!',
                            description: 'Obrigado pelo interesse. Nossa equipe entrará em contato em breve.',
                          });
                          setFormData({ nome: '', email: '', telefone: '' });
                        } else {
                          toast({
                            title: 'Erro ao enviar',
                            description: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente ou entre em contato pelo WhatsApp.',
                            variant: 'destructive',
                          });
                        }

                        setFormLoading(false);
                      }}>
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            placeholder="Seu nome"
                            value={formData.nome}
                            onChange={(e) => setFormData(prev => ({ ...prev, nome: maskName(e.target.value) }))}
                            className="w-full px-4 py-3 rounded-lg border border-secondary-foreground/20 bg-background/10 text-secondary-foreground placeholder:text-secondary-foreground/60 focus:ring-2 focus:ring-secondary-foreground/20 focus:border-transparent"
                            required
                          />
                          <input 
                            type="email" 
                            placeholder="Seu e-mail"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 rounded-lg border border-secondary-foreground/20 bg-background/10 text-secondary-foreground placeholder:text-secondary-foreground/60 focus:ring-2 focus:ring-secondary-foreground/20 focus:border-transparent"
                            required
                          />
                          <input 
                            type="tel" 
                            placeholder="Seu telefone"
                            value={formData.telefone}
                            onChange={(e) => setFormData(prev => ({ ...prev, telefone: maskPhone(e.target.value) }))}
                            maxLength={15}
                            className="w-full px-4 py-3 rounded-lg border border-secondary-foreground/20 bg-background/10 text-secondary-foreground placeholder:text-secondary-foreground/60 focus:ring-2 focus:ring-secondary-foreground/20 focus:border-transparent"
                            required
                          />
                          <Button 
                            type="submit"
                            variant="outline" 
                            className="w-full bg-background/10 border-background/20 text-secondary-foreground hover:bg-background hover:text-primary"
                            disabled={formLoading}
                          >
                            {formLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Enviar
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
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

        {/* Related Projects */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">Outros Empreendimentos</h2>
                <p className="text-muted-foreground">Conheça mais projetos da Lalu Adm</p>
              </div>
              
              <div className="text-center">
                <Link to="/empreendimentos">
                  <Button variant="outline" size="lg" className="group">
                    Ver Todos os Empreendimentos
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

export default ProjectDetail;