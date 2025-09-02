import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send,
  Clock,
  ArrowRight 
} from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: "(41) 3333-4444",
      href: "tel:+554133334444"
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@lalu.com.br",
      href: "mailto:contato@lalu.com.br"
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "Rua das Flores, 123 - Centro, Curitiba - PR",
      href: "#"
    },
    {
      icon: Clock,
      title: "Horário",
      value: "Seg à Sex: 8h às 18h | Sáb: 9h às 13h",
      href: "#"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 bg-secondary/10 text-secondary border-secondary/30">
            <MessageSquare className="w-4 h-4 mr-2" />
            Entre em Contato
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Vamos Conversar Sobre
            <span className="text-secondary block">Seu Próximo Investimento</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nossa equipe está pronta para apresentar as melhores oportunidades 
            de investimento imobiliário para você.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border shadow-elegant animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Solicite Informações</CardTitle>
                <p className="text-muted-foreground">
                  Preencha o formulário e nossa equipe entrará em contato em até 24 horas.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nome Completo *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      E-mail *
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefone *
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                      placeholder="(41) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Interesse
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth">
                      <option>Empreendimentos</option>
                      <option>Locação</option>
                      <option>Venda</option>
                      <option>Incorporação</option>
                      <option>Outros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensagem
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                    placeholder="Conte-nos mais sobre seu interesse..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="lg" className="flex-1 group">
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="whatsapp" size="lg" className="flex-1">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-slide-up" style={{animationDelay: '200ms'}}>
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 hover:shadow-gold transition-all duration-300 bg-card border-border">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1">{info.title}</h3>
                      {info.href && info.href !== '#' ? (
                        <a 
                          href={info.href}
                          className="text-muted-foreground hover:text-secondary transition-smooth"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-gold text-secondary-foreground border-0">
              <CardContent className="p-0 text-center">
                <h3 className="text-xl font-bold mb-3">Atendimento Rápido</h3>
                <p className="mb-4 opacity-90">
                  Precisa de informações urgentes? Fale diretamente conosco.
                </p>
                <Button variant="outline" className="w-full bg-background/10 border-background/20 text-secondary-foreground hover:bg-background hover:text-primary">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;