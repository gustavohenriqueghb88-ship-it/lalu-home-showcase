import { ArrowRight } from "lucide-react";
import gardenArea from "@/assets/garden-house-area.png";

export default function GardenHouseSitePlan() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
            Planta
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-4">
            Mapa de Implantação
          </h2>
          <p className="text-[#1B3A2D]/60 max-w-xl mx-auto font-['DM_Sans']">
            Confira a distribuição dos lotes e a infraestrutura planejada do condomínio.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#1B3A2D]/10">
            <img
              src={gardenArea}
              alt="Planta do Garden House Residence"
              className="w-full object-cover"
            />
          </div>

          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wider transition-colors font-['DM_Sans']"
            >
              Solicitar Informações <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
