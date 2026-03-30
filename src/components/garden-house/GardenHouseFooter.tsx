import laluLogo from "@/assets/lalu-logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

export default function GardenHouseFooter() {
  return (
    <footer className="bg-[#0f2219] border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Logo + slogan */}
          <div>
            <img src={laluLogo} alt="Lalu" className="h-10 brightness-0 invert opacity-70 mb-4" />
            <p className="text-white/40 text-sm font-['DM_Sans'] leading-relaxed">
              Construímos confiança e desenvolvimento por onde passamos.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C8922A] font-semibold mb-4 font-['DM_Sans']">
              Navegação
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Sobre", href: "#about" },
                { label: "Infraestrutura", href: "#infra" },
                { label: "Localização", href: "#location" },
                { label: "Contato", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-[#C8922A] text-sm transition-colors font-['DM_Sans']"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C8922A] font-semibold mb-4 font-['DM_Sans']">
              Contato
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/50 text-sm font-['DM_Sans']">
                <Phone className="h-4 w-4 text-[#C8922A]" />
                (41) 98430-5403
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm font-['DM_Sans']">
                <Mail className="h-4 w-4 text-[#C8922A]" />
                contato@laluadm.com
              </div>
              <div className="flex items-start gap-3 text-white/50 text-sm font-['DM_Sans']">
                <MapPin className="h-4 w-4 text-[#C8922A] mt-0.5 flex-shrink-0" />
                R. Padre Anchieta, 2050 - sala 705, Bigorrilho, Curitiba - PR
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-5">
          <p className="text-center text-white/30 text-xs font-['DM_Sans']">
            © {new Date().getFullYear()} Lalu Incorporadora. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
