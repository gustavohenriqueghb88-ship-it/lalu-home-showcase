import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Phone, MessageSquare, Check, Home, Users, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';
import rotasDoSol1 from '@/assets/rotas-do-sol-1.jpg';
import rotasDoSol2 from '@/assets/rotas-do-sol-2.jpg';
import rotasDoSol3 from '@/assets/rotas-do-sol-3.jpg';
import gardenHouse1 from '@/assets/garden-house-1.jpg';
import gardenHouse2 from '@/assets/garden-house-2.jpg';
import gardenHouse3 from '@/assets/garden-house-3.jpg';

const ProjectDetail = () => {
  const { slug } = useParams();

  const projects = {
    'loteamento-rotas-do-sol': {
      id: 1,
      title: "Loteamento Rotas do Sol",
      location: "Estr. Geral Barra do Itapocu, Araquari-SC",
      type: "Loteamento",
      status: "Disponível",
      description: "Segundo loteamento na região da Barra do Itapocú, planejado para atender as expectativas de nossos clientes. Localizado em meio a paisagens naturais de tirar o fôlego, este será mais um empreendimento completo e de sucesso de vendas. Com 71 lotes prontos para construir a partir de 300m², oferece infraestrutura completa e condições especiais de pagamento.",
      images: [rotasDoSol1, rotasDoSol2, rotasDoSol3],
      features: [
        "71 lotes disponíveis",
        "Lotes a partir de 300m²",
        "Ruas asfaltadas",
        "Iluminação pública",
        "Rede de água",
        "Rede de esgoto",
        "Galeria de águas pluviais",
        "Paisagens naturais",
        "Excelente localização",
        "Entrada facilitada",
        "Financiamento até 180 meses"
      ],
      highlights: [
        "Infraestrutura completa pronta",
        "Financiamento próprio facilitado",
        "Região em desenvolvimento",
        "Próximo à BR-101"
      ],
      details: {
        totalLotes: "71 lotes",
        areaMinima: "300m²",
        infraestrutura: "Completa",
        financiamento: "Até 180 meses"
      }
    },
    'condominio-garden-house-residence': {
      id: 2,
      title: "Condomínio Garden House Residence",
      location: "Barra Velha-SC",
      type: "Condomínio",
      status: "Disponível", 
      description: "O primeiro condomínio fechado de alto padrão perto da praia no centro de Barra Velha. Localizado em uma das regiões mais promissoras de Santa Catarina, próximo a belas praias, paisagens e a uma lindíssima lagoa paralela ao mar. Um lugar paradisíaco que une belezas naturais de forma única e está a minutos das cidades mais relevantes do litoral catarinense.",
      images: [gardenHouse1, gardenHouse2, gardenHouse3],
      features: [
        "113 lotes disponíveis",
        "Condomínio fechado",
        "Portal com segurança 24h",
        "Muros com 2,30m de altura",
        "Monitoramento por câmeras",
        "Projeto de alto padrão",
        "Localização privilegiada",
        "No centro da cidade",
        "A 3 min da praia",
        "A 600m da lagoa",
        "Local de alta valorização",
        "Fácil acesso"
      ],
      highlights: [
        "Primeiro condomínio fechado de alto padrão da região",
        "A 3 min da praia",
        "A 600m da lagoa",
        "Entre Joinville e Balneário Camboriú",
        "Próximo a 2 aeroportos"
      ],
      details: {
        totalLotes: "113 lotes",
        seguranca: "24 horas",
        localizacao: "3 min da praia",
        padrao: "Alto padrão"
      }
    }
  };

  const project = projects[slug as keyof typeof projects];

  if (!project) {
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
                  <Button variant="whatsapp" size="lg">
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
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-96 object-cover rounded-lg shadow-elegant"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <img 
                    src={project.images[1]}
                    alt={`${project.title} - Imagem 2`}
                    className="w-full h-44 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src={project.images[2]}
                    alt={`${project.title} - Imagem 3`}
                    className="w-full h-44 object-cover rounded-lg shadow-lg"
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
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Características</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Principais Diferenciais</h3>
                    <div className="grid gap-4">
                      {project.highlights.map((highlight, index) => (
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

                  {/* Map Placeholder */}
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Localização</h3>
                    <Card className="bg-muted/50">
                      <CardContent className="p-8 text-center">
                        <MapPin className="w-16 h-16 text-secondary mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">{project.location}</p>
                        <p className="text-sm text-muted-foreground">Mapa interativo em breve</p>
                      </CardContent>
                    </Card>
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
                      {Object.entries(project.details).map(([key, value]) => (
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
                        Solicite mais informações sobre este empreendimento.
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
                          Solicitar Informações
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