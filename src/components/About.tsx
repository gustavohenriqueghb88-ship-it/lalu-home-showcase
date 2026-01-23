import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Shield, 
  Building, 
  Target,
  ArrowRight 
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Experiência",
      description: "Quase 20 anos de atuação no mercado imobiliário do PR e SC"
    },
    {
      icon: Shield,
      title: "Solidez",
      description: "Transparência e segurança em todos os nossos projetos"
    },
    {
      icon: TrendingUp,
      title: "Valorização",
      description: "Foco na valorização patrimonial dos nossos clientes"
    },
    {
      icon: Target,
      title: "Inovação",
      description: "Soluções modernas que atendem às necessidades atuais"
    }
  ];

  const stats = [
    { value: "20", label: "Anos de Mercado", suffix: "" },
    { value: "2", label: "Estados", suffix: "" },
    { value: "100", label: "Projetos", suffix: "+" },
    { value: "1000", label: "Famílias Atendidas", suffix: "+" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 bg-secondary/10 text-secondary border-secondary/30">
            <Users className="w-4 h-4 mr-2" />
            Sobre a Lalu
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Construindo
            <span className="text-secondary block">Confiança e Desenvolvimento</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <div className="space-y-6 animate-slide-up">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Somos uma incorporadora com quase <span className="text-secondary font-semibold">20 anos de atuação</span> no 
              Paraná e em Santa Catarina. Com sede em Curitiba, reunimos experiência e solidez em um 
              portfólio que vai de empreendimentos residenciais a projetos logísticos.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Especializada em <span className="text-secondary font-semibold">incorporação, gestão, venda e locação</span> de 
              imóveis próprios, a Lalu entrega soluções completas que unem inovação, segurança e 
              valorização patrimonial.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nosso diferencial está na <span className="text-secondary font-semibold">experiência da equipe</span> e no 
              cuidado com cada projeto. Construímos confiança e desenvolvimento por onde passamos.
            </p>

            <div className="pt-6">
              <Link to="/sobre">
                <Button variant="hero" size="lg" className="group">
                  Conheça Nossa História
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 animate-slide-up" style={{animationDelay: '200ms'}}>
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-elegant transition-all duration-300 border-border">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className={`text-center p-6 hover:shadow-gold transition-all duration-500 bg-card border-border animate-fade-in`} style={{animationDelay: `${index * 100}ms`}}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;