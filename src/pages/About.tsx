import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleMap from '@/components/GoogleMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Award, Building2, MapPin, Users, Target, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBuilding from '@/assets/hero-building.jpg';

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Experiência",
      description: "Quase 20 anos de atuação sólida no mercado imobiliário do Sul do Brasil."
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Confiança e transparência em todos os processos e relacionamentos."
    },
    {
      icon: TrendingUp,
      title: "Valorização",
      description: "Foco na valorização patrimonial e no retorno do investimento."
    },
    {
      icon: Target,
      title: "Inovação",
      description: "Soluções modernas e tecnológicas para o desenvolvimento imobiliário."
    }
  ];

  const stats = [
    {
      number: "20",
      label: "Anos de Experiência",
      suffix: ""
    },
    {
      number: "2",
      label: "Estados de Atuação",
      suffix: ""
    },
    {
      number: "100+",
      label: "Projetos Entregues",
      suffix: ""
    },
    {
      number: "50+",
      label: "Colaboradores",
      suffix: ""
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-0 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 pt-10 pb-5">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <Badge variant="outline" className="mb-6 bg-secondary/20 text-secondary border-secondary/30">
                <Building2 className="w-4 h-4 mr-2" />
                Nossa História
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Sobre a
                <span className="text-secondary block">Lalu Adm</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
                Incorporadora e administradora de imóveis com tradição, 
                inovação e compromisso com a excelência.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Nossa Trajetória
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    Somos uma incorporadora com quase 20 anos de atuação no Paraná e em Santa Catarina. 
                    Com sede em Curitiba, reunimos experiência e solidez em um portfólio que vai de 
                    empreendimentos residenciais a projetos logísticos.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Especializada em incorporação, gestão, venda e locação de imóveis próprios, a Lalu 
                    entrega soluções completas que unem inovação, segurança e valorização patrimonial. 
                    Nosso diferencial está na experiência da equipe e no cuidado com cada projeto — 
                    construímos confiança e desenvolvimento por onde passamos.
                  </p>
                </div>

                <div className="mt-8">
                  <Link to="/empreendimentos">
                    <Button variant="hero" size="lg" className="group">
                      Conheça Nossos Projetos
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative animate-slide-up" style={{animationDelay: '200ms'}}>
                <div className="relative rounded-lg overflow-hidden shadow-elegant">
                  <img 
                    src={heroBuilding}
                    alt="Edifício da Lalu Adm"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-primary opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Números que Falam por Si
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nossa trajetória é marcada por resultados consistentes e crescimento sustentável.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Nossos Valores
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Os princípios que guiam nossa atuação e definem nossa identidade empresarial.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-elegant transition-all duration-500 bg-card border-border animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Nossa Localização
                </h2>
                <p className="text-lg text-muted-foreground">
                  Estrategicamente posicionados em Curitiba para atender todo o Paraná e Santa Catarina.
                </p>
              </div>

              <Card className="bg-card border-border shadow-elegant">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center mb-4">
                        <MapPin className="w-6 h-6 text-secondary mr-3" />
                        <h3 className="text-xl font-bold text-primary">Sede Curitiba</h3>
                      </div>
                      <div className="space-y-2 text-muted-foreground">
                        <p>R. Padre Anchieta, 2050 - sala 705</p>
                        <p>Bigorrilho, Curitiba - PR</p>
                        <p>CEP 80730-001</p>
                      </div>
                      <div className="mt-6">
                        <Link to="/contato">
                          <Button variant="outline" className="group">
                            Entre em Contato
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <GoogleMap 
                      address="R. Padre Anchieta, 2050, Bigorrilho, Curitiba, PR" 
                      height="250px" 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pronto para Investir com a Lalu?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Descubra as oportunidades de investimento que preparamos especialmente para você. 
                Nossa equipe está pronta para apresentar as melhores opções do mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contato">
                  <Button variant="hero" size="lg" className="group">
                    Fale Conosco
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Ver Portfólio
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

export default About;