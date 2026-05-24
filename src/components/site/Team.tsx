import { useMemo } from "react";
import { useLang } from "@/lib/i18n";
import { BadgeCheck, Award, Languages, Star, Briefcase, ShieldCheck } from "lucide-react";
import teamJannet from "@/assets/team-janntl.png";
import teamAssistant from "@/assets/team-carlos.png";

type TeamMember = {
  id: string;
  name: string;
  role: { es: string; en: string };
  experience: { es: string; en: string };
  specialties: { es: string[]; en: string[] };
  bio: { es: string; en: string };
  languages: string;
  photo: string;
  badges: { type: "verified" | "experience" | "certified"; label: { es: string; en: string } }[];
};

const TEAM: TeamMember[] = [
  {
    id: "tm1",
    name: "Jannet Luzuriaga",
    role: { es: "Fundadora & Notary Public", en: "Founder & Notary Public" },
    experience: { es: "10+ años", en: "10+ years" },
    specialties: {
      es: ["Apostillas", "Traducciones USCIS", "Poderes para Ecuador", "Servicios notariales móviles"],
      en: ["Apostilles", "USCIS Translations", "Powers of Attorney for Ecuador", "Mobile Notary Services"],
    },
    bio: {
      es: "Comprometida en brindar servicios legales y notariales confiables para la comunidad latina en New York. Con más de una década de experiencia, Jannet ha ayudado a cientos de familias con sus trámites más importantes.",
      en: "Committed to providing reliable legal and notary services for the Latino community in New York. With over a decade of experience, Jannet has helped hundreds of families with their most important procedures.",
    },
    languages: "Español / English",
    photo: teamJannet,
    badges: [
      { type: "verified", label: { es: "Notary Public Certificado", en: "Certified Notary Public" } },
      { type: "experience", label: { es: "10+ años de experiencia", en: "10+ years experience" } },
    ],
  },
  {
    id: "tm2",
    name: "Carlos Luzuriaga",
    role: { es: "Asistente Legal & Coordinador de Clientes", en: "Legal Assistant & Client Coordinator" },
    experience: { es: "5+ años", en: "5+ years" },
    specialties: {
      es: ["Gestión de documentos", "Atención al cliente", "Coordinación de citas", "Seguimiento de casos"],
      en: ["Document management", "Customer service", "Appointment scheduling", "Case follow-up"],
    },
    bio: {
      es: "Especialista en atención personalizada y coordinación logística de servicios notariales a domicilio. Garantiza que cada cliente reciba un servicio puntual, profesional y adaptado a sus necesidades.",
      en: "Specialist in personalized attention and logistical coordination of mobile notary services. Ensures every client receives punctual, professional service tailored to their needs.",
    },
    languages: "Español / English",
    photo: teamAssistant,
    badges: [
      { type: "certified", label: { es: "Asistente Legal", en: "Legal Assistant" } },
      { type: "experience", label: { es: "5+ años de experiencia", en: "5+ years experience" } },
    ],
  },
];

export function Team() {
  const { lang } = useLang();

  const T = useMemo(
    () => ({
      kicker: lang === "es" ? "Nuestro Equipo" : "Our Team",
      title: lang === "es" ? "Conoce a Nuestro Equipo" : "Meet Our Team",
      sub:
        lang === "es"
          ? "En Luzuriaga Legal Services creemos en la confianza, profesionalismo y atención personalizada. Nuestro equipo está comprometido en ayudar a la comunidad latina con servicios legales y notariales de alta calidad."
          : "At Luzuriaga Legal Services we believe in trust, professionalism and personalized attention. Our team is committed to helping the Latino community with high-quality legal and notary services.",
      experience: lang === "es" ? "Experiencia" : "Experience",
      specialties: lang === "es" ? "Especialidades" : "Specialties",
      languages: lang === "es" ? "Idiomas" : "Languages",
      bio: lang === "es" ? "Sobre" : "About",
      storyKicker: lang === "es" ? "Nuestra Historia" : "Our Story",
      storyTitle: lang === "es" ? "Compromiso con la Comunidad" : "Commitment to the Community",
      storyText:
        lang === "es"
          ? "Luzuriaga Legal Services nació del compromiso genuino de servir a la comunidad ecuatoriana y latina en New York. Entendemos los desafíos de navegar trámites legales en un país extranjero, y por eso ofrecemos servicios bilingües con calidez humana y profesionalismo de clase mundial. Desde nuestras primeras apostillas hasta haber procesado miles de documentos, nuestra misión sigue intacta: hacer que cada trámite sea simple, rápido y confiable."
          : "Luzuriaga Legal Services was born from a genuine commitment to serve the Ecuadorian and Latino community in New York. We understand the challenges of navigating legal procedures in a foreign country, which is why we offer bilingual services with human warmth and world-class professionalism. From our first apostilles to having processed thousands of documents, our mission remains: to make every procedure simple, fast and reliable.",
    }),
    [lang],
  );

  return (
    <section id="team" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{T.kicker}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-navy">{T.title}</h2>
          <div className="gold-divider mx-auto mt-5" />
          <p className="mt-5 text-muted-foreground leading-relaxed">{T.sub}</p>
        </div>

        {/* Team Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {TEAM.map((member) => (
            <TeamCard key={member.id} member={member} lang={lang} T={T} />
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="rounded-3xl bg-navy p-8 sm:p-12 lg:p-14 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{T.storyKicker}</p>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-navy-foreground">{T.storyTitle}</h3>
              <div className="gold-divider mt-5" style={{ background: "var(--gradient-gold)" }} />
              <p className="mt-6 text-navy-foreground/80 leading-relaxed text-[15px]">{T.storyText}</p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                <TrustBadge icon={<BadgeCheck className="h-4 w-4" />} label={lang === "es" ? "Notario Certificado NY" : "NY Certified Notary"} />
                <TrustBadge icon={<Award className="h-4 w-4" />} label={lang === "es" ? "Servicio Bilingüe" : "Bilingual Service"} />
                <TrustBadge icon={<Star className="h-4 w-4" />} label={lang === "es" ? "4.9/5 Calificación" : "4.9/5 Rating"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, lang, T }: { member: TeamMember; lang: "es" | "en"; T: Record<string, string> }) {
  return (
    <article className="group relative rounded-3xl bg-card border border-border overflow-hidden shadow-elegant transition-all duration-500 hover:-translate-y-2 hover:shadow-gold hover:border-accent/30">
      {/* Photo area */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          width={1024}
          height={1024}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

        {/* Floating badges on photo */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {member.badges.map((badge) => (
            <span
              key={badge.type}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold backdrop-blur-md ${
                badge.type === "verified"
                  ? "bg-emerald-500/90 text-white"
                  : badge.type === "certified"
                    ? "bg-blue-500/90 text-white"
                    : "bg-accent/90 text-gold-foreground"
              }`}
            >
              {badge.type === "verified" && <BadgeCheck className="h-3 w-3" />}
              {badge.type === "certified" && <ShieldCheck className="h-3 w-3" />}
              {badge.type === "experience" && <Briefcase className="h-3 w-3" />}
              {badge.label[lang]}
            </span>
          ))}
        </div>

        {/* Name overlay at bottom of photo */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-display font-semibold text-navy-foreground">{member.name}</h3>
          <p className="text-sm text-accent mt-1 font-medium">{member.role[lang]}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 space-y-5">
        {/* Experience & Languages row */}
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-navy/5 px-3 py-1.5 text-xs font-medium text-navy">
            <Briefcase className="h-3.5 w-3.5 text-accent" />
            {member.experience[lang]}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-navy/5 px-3 py-1.5 text-xs font-medium text-navy">
            <Languages className="h-3.5 w-3.5 text-accent" />
            {member.languages}
          </span>
        </div>

        {/* Bio */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{T.bio}</p>
          <p className="text-sm text-foreground/85 leading-relaxed">{member.bio[lang]}</p>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{T.specialties}</p>
          <div className="flex flex-wrap gap-2">
            {member.specialties[lang].map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[11px] font-medium text-accent"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-medium text-accent">
      {icon}
      {label}
    </span>
  );
}
