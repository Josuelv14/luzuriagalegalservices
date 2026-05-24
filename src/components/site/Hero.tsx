import { Button } from "@/components/ui/button";
import { useLang, PHONE_INTL } from "@/lib/i18n";
import { ShieldCheck, Star, Calendar, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-legal.jpg";

export function Hero() {
  const { tr } = useLang();
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-navy-foreground">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center px-4 py-20 lg:py-28 relative">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1.5 text-xs font-medium text-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> {tr("hero_badge")}
          </div>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] font-semibold">
            {tr("hero_title").split(" in ")[0]}
            <span className="block text-gold-gradient mt-2">{tr("hero_title").includes(" in ") ? "in " + tr("hero_title").split(" in ")[1] : ""}</span>
          </h1>
          <p className="mt-5 text-lg text-navy-foreground/80 max-w-xl">{tr("hero_sub")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-gold-gradient text-navy hover:opacity-90 shadow-gold font-semibold">
              <a href="#book"><Calendar className="mr-2 h-4 w-4" /> {tr("hero_cta_book")}</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gold/50 text-navy-foreground bg-transparent hover:bg-gold hover:text-navy">
              <a href={`https://wa.me/${PHONE_INTL}`} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> {tr("hero_cta_wa")}
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-5 text-sm text-navy-foreground/70">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
            </div>
            <span>{tr("trusted")}</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gold-gradient rounded-2xl blur-2xl opacity-30" />
          <img
            src={heroImg}
            alt="Premium notary and legal services in New York"
            width={1600}
            height={1024}
            className="relative rounded-2xl shadow-elegant border border-white/10 w-full h-auto object-cover"
          />
          <div className="absolute -bottom-5 -left-5 hidden md:flex items-center gap-3 bg-background text-foreground rounded-xl px-4 py-3 shadow-elegant border border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient"><ShieldCheck className="h-5 w-5 text-navy" /></div>
            <div>
              <div className="text-xs text-muted-foreground">USCIS</div>
              <div className="text-sm font-semibold">Certified Translations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
