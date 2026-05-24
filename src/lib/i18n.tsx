import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, { es: string; en: string }>;

export const t: Dict = {
  nav_services: { es: "Servicios", en: "Services" },
  nav_areas: { es: "Áreas", en: "Areas" },
  nav_testimonials: { es: "Testimonios", en: "Testimonials" },
  nav_blog: { es: "Blog", en: "Blog" },
  nav_book: { es: "Agendar", en: "Book" },
  nav_contact: { es: "Contacto", en: "Contact" },

  hero_title: { es: "Notaría, Apostillas y Traducciones en New York", en: "Notary, Apostille & Translation Services in New York" },
  hero_sub: { es: "Notaría móvil • Traducciones certificadas USCIS • Apostillas rápidas", en: "Mobile Notary • USCIS Certified Translations • Fast Apostilles" },
  hero_cta_book: { es: "Agendar Servicio", en: "Book Service" },
  hero_cta_wa: { es: "WhatsApp Directo", en: "WhatsApp Now" },
  hero_badge: { es: "Servicio bilingüe • Español / English", en: "Bilingual service • Español / English" },

  services_kicker: { es: "Nuestros Servicios", en: "Our Services" },
  services_title: { es: "Soluciones legales completas y confiables", en: "Complete and trusted legal solutions" },
  services_sub: { es: "Trámites notariales, apostillas y traducciones certificadas con atención personalizada en todo New York.", en: "Notary, apostille and certified translation services with personalized attention across New York." },
  request: { es: "Solicitar", en: "Request" },

  areas_kicker: { es: "Cobertura", en: "Coverage" },
  areas_title: { es: "Áreas donde trabajamos", en: "Service Areas" },
  areas_sub: { es: "Servicio móvil disponible en los cinco condados de New York y zonas cercanas.", en: "Mobile service available across the five boroughs and surrounding areas." },

  testimonials_kicker: { es: "Testimonios", en: "Testimonials" },
  testimonials_title: { es: "Lo que dicen nuestros clientes", en: "What our clients say" },

  book_kicker: { es: "Agendamiento", en: "Booking" },
  book_title: { es: "Agenda tu trámite en minutos", en: "Schedule your service in minutes" },
  book_sub: { es: "Sin registro. Completa el formulario y te conectamos por WhatsApp.", en: "No sign-up required. Fill the form and we'll connect via WhatsApp." },
  field_service: { es: "Servicio", en: "Service" },
  field_date: { es: "Fecha", en: "Date" },
  field_time: { es: "Hora", en: "Time" },
  field_name: { es: "Nombre completo", en: "Full name" },
  field_phone: { es: "Teléfono", en: "Phone" },
  field_address: { es: "Dirección", en: "Address" },
  field_details: { es: "Descripción del trámite", en: "Service details" },
  send_wa: { es: "Enviar por WhatsApp", en: "Send via WhatsApp" },

  blog_kicker: { es: "Blog", en: "Blog" },
  blog_title: { es: "Guías y recursos legales", en: "Legal guides & resources" },
  read_more: { es: "Leer más", en: "Read more" },

  contact_call: { es: "Llamar Ahora", en: "Call Now" },
  hours: { es: "Lun – Sáb: 8:00 AM – 8:00 PM", en: "Mon – Sat: 8:00 AM – 8:00 PM" },
  rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
  tagline: { es: "Servicios legales premium en New York para Ecuador y Latinoamérica.", en: "Premium legal services in New York for Ecuador and Latin America." },

  trusted: { es: "Más de 1,000 trámites completados", en: "Over 1,000 completed cases" },

  team_kicker: { es: "Nuestro Equipo", en: "Our Team" },
  team_title: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
  team_sub: { es: "En Luzuriaga Legal Services creemos en la confianza, profesionalismo y atención personalizada. Nuestro equipo está comprometido en ayudar a la comunidad latina con servicios legales y notariales de alta calidad.", en: "At Luzuriaga Legal Services we believe in trust, professionalism and personalized attention. Our team is committed to helping the Latino community with high-quality legal and notary services." },
  team_experience: { es: "Experiencia", en: "Experience" },
  team_specialties: { es: "Especialidades", en: "Specialties" },
  team_languages: { es: "Idiomas", en: "Languages" },
  team_bio: { es: "Sobre", en: "About" },
  team_story_kicker: { es: "Nuestra Historia", en: "Our Story" },
  team_story_title: { es: "Compromiso con la Comunidad", en: "Commitment to the Community" },
  team_story_text: { es: "Luzuriaga Legal Services nació del compromiso genuino de servir a la comunidad ecuatoriana y latina en New York. Entendemos los desafíos de navegar trámites legales en un país extranjero, y por eso ofrecemos servicios bilingües con calidez humana y profesionalismo de clase mundial. Desde nuestras primeras apostillas hasta haber procesado miles de documentos, nuestra misión sigue intacta: hacer que cada trámite sea simple, rápido y confiable.", en: "Luzuriaga Legal Services was born from a genuine commitment to serve the Ecuadorian and Latino community in New York. We understand the challenges of navigating legal procedures in a foreign country, which is why we offer bilingual services with human warmth and world-class professionalism. From our first apostilles to having processed thousands of documents, our mission remains: to make every procedure simple, fast and reliable." },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; tr: (k: keyof typeof t) => string }>({
  lang: "es", setLang: () => {}, tr: (k) => t[k]?.es ?? String(k),
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (stored === "es" || stored === "en") setLangState(stored);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  const tr = (k: keyof typeof t) => t[k]?.[lang] ?? String(k);
  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export const PHONE = "917-691-0055";
export const PHONE_INTL = "19176910055";
