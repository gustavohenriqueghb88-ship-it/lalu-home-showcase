import {
  Shield, Lock, Building2, Camera, Compass, MapPinned,
  Navigation, Plane, Landmark, ShoppingBag, Wrench,
  Lightbulb, Umbrella, Waves, TrendingUp, Car
} from "lucide-react";

const infra = [
  { icon: Shield, label: "Condomínio Fechado" },
  { icon: Lock, label: "Portal com Segurança 24h" },
  { icon: Building2, label: "Muros com 2,30m de Altura" },
  { icon: Camera, label: "Monitoramento por Câmeras" },
  { icon: Compass, label: "Projeto de Alto Padrão" },
  { icon: MapPinned, label: "Localização Privilegiada" },
  { icon: Navigation, label: "Entre Joinville e Baln. Camboriú" },
  { icon: Plane, label: "Próximo a 2 Aeroportos" },
  { icon: Landmark, label: "No Centro da Cidade" },
  { icon: ShoppingBag, label: "Perto de Centros Comerciais" },
  { icon: Wrench, label: "Infraestrutura Completa" },
  { icon: Lightbulb, label: "Ruas Padronizadas" },
  { icon: Umbrella, label: "A 3 min da Praia" },
  { icon: Waves, label: "A 600m da Lagoa" },
  { icon: TrendingUp, label: "Local de Alta Valorização" },
  { icon: Car, label: "Fácil Acesso" },
];

export default function GardenHouseInfra() {
  return (
    <section id="infra" className="py-24 md:py-32 bg-[#f2f0eb]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
            Estrutura
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-4">
            Infraestrutura Completa
          </h2>
          <p className="text-[#1B3A2D]/60 max-w-xl mx-auto font-['DM_Sans']">
            Tudo o que você precisa para viver com segurança e conforto no litoral.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {infra.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group bg-white border border-[#1B3A2D]/8 rounded-xl hover:border-[#C8922A]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center justify-center py-7 px-4 text-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8922A]/10">
                    <Icon className="h-5 w-5 text-[#C8922A] group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#1B3A2D] uppercase tracking-wide font-['DM_Sans']">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
