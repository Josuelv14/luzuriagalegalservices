import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingCTA } from "@/components/site/FloatingCTA";
import { POSTS } from "@/components/site/BlogPreview";
import { useLang } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Luzuriaga Legal Services" },
      { name: "description", content: "Guías sobre apostillas, traducciones USCIS, poderes y notaría en New York." },
      { property: "og:title", content: "Blog — Luzuriaga Legal Services" },
      { property: "og:description", content: "Recursos legales bilingües para Ecuador y Latinoamérica." },
    ],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/blog/$slug");
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{isChild ? <Outlet /> : <BlogIndex />}</main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

function BlogIndex() {
  const { lang, tr } = useLang();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{tr("blog_kicker")}</p>
          <h1 className="mt-3 text-4xl lg:text-5xl text-navy">{tr("blog_title")}</h1>
          <div className="gold-divider mt-5" />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-2xl bg-card border border-border p-7 hover:shadow-elegant hover:-translate-y-1 transition-all">
              <h2 className="text-xl font-semibold text-navy leading-snug">{p[lang].t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{p[lang].d}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                {tr("read_more")} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
