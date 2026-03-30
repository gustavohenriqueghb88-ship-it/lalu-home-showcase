import gardenHero from "@/assets/garden-house-hero.png";
import gardenArea from "@/assets/garden-house-area.png";
import garden1 from "@/assets/garden-house-1.jpg";
import garden2 from "@/assets/garden-house-2.jpg";
import garden3 from "@/assets/garden-house-3.jpg";

const images = [
  { img: gardenArea, alt: "Vista aérea do Garden House Residence" },
  { img: gardenHero, alt: "Render do Garden House Residence" },
  { img: garden1, alt: "Infraestrutura do Garden House" },
  { img: garden2, alt: "Área verde do Garden House" },
  { img: garden3, alt: "Detalhes do Garden House Residence" },
  { img: gardenArea, alt: "Planta do Garden House Residence" },
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
            Ver mais fotos
          </a>
        </div>
      </div>
    </section>
  );
}
