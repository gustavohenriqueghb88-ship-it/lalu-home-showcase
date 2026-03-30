import laluLogo from "@/assets/lalu-logo.png";

export default function GardenHouseBrand() {
  return (
    <section className="py-24 md:py-32 bg-[#142b22] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1B3A2D]/50 to-[#142b22]" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <img
          src={laluLogo}
          alt="Lalu Incorporadora"
          className="h-20 md:h-28 mx-auto mb-8 brightness-0 invert opacity-90"
        />
        <p className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#C8922A] italic mb-4">
          Construímos confiança e desenvolvimento
        </p>
        <p className="text-white/50 text-sm font-['DM_Sans'] tracking-wide max-w-lg mx-auto">
          Incorporadora com quase 20 anos de atuação no Paraná e em Santa Catarina. Experiência e solidez em cada projeto.
        </p>
      </div>
    </section>
  );
}
