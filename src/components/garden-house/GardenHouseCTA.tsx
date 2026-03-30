import {
  Shield, Trees, Sun, Home, Lock, Waves, Heart, Compass, ArrowRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  { icon: Shield, label: "Segurança 24h" },
  { icon: Trees, label: "Natureza" },
  { icon: Sun, label: "Qualidade de Vida" },
  { icon: Home, label: "Conforto" },
  { icon: Lock, label: "Privacidade" },
  { icon: Waves, label: "Perto da Praia" },
  { icon: Heart, label: "Bem-estar" },
  { icon: Compass, label: "Localização" },
];

export default function GardenHouseCTA() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-24 md:py-32 bg-[#1B3A2D]">
      <div ref={ref} className="container mx-auto px-4 text-center">
        <div className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
            Estilo de Vida
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
            Sua Casa de Praia
            <br />
            <span className="text-[#C8922A]">Começa Aqui</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-14 font-['DM_Sans'] text-lg">
            Tudo o que você sempre sonhou para sua família, em um só lugar.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto mb-14">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`flex flex-col items-center gap-3 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-90"}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8922A]/15">
                  <Icon className="h-6 w-6 text-[#C8922A]" />
                </div>
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider font-['DM_Sans']">
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className={`transition-all duration-700 ease-out delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] font-bold px-10 py-4 rounded-full text-base uppercase tracking-wider transition-colors font-['DM_Sans']"
          >
            Quero Meu Lote <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
