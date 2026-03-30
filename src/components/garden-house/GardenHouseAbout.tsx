import { Check, Shield } from "lucide-react";
import gardenHero from "@/assets/garden-house-hero.png";

export default function GardenHouseAbout() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="animate-fade-in">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
              Empreendimento
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#1B3A2D] mb-8 leading-[1.15]">
              Sobre o
              <br />
              Garden House Residence
            </h2>
            <p className="text-[#1B3A2D]/70 leading-relaxed mb-4 font-['DM_Sans'] text-base">
              O Condomínio Garden House Residence é um empreendimento de alto padrão em Barra Velha, Santa Catarina. Com 113 lotes prontos para construir, oferece a combinação perfeita entre segurança, natureza e qualidade de vida.
            </p>
            <p className="text-[#1B3A2D]/70 leading-relaxed mb-8 font-['DM_Sans'] text-base">
              Localizado estrategicamente próximo à praia e à lagoa, o condomínio conta com infraestrutura completa e está em uma das regiões que mais cresce no litoral catarinense.
            </p>
            <div className="flex items-center gap-3 rounded-xl border border-[#C8922A]/30 bg-[#C8922A]/5 px-5 py-4">
              <Check className="h-5 w-5 text-[#C8922A] flex-shrink-0" />
              <span className="text-sm font-semibold text-[#1B3A2D] font-['DM_Sans']">
                Garantia de Entrega LALU
              </span>
            </div>
          </div>

          <div className="relative">
            <img
              src={gardenHero}
              alt="Vista do condomínio Garden House Residence"
              className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]"
            />
            <div className="absolute bottom-5 left-5 rounded-xl bg-[#1B3A2D] px-5 py-3 shadow-lg flex items-center gap-3">
              <Shield className="h-5 w-5 text-[#C8922A]" />
              <span className="text-xs text-white font-medium font-['DM_Sans']">
                Condomínio fechado de alto padrão
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
