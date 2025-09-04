import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Home, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import apartmentInterior from '@/assets/apartment-interior.jpg';
import commercialBuilding from '@/assets/commercial-building.jpg';

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Loteamento Rotas do Sol",
      location: "Araquari - SC",
      type: "Loteamento",
      status: "Disponível",
      description: "71 lotes prontos para construir a partir de 300m². Infraestrutura completa com ruas asfaltadas, iluminação pública, rede de água e esgoto.",
      image: commercialBuilding,
      features: ["71 lotes disponíveis", "A partir de 300m²", "Infraestrutura completa"],
      price: "Entrada facilitada"
    },
    {
      id: 2,
      title: "Condomínio Garden House Residence",
      location: "Barra Velha - SC",
      type: "Condomínio",
      status: "Disponível",
      description: "113 lotes prontos para construir em condomínio fechado de alto padrão. Próximo à praia e lagoa, localização estratégica.",
      image: apartmentInterior,
      features: ["113 lotes", "Condomínio fechado", "Próximo à praia"],
      price: "Alto padrão"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 bg-secondary/10 text-secondary border-secondary/30">
            <Building2 className="w-4 h-4 mr-2" />
            Empreendimentos em Destaque
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Nossos Principais
            <span className="text-secondary block">Empreendimentos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça os projetos que demonstram nossa excelência em incorporação 
            e desenvolvimento imobiliário.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={project.id} className={`group hover:shadow-elegant transition-all duration-500 bg-card border-border animate-slide-up`} style={{animationDelay: `${index * 200}ms`}}>
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={project.type === 'Residencial' ? 'default' : 'secondary'}>
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
                    <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-secondary">{project.price}</div>
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

                <Link to="/empreendimentos" className="w-full">
                  <Button variant="outline" className="w-full group">
                    Saiba Mais
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/empreendimentos">
            <Button variant="hero" size="lg" className="group">
              Ver Todos os Empreendimentos
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;