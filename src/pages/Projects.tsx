import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Home, Building2, Users, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';
import rotasDoSol1 from '@/assets/rotas-do-sol-new.jpg';
import gardenHouse1 from '@/assets/garden-house-1.jpg';

const Projects = () => {
  const projects = [
    {
      id: 1,
      slug: 'loteamento-rotas-do-sol',
      title: "Loteamento Rotas do Sol",
      location: "Estr. Geral Barra do Itapocu, Araquari-SC",
      type: "Loteamento",
      status: "Disponível",
      description: "Segundo loteamento na região da Barra do Itapocú, planejado para atender as expectativas de nossos clientes. Localizado em meio a paisagens naturais de tirar o fôlego, este será mais um empreendimento completo e de sucesso de vendas.",
      image: rotasDoSol1,
      features: ["71 lotes disponíveis", "A partir de 300m²", "Ruas asfaltadas", "Entrada facilitada", "Financiamento até 180 meses"],
      highlights: [
        "Ruas asfaltadas",
        "Iluminação pública", 
        "Rede de água",
        "Rede coletora de esgoto",
        "Galeria de águas pluviais",
        "Paisagens naturais exuberantes"
      ]
    },
    {
      id: 2,
      slug: 'condominio-garden-house-residence',
      title: "Condomínio Garden House Residence",
      location: "Barra Velha-SC",
      type: "Condomínio",
      status: "Disponível",
      description: "O primeiro condomínio fechado de alto padrão perto da praia no centro de Barra Velha. Localizado em uma das regiões mais promissoras de Santa Catarina, próximo a belas praias e a uma lindíssima lagoa paralela ao mar.",
      image: gardenHouse1,
      features: ["113 lotes disponíveis", "Condomínio fechado", "Portal com segurança 24h", "A 3 min da praia", "A 600m da lagoa"],
      highlights: [
        "Portal com segurança 24h",
        "Muros com 2,30m de altura",
        "Monitoramento por câmeras",
        "A 3 min da praia",
        "A 600m da lagoa",
        "Localização privilegiada"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <Badge variant="outline" className="mb-6 bg-secondary/20 text-secondary border-secondary/30">
                <Building2 className="w-4 h-4 mr-2" />
                Incorporação Imobiliária
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Nossos
                <span className="text-secondary block">Empreendimentos</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                Descubra os projetos de incorporação da Lalu Adm no Paraná e Santa Catarina. 
                Qualidade, inovação e valorização patrimonial em cada empreendimento.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={project.id} className="group hover:shadow-elegant transition-all duration-500 bg-card border-border animate-slide-up" style={{animationDelay: `${index * 200}ms`}}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={project.image}
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
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-primary">Principais características:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.highlights.slice(0, 4).map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-secondary rounded-full mr-2 flex-shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>

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

            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-primary mb-4">
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

export default Projects;