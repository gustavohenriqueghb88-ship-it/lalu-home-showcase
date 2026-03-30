import { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import implantationImg from "@/assets/garden-house-implantation.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { lots, type Lot, type LotStatus } from "@/data/gardenHouseLots";

const STATUS_COLORS: Record<LotStatus, { color: string; label: string; cssColor: string }> = {
  "DISPONÍVEL": { color: "#C8922A", label: "Disponível", cssColor: "text-[#C8922A]" },
  "INDISPONÍVEL": { color: "#DC3545", label: "Indisponível", cssColor: "text-[#DC3545]" },
  "VENDIDO": { color: "#6C757D", label: "Vendido", cssColor: "text-[#6C757D]" },
};

function LotHotspot({
  lot,
  isActive,
  onActivate,
  onDeactivate,
}: {
  lot: Lot;
  isActive: boolean;
  onActivate: (lot: Lot) => void;
  onDeactivate: () => void;
}) {
  const { color } = STATUS_COLORS[lot.status];

  return (
    <div
      onMouseEnter={() => onActivate(lot)}
      onMouseLeave={() => onDeactivate()}
      onClick={(e) => {
        e.stopPropagation();
        onActivate(lot);
      }}
      className="absolute flex flex-col items-center cursor-pointer"
      style={{
        left: `${lot.left}%`,
        top: `${lot.top}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isActive ? 50 : 10,
      }}
    >
      {/* Lot number label */}
      <span
        className="text-[6px] md:text-[8px] font-bold leading-none mb-0.5 select-none font-['DM_Sans'] drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
        style={{ color: "#fff" }}
      >
        {lot.number}
      </span>

      {/* Hotspot dot */}
      <div className="relative flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
        <span
          className="absolute w-full h-full rounded-full border-2 opacity-75"
          style={{
            borderColor: color,
            animation: "hotspot-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        />
        <span
          className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shadow-md"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Tooltip popover */}
      {isActive && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap bg-white rounded-lg shadow-2xl border border-[#1B3A2D]/15 px-3.5 py-2 font-['DM_Sans'] pointer-events-none"
          style={{ zIndex: 100 }}
        >
          <div className="text-[11px] font-bold text-[#1B3A2D]">Lote {lot.number}</div>
          <div className="text-[10px] text-[#1B3A2D]/70">{lot.area}m²</div>
          <div className={`text-[10px] font-semibold mt-0.5 ${STATUS_COLORS[lot.status].cssColor}`}>
            {STATUS_COLORS[lot.status].label}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}
    </div>
  );
}

export default function GardenHouseSitePlan() {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();
  const [activeLot, setActiveLot] = useState<Lot | null>(null);

  const handleDeactivate = useCallback(() => setActiveLot(null), []);

  const counts = lots.reduce(
    (acc, l) => {
      acc[l.status] = (acc[l.status] || 0) + 1;
      return acc;
    },
    {} as Record<LotStatus, number>
  );

  return (
    <section className="py-24 md:py-32 bg-white">
      <style>{`
        @keyframes hotspot-ping {
          0% { transform: scale(1); opacity: 0.75; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      <div ref={ref} className="container mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
            Planta Interativa
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-4">
            Mapa de Implantação
          </h2>
          <p className="text-[#1B3A2D]/60 max-w-xl mx-auto font-['DM_Sans']">
            Passe o mouse sobre os lotes para ver detalhes como área e disponibilidade.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div
            onClick={() => setActiveLot(null)}
            className={`relative rounded-2xl overflow-visible shadow-2xl border border-[#1B3A2D]/10 transition-all duration-700 ease-out delay-200 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <img
              src={implantationImg}
              alt="Planta do Garden House Residence"
              className="w-full block rounded-2xl"
              draggable={false}
            />
            {lots.map((lot) => (
              <LotHotspot
                key={lot.number}
                lot={lot}
                isActive={activeLot?.number === lot.number}
                onActivate={setActiveLot}
                onDeactivate={handleDeactivate}
              />
            ))}
          </div>

          {/* Legend */}
          <div className={`flex flex-wrap justify-center gap-6 mt-8 transition-all duration-700 ease-out delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {(Object.entries(STATUS_COLORS) as [LotStatus, typeof STATUS_COLORS[LotStatus]][]).map(([status, { color, label }]) => (
              <div key={status} className="flex items-center gap-2 font-['DM_Sans'] text-sm text-[#1B3A2D]/80">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: color }} />
                {label} ({counts[status] || 0})
              </div>
            ))}
          </div>

          <div className={`text-center mt-10 transition-all duration-700 ease-out delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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
