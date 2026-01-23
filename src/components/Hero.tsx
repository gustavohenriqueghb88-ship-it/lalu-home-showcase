import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-building.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <Badge variant="outline" className="mb-4 sm:mb-6 bg-secondary/20 text-secondary border-secondary/30 text-xs sm:text-sm">
            <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="whitespace-nowrap">Quase 20 anos de experiência</span>
          </Badge>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-foreground mb-3 sm:mb-4 md:mb-6 leading-tight px-2 sm:px-4">
            Incorporação e 
            <span className="text-secondary block">Administração</span>
            de Imóveis
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-primary-foreground/90 mb-5 sm:mb-6 md:mb-8 max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
            Soluções completas em desenvolvimento imobiliário no Paraná e Santa Catarina. 
            Da incorporação à gestão, transformamos ideias em realidade.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-12 animate-slide-up px-2 sm:px-4">
            <div className="text-center min-w-[100px] sm:min-w-[120px]">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">20</div>
              <div className="text-xs sm:text-sm md:text-base text-primary-foreground/80">Anos de Experiência</div>
            </div>
            <div className="text-center min-w-[100px] sm:min-w-[120px]">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">2</div>
              <div className="text-xs sm:text-sm md:text-base text-primary-foreground/80">Estados de Atuação</div>
            </div>
            <div className="text-center min-w-[100px] sm:min-w-[120px]">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">100+</div>
              <div className="text-xs sm:text-sm md:text-base text-primary-foreground/80">Projetos Entregues</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-4 mb-4 sm:mb-6">
            <Link to="/empreendimentos" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                Ver Empreendimentos
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                Nosso Portfólio
              </Button>
            </Link>
          </div>

          {/* Location */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 md:mt-8 text-primary-foreground/80 text-xs sm:text-sm md:text-base px-2 sm:px-4">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="text-center whitespace-nowrap">Curitiba - PR</span>
            </div>
            <span className="hidden sm:inline mx-2">|</span>
            <span className="text-center sm:whitespace-nowrap">Atuação no PR e SC</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-secondary rounded-full mt-1 sm:mt-2 animate-float" />
        </div>
      </div>
    </section>
  );
};

export default Hero;