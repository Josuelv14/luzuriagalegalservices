import { MessageCircle } from "lucide-react";
import { PHONE_INTL } from "@/lib/i18n";

export function FloatingCTA() {
  return (
    <a
      href={`https://wa.me/${PHONE_INTL}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-white font-semibold shadow-elegant hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm">WhatsApp</span>
    </a>
  );
}
