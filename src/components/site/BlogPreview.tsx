import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

export const POSTS = [
  { slug: "apostillar-documentos-ecuador", es: { t: "Cómo apostillar documentos para Ecuador", d: "Guía paso a paso para apostillar tus documentos en New York." }, en: { t: "How to apostille documents for Ecuador", d: "Step-by-step guide to apostille your documents in New York." } },
  { slug: "traducir-documentos-uscis", es: { t: "Cómo traducir documentos para USCIS", d: "Requisitos de traducción certificada para inmigración." }, en: { t: "How to translate documents for USCIS", d: "Certified translation requirements for immigration." } },
  { slug: "notario-publico-new-york", es: { t: "Qué hace un notario público en New York", d: "Funciones, límites y cuándo necesitas uno." }, en: { t: "What a Notary Public does in New York", d: "Duties, limits and when you need one." } },
];

export function BlogPreview() {
  const { lang, tr } = useLang();
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{tr("blog_kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-navy">{tr("blog_title")}</h2>
          <div className="gold-divider mx-auto mt-5" />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-2xl bg-card border border-border p-7 hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="text-xs uppercase tracking-wider text-accent font-semibold">Guía</div>
              <h3 className="mt-3 text-xl font-semibold text-navy leading-snug">{p[lang].t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p[lang].d}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                {tr("read_more")} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
