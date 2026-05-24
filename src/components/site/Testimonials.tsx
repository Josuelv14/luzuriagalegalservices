import { useLang } from "@/lib/i18n";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  { n: "María González", es: "Excelente servicio rápido y profesional. Me apostillaron mis documentos en tiempo récord.", en: "Excellent fast and professional service. They apostilled my documents in record time." },
  { n: "John Rivera", es: "Muy buena ayuda con mis documentos USCIS. Las traducciones fueron aceptadas sin problema.", en: "Great help with my USCIS documents. Translations were accepted without issue." },
  { n: "Ana Castillo", es: "La mejor notaría móvil en New York. Vinieron a mi casa el mismo día.", en: "The best mobile notary in New York. They came to my home the same day." },
];

export function Testimonials() {
  const { lang, tr } = useLang();
  return (
    <section id="testimonials" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{tr("testimonials_kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-navy">{tr("testimonials_title")}</h2>
          <div className="gold-divider mx-auto mt-5" />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="relative rounded-2xl bg-card border border-border p-7 shadow-elegant">
              <Quote className="absolute top-5 right-5 h-8 w-8 text-accent/20" />
              <div className="flex">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="mt-4 text-foreground/90 leading-relaxed">"{r[lang]}"</p>
              <div className="mt-5 flex items-center gap-3 pt-5 border-t border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-navy-foreground font-semibold">{r.n[0]}</div>
                <div>
                  <div className="text-sm font-semibold text-navy">{r.n}</div>
                  <div className="text-xs text-muted-foreground">Google Review</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
