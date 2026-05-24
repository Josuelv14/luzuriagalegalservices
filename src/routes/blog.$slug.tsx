import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { POSTS } from "@/components/site/BlogPreview";
import { useLang } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.es.t} — Luzuriaga Legal Services` },
          { name: "description", content: loaderData.post.es.d },
          { property: "og:title", content: loaderData.post.es.t },
          { property: "og:description", content: loaderData.post.es.d },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  errorComponent: ({ error }) => <div className="container mx-auto px-4 py-20">{error.message}</div>,
  notFoundComponent: () => <div className="container mx-auto px-4 py-20">Post not found.</div>,
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const { lang } = useLang();
  const c = post[lang];
  return (
    <article className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-accent font-semibold mb-6">
          <ArrowLeft className="h-4 w-4" /> Blog
        </Link>
        <h1 className="text-4xl lg:text-5xl text-navy">{c.t}</h1>
        <div className="gold-divider mt-5" />
        <p className="mt-6 text-lg text-muted-foreground">{c.d}</p>
        <div className="prose prose-lg mt-8 max-w-none text-foreground/90 leading-relaxed space-y-4">
          <p>
            {lang === "es"
              ? "En Luzuriaga Legal Services ayudamos a cientos de familias cada mes con trámites notariales, apostillas y traducciones certificadas. Esta guía cubre los pasos esenciales y los requisitos comunes."
              : "At Luzuriaga Legal Services we help hundreds of families each month with notary, apostille and certified translation services. This guide covers the essential steps and common requirements."}
          </p>
          <p>
            {lang === "es"
              ? "Si tienes dudas o quieres asesoría personalizada, agenda tu cita y un especialista bilingüe te atenderá."
              : "If you have questions or want personalized advice, schedule an appointment and a bilingual specialist will assist you."}
          </p>
        </div>
        <Link to="/" hash="book" className="mt-10 inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground">
          {lang === "es" ? "Agendar mi trámite" : "Book my service"}
        </Link>
      </div>
    </article>
  );
}
