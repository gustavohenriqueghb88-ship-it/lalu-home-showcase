import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { getOgShareUrl } from "@/lib/ogUrl";

interface LinkedInShareButtonProps {
  slug: string;
  className?: string;
}

const LinkedInShareButton = ({ slug, className }: LinkedInShareButtonProps) => {
  const handleShare = () => {
    const ogUrl = `https://og.laluadm.com/artigo/${slug}`;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogUrl)}`;
    window.open(shareUrl, "linkedin-share", "width=600,height=600,scrollbars=yes");
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full",
        "bg-[#0077B5] text-white hover:bg-[#005f8d]",
        "transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:shadow-lg active:scale-95",
        "w-9 h-9 text-sm font-medium",
        className
      )}
      aria-label="Compartilhar no LinkedIn"
      title="Compartilhar no LinkedIn"
    >
      <Linkedin size={16} />
    </button>
  );
};

export default LinkedInShareButton;
