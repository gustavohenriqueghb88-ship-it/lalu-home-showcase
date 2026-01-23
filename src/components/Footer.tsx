import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp 
} from 'lucide-react';
import laluLogo from '@/assets/lalu-logo.png';
import PrivacyPolicyModal from '@/components/PrivacyPolicyModal';
import TermsOfUseModal from '@/components/TermsOfUseModal';

const Footer = () => {
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [termsOfUseOpen, setTermsOfUseOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-[44px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img 
                src={laluLogo} 
                alt="Lalu Incorporadora" 
                className="h-20 sm:h-28 md:h-32 lg:h-36 w-auto bg-white/10 p-2 sm:p-3 md:p-4 rounded-lg backdrop-blur-sm"
              />
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed text-sm sm:text-base">
              Incorporadora com quase 20 anos de experiência no Paraná e Santa Catarina. 
              Especializada em soluções completas que unem inovação, segurança e valorização patrimonial.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-secondary mb-4">Navegação</h3>
            <ul className="space-y-3">
              {[
                { name: 'Início', href: '/' },
                { name: 'Empreendimentos', href: '/empreendimentos' },
                { name: 'Portfólio', href: '/portfolio' },
                { name: 'Sobre nós', href: '/sobre' },
                { name: 'Contato', href: '/contato' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-smooth"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-secondary mb-4">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-primary-foreground/80">(41) 98430-5403</div>
                  <div className="text-primary-foreground/60 text-sm">Seg à Sex: 8h às 18h</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a 
                  href="mailto:contato@laluadm.com"
                  className="text-primary-foreground/80 hover:text-secondary transition-smooth"
                >
                  contato@laluadm.com
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  R. Padre Anchieta, 2050 - sala 705<br />
                  Bigorrilho, Curitiba - PR<br />
                  CEP 80730-001
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-foreground/60 text-xs sm:text-sm mb-4 md:mb-0 text-center md:text-left">
            © 2024 Lalu Incorporadora. Todos os direitos reservados.
          </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <button 
                onClick={() => setPrivacyPolicyOpen(true)}
                className="text-primary-foreground/60 hover:text-secondary text-xs sm:text-sm transition-smooth cursor-pointer whitespace-nowrap"
              >
                Política de Privacidade
              </button>
              <button 
                onClick={() => setTermsOfUseOpen(true)}
                className="text-primary-foreground/60 hover:text-secondary text-xs sm:text-sm transition-smooth cursor-pointer whitespace-nowrap"
              >
                Termos de Uso
              </button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={scrollToTop}
                className="text-primary-foreground/60 hover:text-secondary hover:bg-secondary/10 flex-shrink-0"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal 
        open={privacyPolicyOpen} 
        onOpenChange={setPrivacyPolicyOpen} 
      />
      <TermsOfUseModal 
        open={termsOfUseOpen} 
        onOpenChange={setTermsOfUseOpen} 
      />
    </footer>
  );
};

export default Footer;