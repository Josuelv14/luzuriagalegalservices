import { Scale, Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";
import { useLang, PHONE, PHONE_INTL } from "@/lib/i18n";

export function Footer() {
  const { tr } = useLang();
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-gradient">
              <Scale className="h-5 w-5 text-navy" />
            </div>
            <div>
              <div className="font-display text-lg">Luzuriaga Legal Services</div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold">Notary • Apostille • Translation</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-navy-foreground/70 max-w-md">{tr("tagline")}</p>
          <div className="mt-5 flex gap-3">
            <a href="https://wa.me/19176910055" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-navy transition"><MessageCircle className="h-4 w-4" /></a>

            <a href="https://www.facebook.com/profile.php?id=100087573588437"
            target="_blank"            rel="noopener noreferrer"
            aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-navy transition"><Facebook className="h-4 w-4" /></a>
            {/* El icono de Instagram estaba aquí - Se ha removido temporalmente */}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-navy-foreground/80">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold mt-0.5" /><a href={`tel:${PHONE}`}>{PHONE}</a></li>
            <li className="flex gap-2"><MessageCircle className="h-4 w-4 text-gold mt-0.5" /><a href={`https://wa.me/${PHONE_INTL}`}>WhatsApp</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold mt-0.5" /><a href="mailto:info@luzuriagalegal.com">info@luzuriagalegal.com</a></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold mt-0.5" />New York, NY</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">{tr("nav_areas")}</h4>
          <ul className="space-y-2 text-sm text-navy-foreground/80">
            {["Queens","Yonkers","Bronx","Manhattan","Brooklyn","Westchester","Long Island"].map(a => <li key={a}>{a}</li>)}
          </ul>
          <p className="mt-4 text-xs text-navy-foreground/60">{tr("hours")}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 text-center text-xs text-navy-foreground/60">
          © {new Date().getFullYear()} Luzuriaga Legal Services. {tr("rights")}
        </div>
      </div>
    </footer>
  );
}
