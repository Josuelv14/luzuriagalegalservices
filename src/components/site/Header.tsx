import { Link } from "@tanstack/react-router";
import { Scale, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { useLang, PHONE } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Header() {
  const { lang, setLang, tr } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/#services", label: tr("nav_services") },
    { to: "/#areas", label: tr("nav_areas") },
    { to: "/#reviews", label: tr("nav_testimonials") },
    { to: "/blog", label: tr("nav_blog") },
    { to: "/#book", label: tr("nav_book") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-gradient shadow-gold">
            <Scale className="h-5 w-5 text-navy" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-semibold text-navy">Luzuriaga</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Legal Services</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.to} href={l.to} className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${PHONE}`} className="flex items-center gap-1.5 text-sm font-medium text-navy hover:text-accent">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <div className="flex rounded-full border border-border bg-secondary p-0.5 text-xs font-semibold">
            <button onClick={() => setLang("es")} className={`px-2.5 py-1 rounded-full transition ${lang === "es" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}>ES</button>
            <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-full transition ${lang === "en" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}>EN</button>
          </div>
          <Button asChild variant="default" className="bg-navy text-navy-foreground hover:bg-navy/90">
            <a href="/#book">{tr("nav_book")}</a>
          </Button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto flex flex-col px-4 py-4 gap-3">
            {links.map((l) => (
              <a key={l.to} href={l.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
                {l.label}
              </a>
            ))}
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 py-2 text-sm font-medium text-navy">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <div className="flex gap-2">
              <button onClick={() => setLang("es")} className={`flex-1 py-2 rounded-md text-xs font-bold ${lang === "es" ? "bg-navy text-navy-foreground" : "bg-secondary"}`}>Español</button>
              <button onClick={() => setLang("en")} className={`flex-1 py-2 rounded-md text-xs font-bold ${lang === "en" ? "bg-navy text-navy-foreground" : "bg-secondary"}`}>English</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
