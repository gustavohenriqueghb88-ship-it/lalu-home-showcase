import gardenHero from "@/assets/garden-house-hero.png";
import gardenArea from "@/assets/garden-house-area.png";
import gardenAerialCity from "@/assets/garden-house-aerial-city.png";
import gardenAerialBack from "@/assets/garden-house-aerial-back.png";
import gardenCoast from "@/assets/garden-house-coast.png";
import gardenBridge from "@/assets/garden-house-bridge.png";

const images = [
  { img: gardenAerialCity, alt: "Vista aérea do Garden House com a cidade e o mar" },
  { img: gardenHero, alt: "Render das casas do Garden House Residence" },
  { img: gardenAerialBack, alt: "Vista aérea posterior do Garden House" },
  { img: gardenArea, alt: "Planta do Garden House Residence" },
  { img: gardenCoast, alt: "Litoral de Barra Velha" },
  { img: gardenBridge, alt: "Ponte da região de Barra Velha" },
];

export default function GardenHouseGallery() {
  return (
    <section className="py-20 bg-[#f7f5f0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8922A] font-semibold mb-4 block font-['DM_Sans']">
            Galeria
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1B3A2D]">
            Conheça o Empreendimento
          </h2>
        </div>

        {/* Video */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/4oy_-3ybHF8"
              title="Garden House Residence"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              <img
                src={item.img}
                alt={item.alt}
                className="w-full object-cover aspect-[16/11] group-hover:scale-[1.05] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A2D]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] font-bold px-8 py-3 rounded-full text-sm uppercase tracking-wider transition-colors font-['DM_Sans']"
          >
            Solicitar mais informações
          </a>
        </div>
      </div>
    </section>
  );
}
