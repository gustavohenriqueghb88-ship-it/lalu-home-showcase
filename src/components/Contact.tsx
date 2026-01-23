import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GoogleMap from '@/components/GoogleMap';
import { useToast } from '@/hooks/use-toast';
import { maskPhone, maskName, submitToGoogleSheets } from '@/utils/formUtils';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send,
  Clock,
  ArrowRight,
  Loader2
} from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    interesse: 'Empreendimentos',
    mensagem: ''
  });

  const handleInputChange = (field: string, value: string) => {
    if (field === 'telefone') {
      setFormData(prev => ({ ...prev, telefone: maskPhone(value) }));
    } else if (field === 'nome') {
      setFormData(prev => ({ ...prev, nome: maskName(value) }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome.trim() || !formData.email.trim() || !formData.telefone.trim()) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'E-mail inválido',
        description: 'Por favor, insira um e-mail válido.',
        variant: 'destructive',
      });
      return;
    }

    if (!GOOGLE_SCRIPT_URL) {
      toast({
        title: 'Configuração necessária',
        description: 'O formulário ainda não está configurado. Entre em contato com o administrador.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const success = await submitToGoogleSheets({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        interesse: formData.interesse,
        mensagem: formData.mensagem,
      });
      
      if (success) {
        toast({
          title: 'Mensagem enviada!',
          description: 'Obrigado pelo contato. Nossa equipe entrará em contato em breve.',
        });

        // Limpar formulário
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          interesse: 'Empreendimentos',
          mensagem: ''
        });
      } else {
        throw new Error('Falha ao enviar');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente ou entre em contato pelo WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      value: "(41) 98430-5403",
      href: "tel:+5541984305403"
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@laluadm.com",
      href: "mailto:contato@laluadm.com"
    },
    {
      icon: MapPin,
      title: "Endereço",
      value: "R. Padre Anchieta, 2050 - sala 705, Bigorrilho, Curitiba - PR, CEP 80730-001",
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
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nome Completo *
                    </label>
                    <input 
                      type="text" 
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
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
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      maxLength={15}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                      placeholder="(41) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Interesse
                    </label>
                    <select 
                      value={formData.interesse}
                      onChange={(e) => handleInputChange('interesse', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                    >
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
                    value={formData.mensagem}
                    onChange={(e) => handleInputChange('mensagem', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                    placeholder="Conte-nos mais sobre seu interesse..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit"
                    variant="hero" 
                    size="lg" 
                    className="flex-1 group"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar Mensagem
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button"
                    variant="whatsapp" 
                    size="lg" 
                    className="flex-1"
                    onClick={() => window.open('https://wa.me/5541984305403', '_blank')}
                    disabled={loading}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </div>
                </form>
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

          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 animate-slide-up" style={{animationDelay: '300ms'}}>
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">Nossa Localização</h3>
          <GoogleMap 
            address="R. Padre Anchieta, 2050, Bigorrilho, Curitiba, PR" 
            height="400px" 
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;