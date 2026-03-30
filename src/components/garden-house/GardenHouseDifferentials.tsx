import { HardHat, Landmark, TrendingUp } from "lucide-react";

const differentials = [
  {
    icon: HardHat,
    title: "Alto padrão construtivo",
    desc: "Condomínio fechado com infraestrutura completa e acabamento de qualidade superior.",
  },
  {
    icon: Landmark,
    title: "Localização privilegiada",
    desc: "Próximo à praia e à lagoa, em uma das regiões mais valorizadas do litoral catarinense.",
  },
  {
    icon: TrendingUp,
    title: "Valorização garantida",
    desc: "Região em plena expansão com alto potencial de retorno sobre o investimento.",
  },
];

export default function GardenHouseDifferentials() {
  return (
    <section className="py-24 md:py-32 bg-[#1B3A2D] relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
            Diferenciais
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-white">
            Nossos Diferenciais
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {differentials.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#C8922A]/15 mb-6 group-hover:bg-[#C8922A]/25 transition-colors">
                  <Icon className="h-7 w-7 text-[#C8922A]" />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-white mb-3">
                  {d.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-['DM_Sans']">
                  {d.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
