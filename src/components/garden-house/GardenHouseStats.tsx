import { LayoutGrid, Ruler, Lock, Waves } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: "113", label: "Lotes Disponíveis", icon: LayoutGrid },
  { value: "300m²", label: "A Partir De", icon: Ruler },
  { value: "", label: "Condomínio Fechado", icon: Lock },
  { value: "", label: "Perto da Praia", icon: Waves },
];

export default function GardenHouseStats() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-[#1B3A2D] border-t border-white/10">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`flex flex-col items-center justify-center py-10 gap-2 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {stat.value ? (
                  <span className="font-['Playfair_Display'] font-bold text-[#C8922A] text-4xl md:text-5xl">
                    {stat.value}
                  </span>
                ) : (
                  <Icon className="h-9 w-9 text-[#C8922A]" />
                )}
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-['DM_Sans'] font-medium text-center">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
