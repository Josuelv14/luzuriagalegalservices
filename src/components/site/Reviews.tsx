import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { Star, ThumbsUp, BadgeCheck, Camera, Plus, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

type Badge = "verified" | "notary" | "apostille" | "uscis";

type Review = {
  id: string;
  name: string;
  city: string;
  date: string; // ISO
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  photo?: string; // dataURL or initial
  badge?: Badge;
  baseLikes: number;
};

const SEED: Review[] = [
  { id: "r1", name: "María González", city: "Queens, NY", date: "2025-09-12", rating: 5, comment: "Excelente servicio rápido y profesional para mi apostilla. Todo llegó a Ecuador sin problema.", badge: "apostille", baseLikes: 100 },
  { id: "r2", name: "John Rivera", city: "Bronx, NY", date: "2025-08-28", rating: 5, comment: "Las traducciones para USCIS fueron aceptadas sin observaciones. Muy recomendados.", badge: "uscis", baseLikes: 120 },
  { id: "r3", name: "Ana Castillo", city: "Yonkers, NY", date: "2025-10-05", rating: 5, comment: "La mejor notaría móvil en New York. Vinieron a mi casa el mismo día y muy puntuales.", badge: "notary", baseLikes: 95 },
  { id: "r4", name: "Carlos Mendoza", city: "Brooklyn, NY", date: "2025-07-18", rating: 5, comment: "Me ayudaron con un Power of Attorney para Ecuador. Proceso claro y precio justo.", badge: "verified", baseLikes: 64 },
  { id: "r5", name: "Lucía Pérez", city: "Manhattan, NY", date: "2025-06-22", rating: 4, comment: "Muy buena atención bilingüe. Resolvieron todas mis dudas sobre la apostilla.", badge: "apostille", baseLikes: 41 },
];

const STORAGE_REVIEWS = "lls_reviews_v1";
const STORAGE_LIKES = "lls_likes_v1";
const STORAGE_LIKED = "lls_liked_v1";

const BADGE_LABEL: Record<Badge, { es: string; en: string }> = {
  verified: { es: "Cliente Verificado", en: "Verified Client" },
  notary: { es: "Cliente Notaría Móvil", en: "Mobile Notary Customer" },
  apostille: { es: "Cliente Apostilla", en: "Apostille Service Client" },
  uscis: { es: "Cliente Traducción USCIS", en: "USCIS Translation Client" },
};

type SortKey = "helpful" | "recent" | "rating";

export function Reviews() {
  const { lang } = useLang();
  const T = useMemo(() => ({
    kicker: lang === "es" ? "Reseñas Reales" : "Real Reviews",
    title: lang === "es" ? "Reseñas de Clientes" : "Client Reviews",
    sub: lang === "es" ? "Lo que dicen nuestros clientes en New York. Califica y comparte tu experiencia." : "What our New York clients say. Rate and share your own experience.",
    avg: lang === "es" ? "Calificación promedio" : "Average rating",
    happy: lang === "es" ? "Clientes satisfechos" : "Happy clients",
    docs: lang === "es" ? "Documentos procesados" : "Documents processed",
    helpful: lang === "es" ? "Más útiles" : "Most helpful",
    recent: lang === "es" ? "Más recientes" : "Most recent",
    rating: lang === "es" ? "Mejor calificadas" : "Top rated",
    helpfulQ: lang === "es" ? "¿Te ayudó esta reseña?" : "Was this review helpful?",
    peopleFound: lang === "es" ? "personas encontraron útil esta reseña" : "people found this review helpful",
    add: lang === "es" ? "Agregar Reseña" : "Add Review",
    name: lang === "es" ? "Tu nombre" : "Your name",
    city: lang === "es" ? "Ciudad" : "City",
    comment: lang === "es" ? "Tu reseña" : "Your review",
    photo: lang === "es" ? "Foto opcional" : "Optional photo",
    submit: lang === "es" ? "Publicar reseña" : "Publish review",
    cancel: lang === "es" ? "Cancelar" : "Cancel",
    yourRating: lang === "es" ? "Tu calificación" : "Your rating",
    thanks: lang === "es" ? "¡Gracias por tu reseña!" : "Thanks for your review!",
    filter: lang === "es" ? "Ordenar por" : "Sort by",
  }), [lang]);

  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [sort, setSort] = useState<SortKey>("helpful");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const r = localStorage.getItem(STORAGE_REVIEWS);
      if (r) setUserReviews(JSON.parse(r));
      const l = localStorage.getItem(STORAGE_LIKES);
      if (l) setLikes(JSON.parse(l));
      const ld = localStorage.getItem(STORAGE_LIKED);
      if (ld) setLiked(JSON.parse(ld));
    } catch {}
  }, []);

  const all = useMemo(() => [...SEED, ...userReviews], [userReviews]);

  const getLikes = (r: Review) => r.baseLikes + (likes[r.id] ?? 0);

  const sorted = useMemo(() => {
    const arr = [...all];
    if (sort === "helpful") arr.sort((a, b) => getLikes(b) - getLikes(a));
    if (sort === "recent") arr.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating || getLikes(b) - getLikes(a));
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all, sort, likes]);

  const avg = useMemo(() => (all.reduce((s, r) => s + r.rating, 0) / all.length).toFixed(1), [all]);

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_LIKED, JSON.stringify(next));
      return next;
    });
    setLikes((prev) => {
      const delta = liked[id] ? -1 : 1;
      const next = { ...prev, [id]: (prev[id] ?? 0) + delta };
      localStorage.setItem(STORAGE_LIKES, JSON.stringify(next));
      return next;
    });
  };

  const addReview = (r: Review) => {
    const next = [r, ...userReviews];
    setUserReviews(next);
    localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(next));
  };

  // SEO schema
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Luzuriaga Legal Services",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg,
      reviewCount: all.length + 500,
      bestRating: "5",
    },
    review: SEED.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.comment,
    })),
  }), [avg, all.length]);

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-secondary/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{T.kicker}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-navy">{T.title}</h2>
          <div className="gold-divider mx-auto mt-5" />
          <p className="mt-5 text-muted-foreground">{T.sub}</p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <StatCard value={`${avg}/5`} label={T.avg} icon={<Star className="h-5 w-5 fill-accent text-accent" />} />
          <StatCard value="+500" label={T.happy} icon={<ThumbsUp className="h-5 w-5 text-accent" />} />
          <StatCard value="+2,000" label={T.docs} icon={<BadgeCheck className="h-5 w-5 text-accent" />} />
        </div>

        {/* Filters + Add - TEMPORARILY DISABLED FOR STATIC REVIEWS */}
        {/* Commented out until backend is ready */}

        {/* Reviews grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {sorted.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              likes={getLikes(r)}
              liked={!!liked[r.id]}
              onLike={() => toggleLike(r.id)}
              lang={lang}
              labelHelpfulQ={T.helpfulQ}
              labelPeople={T.peopleFound}
            />
          ))}
        </div>
      </div>

      {/* Add Review Modal disabled temporarily */}
      {/* 
      {open && (
        <AddReviewModal
          T={T}
          onClose={() => setOpen(false)}
          onSubmit={(r) => {
            addReview(r);
            setOpen(false);
            setSort("recent");
          }}
        />
      )}
      */}
    </section>
  );
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 flex items-center gap-4 shadow-elegant">
      <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center">{icon}</div>
      <div>
        <div className="text-2xl font-display font-semibold text-navy leading-none">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}

function ReviewCard({
  review, likes, liked, onLike, lang, labelHelpfulQ, labelPeople,
}: {
  review: Review; likes: number; liked: boolean; onLike: () => void; lang: "es" | "en"; labelHelpfulQ: string; labelPeople: string;
}) {
  const date = new Date(review.date).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { year: "numeric", month: "short", day: "numeric" });
  return (
    <article className="group relative rounded-2xl bg-card border border-border p-6 shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-gold hover:border-accent/40 flex flex-col">
      <header className="flex items-center gap-3">
        {review.photo ? (
          <img src={review.photo} alt={review.name} className="h-12 w-12 rounded-full object-cover border-2 border-accent/30" />
        ) : (
          <div className="h-12 w-12 rounded-full bg-navy text-navy-foreground flex items-center justify-center font-semibold text-lg">
            {review.name[0]}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-navy truncate">{review.name}</div>
          <div className="text-xs text-muted-foreground">{review.city} · {date}</div>
        </div>
      </header>

      <div className="mt-3 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
        ))}
      </div>

      {review.badge && (
        <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-accent/10 text-accent px-2.5 py-1 text-[11px] font-medium">
          <BadgeCheck className="h-3 w-3" /> {BADGE_LABEL[review.badge][lang]}
        </div>
      )}

      <p className="mt-4 text-sm text-foreground/90 leading-relaxed flex-1">"{review.comment}"</p>

      {/* Likes system disabled temporarily */}
      {/* 
      <footer className="mt-5 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground mb-2">{labelHelpfulQ}</div>
        <button
          onClick={onLike}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
            liked
              ? "bg-accent text-accent-foreground border-accent shadow-gold"
              : "bg-card border-border text-foreground hover:border-accent hover:text-accent"
          }`}
        >
          <ThumbsUp className={`h-4 w-4 transition-transform ${liked ? "scale-110" : ""}`} />
          <span className="tabular-nums">{likes}</span>
          <span className="hidden sm:inline text-xs opacity-80">· {labelPeople}</span>
        </button>
      </footer>
      */}
    </article>
  );
}

function AddReviewModal({
  T, onClose, onSubmit,
}: {
  T: Record<string, string>; onClose: () => void; onSubmit: (r: Review) => void;
}) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [photo, setPhoto] = useState<string | undefined>();

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim().slice(0, 60);
    const c = city.trim().slice(0, 60);
    const m = comment.trim().slice(0, 500);
    if (!n || !c || !m) return;
    onSubmit({
      id: `u_${Date.now()}`,
      name: n,
      city: c,
      comment: m,
      rating,
      date: new Date().toISOString(),
      photo,
      badge: "verified",
      baseLikes: 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="w-full max-w-lg bg-card rounded-2xl shadow-elegant border border-border p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl text-navy">{T.add}</h3>
          <button type="button" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="gold-divider mt-3" />

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">{T.yourRating}</label>
            <div className="mt-1 flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} type="button" onClick={() => setRating(i as 1 | 2 | 3 | 4 | 5)}>
                  <Star className={`h-7 w-7 transition-colors ${i <= rating ? "fill-accent text-accent" : "text-muted-foreground/40"}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label={T.name}>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required className="input-base" />
            </Field>
            <Field label={T.city}>
              <input value={city} onChange={(e) => setCity(e.target.value)} maxLength={60} required placeholder="Queens, NY" className="input-base" />
            </Field>
          </div>

          <Field label={T.comment}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={500} rows={4} required className="input-base resize-none" />
            <div className="text-[11px] text-muted-foreground mt-1 text-right">{comment.length}/500</div>
          </Field>

          <div>
            <label className="text-xs font-medium text-muted-foreground">{T.photo}</label>
            <label className="mt-1 flex items-center gap-3 cursor-pointer rounded-lg border border-dashed border-border p-3 hover:border-accent transition">
              {photo ? (
                <img src={photo} alt="preview" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center"><Camera className="h-5 w-5 text-muted-foreground" /></div>
              )}
              <span className="text-sm text-muted-foreground">{photo ? "✓" : T.photo}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>{T.cancel}</Button>
          <Button type="submit" className="bg-navy text-navy-foreground hover:bg-navy/90">{T.submit}</Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
