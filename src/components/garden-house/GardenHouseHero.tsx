import { MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import gardenArea from "@/assets/garden-house-area.png";
import laluLogo from "@/assets/lalu-logo.png";

const WHATSAPP_URL = "https://wa.me/5541984305403?text=Olá! Tenho interesse no Condomínio Garden House Residence.";

export default function GardenHouseHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${gardenArea})` }}
      />
      <div className="absolute inset-0 bg-[#1B3A2D]/85" />

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <img
          src={laluLogo}
          alt="Lalu Incorporadora"
          className="h-16 mx-auto mb-8 brightness-0 invert opacity-80"
        />

        <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[1.1] tracking-tight">
          Garden House
          <br />
          <span className="text-[#C8922A]">Residence</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/70 mb-10 leading-relaxed font-['DM_Sans']">
          Condomínio fechado de alto padrão, perto da praia
          <br className="hidden sm:block" />
          e da lagoa em Barra Velha – SC.
        </p>

        <div className="flex items-center justify-center gap-2 text-[#C8922A] mb-12">
          <MapPin className="h-5 w-5" />
          <span className="text-sm font-medium tracking-widest uppercase font-['DM_Sans']">
            Barra Velha – SC
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-[#C8922A] hover:bg-[#b07e22] text-[#1B3A2D] text-base font-bold px-8 rounded-full font-['DM_Sans']"
          >
            <a href="#contact">
              Quero Mais Info <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="whatsapp"
            className="text-base font-bold px-8 rounded-full font-['DM_Sans']"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
