import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Award, Users } from 'lucide-react';
import heroImage from '@/assets/hero-building.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Empreendimento Lalu - Arquitetura Moderna"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 bg-secondary/20 text-secondary border-secondary/30">
            <Award className="w-4 h-4 mr-2" />
            Quase 20 anos de experiência
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Incorporação e 
            <span className="text-secondary block">Administração</span>
            de Imóveis
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Soluções completas em desenvolvimento imobiliário no Paraná e Santa Catarina. 
            Da incorporação à gestão, transformamos ideias em realidade.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-slide-up">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">20</div>
              <div className="text-primary-foreground/80">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">2</div>
              <div className="text-primary-foreground/80">Estados de Atuação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary">100+</div>
              <div className="text-primary-foreground/80">Projetos Entregues</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group">
              Ver Empreendimentos
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Nosso Portfólio
            </Button>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center mt-8 text-primary-foreground/80">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Curitiba - PR | Atuação no PR e SC</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-secondary rounded-full mt-2 animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;