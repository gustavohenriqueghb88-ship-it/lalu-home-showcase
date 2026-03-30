import { MessageCircle } from "lucide-react";

import GardenHouseHero from "@/components/garden-house/GardenHouseHero";
import GardenHouseStats from "@/components/garden-house/GardenHouseStats";
import GardenHouseAbout from "@/components/garden-house/GardenHouseAbout";
import GardenHouseGallery from "@/components/garden-house/GardenHouseGallery";
import GardenHouseInfra from "@/components/garden-house/GardenHouseInfra";
import GardenHouseDifferentials from "@/components/garden-house/GardenHouseDifferentials";
import GardenHouseCTA from "@/components/garden-house/GardenHouseCTA";
import GardenHouseBrand from "@/components/garden-house/GardenHouseBrand";
import GardenHouseSitePlan from "@/components/garden-house/GardenHouseSitePlan";
import GardenHouseLocation from "@/components/garden-house/GardenHouseLocation";
import GardenHouseContact from "@/components/garden-house/GardenHouseContact";
import GardenHouseFooter from "@/components/garden-house/GardenHouseFooter";

const WHATSAPP_URL = "https://wa.me/5541984305403?text=Olá! Tenho interesse no Condomínio Garden House Residence.";

export default function GardenHouse() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      <GardenHouseHero />
      <GardenHouseStats />
      <GardenHouseAbout />
      <GardenHouseGallery />
      <GardenHouseInfra />
      <GardenHouseDifferentials />
      <GardenHouseCTA />
      <GardenHouseBrand />
      <GardenHouseSitePlan />
      <GardenHouseLocation />
      <GardenHouseContact />
      <GardenHouseFooter />
    </div>
  );
}
