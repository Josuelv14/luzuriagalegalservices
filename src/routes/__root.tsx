import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LangProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-navy-foreground">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md bg-navy px-4 py-2 text-sm font-medium text-navy-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Luzuriaga Legal Services — Notary, Apostille & USCIS Translations NYC" },
      { name: "description", content: "Mobile Notary, Apostille and USCIS Certified Translations in New York. Servicios notariales bilingües para Ecuador y Latinoamérica." },
      { name: "keywords", content: "Mobile Notary NYC, Apostille New York, USCIS Certified Translation, Notario Latino New York, Apostilla Ecuador, Notaría móvil Queens, Power of Attorney NYC, Traducciones USCIS, Notary Public Near Me, Notario latino en New York, Mobile Notary NYC, Apostillas para Ecuador, USCIS translations NYC, Notary services in Queens" },
      { name: "author", content: "Luzuriaga Legal Services" },
      { property: "og:title", content: "Luzuriaga Legal Services — Notary & Apostille NYC" },
      { property: "og:description", content: "Mobile Notary • USCIS Certified Translations • Fast Apostilles in New York." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "Luzuriaga Legal Services",
          image: "https://luzuriagalegal.com/og.jpg",
          telephone: "+1-917-691-0055",
          priceRange: "$$",
          address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
          areaServed: ["Queens", "Bronx", "Brooklyn", "Manhattan", "Yonkers", "Westchester", "Long Island"],
          serviceType: ["Mobile Notary", "Apostille", "USCIS Certified Translation", "Power of Attorney"],
          openingHours: "Mo-Sa 08:00-20:00",
          employee: [
            {
              "@type": "Person",
              name: "Jannet Luzuriaga",
              jobTitle: "Founder & Notary Public",
              description: "Certified Notary Public with 10+ years experience in mobile notary, apostille and USCIS translation services for the Latino community in New York.",
              knowsLanguage: ["Spanish", "English"],
            },
            {
              "@type": "Person",
              name: "Carlos Luzuriaga",
              jobTitle: "Legal Assistant & Client Coordinator",
              description: "Legal assistant with 5+ years experience in document management, client coordination and bilingual customer service.",
              knowsLanguage: ["Spanish", "English"],
            },
          ],
          knowsAbout: ["Mobile Notary", "Apostille Services", "USCIS Certified Translation", "Power of Attorney", "Ecuador Legal Documents", "Immigration Document Preparation"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <Outlet />
      </LangProvider>
    </QueryClientProvider>
  );
}
