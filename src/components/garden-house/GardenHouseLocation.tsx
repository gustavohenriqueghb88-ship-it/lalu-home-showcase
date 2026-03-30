import { MapPin, Navigation, Plane, Waves, Landmark, ExternalLink } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";
import gardenSunset from "@/assets/garden-house-sunset.png";
import gardenBarraVelha from "@/assets/garden-house-barra-velha.png";
import gardenCoast from "@/assets/garden-house-coast.png";

const proximities = [
  { icon: Waves, text: "A 3 minutos da praia" },
  { icon: Waves, text: "A 600m da lagoa" },
  { icon: Navigation, text: "Entre Joinville e Balneário Camboriú" },
  { icon: Plane, text: "Próximo a 2 aeroportos" },
  { icon: Landmark, text: "No centro de Barra Velha" },
];

const regionImages = [
  { img: gardenSunset, alt: "Pôr do sol em Barra Velha" },
  { img: gardenBarraVelha, alt: "Vista aérea de Barra Velha" },
  { img: gardenCoast, alt: "Litoral de Barra Velha" },
];

export default function GardenHouseLocation() {
  return (
    <section className="py-24 md:py-32 bg-[#f7f5f0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
            Localização
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D]">
            Onde Estamos
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto mb-14">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <GoogleMap address="Barra Velha, SC" height="350px" />
          </div>

          <div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#1B3A2D] mb-4">
              Barra Velha – SC
            </h3>
            <p className="text-[#1B3A2D]/70 font-['DM_Sans'] mb-8 leading-relaxed">
              Localizado em uma das regiões que mais cresce no litoral catarinense,
              o Garden House Residence oferece acesso privilegiado às principais
              cidades e praias da região.
            </p>

            <div className="space-y-4 mb-8">
              {proximities.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8922A]/10 flex-shrink-0">
                      <Icon className="h-4 w-4 text-[#C8922A]" />
                    </div>
                    <span className="text-sm text-[#1B3A2D]/80 font-['DM_Sans']">{p.text}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="https://maps.google.com/?q=Barra+Velha+SC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#C8922A] font-semibold text-sm hover:underline font-['DM_Sans']"
            >
              <ExternalLink className="h-4 w-4" /> Abrir no Google Maps
            </a>
          </div>
        </div>

        {/* Region gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {regionImages.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              <img
                src={item.img}
                alt={item.alt}
                className="w-full object-cover aspect-[4/3] group-hover:scale-[1.05] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
