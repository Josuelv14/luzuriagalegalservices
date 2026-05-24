import { useLang } from "@/lib/i18n";
import { Car, Stamp, Languages, FileCheck2, Scale, FileSignature, Plane, Mail, ScrollText, Home, ArrowRight } from "lucide-react";

export const SERVICES = [
  { id: "mobile-notary", icon: Car, es: { t: "Notaría Móvil", d: "Vamos a tu casa, oficina u hospital en todo NY." }, en: { t: "Mobile Notary", d: "We come to your home, office or hospital across NY." } },
  { id: "apostille", icon: Stamp, es: { t: "Apostillas Rápidas", d: "Apostilla para Ecuador y países del Convenio." }, en: { t: "Apostille Services", d: "Apostille for Ecuador and Hague Convention countries." } },
  { id: "uscis", icon: Languages, es: { t: "Traducciones USCIS", d: "Traducciones certificadas inglés/español." }, en: { t: "USCIS Translations", d: "Certified English/Spanish translations." } },
  { id: "legalizations", icon: FileCheck2, es: { t: "Legalizaciones", d: "Documentos legalizados ante consulados." }, en: { t: "Legalizations", d: "Documents legalized before consulates." } },
  { id: "poa", icon: Scale, es: { t: "Poderes / Power of Attorney", d: "Generales y especiales para Ecuador y USA." }, en: { t: "Power of Attorney", d: "General & special for Ecuador and USA." } },
  { id: "affidavits", icon: FileSignature, es: { t: "Affidavits", d: "Declaraciones juradas certificadas." }, en: { t: "Affidavits", d: "Certified sworn statements." } },
  { id: "travel-consent", icon: Plane, es: { t: "Cartas de Consentimiento", d: "Permisos de viaje para menores." }, en: { t: "Travel Consent Letters", d: "Travel permits for minors." } },
  { id: "invitation", icon: Mail, es: { t: "Cartas de Invitación", d: "Para visa, turismo y trámites consulares." }, en: { t: "Invitation Letters", d: "For visa, tourism and consular needs." } },
  { id: "wills", icon: ScrollText, es: { t: "Testamentos", d: "Asesoría y notarización de testamentos." }, en: { t: "Wills / Testaments", d: "Will preparation and notarization." } },
  { id: "mobile-home", icon: Home, es: { t: "Servicio a Domicilio", d: "Atención completa donde tú estés." }, en: { t: "Mobile Home Service", d: "Full service wherever you are." } },
];

export function Services() {
  const { lang, tr } = useLang();
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{tr("services_kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-navy">{tr("services_title")}</h2>
          <div className="gold-divider mx-auto mt-5" />
          <p className="mt-5 text-muted-foreground">{tr("services_sub")}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ id, icon: Icon, ...s }) => {
            const c = s[lang];
            return (
              <a
                key={id}
                href={`#book?s=${id}`}
                onClick={(e) => { e.preventDefault(); const el = document.getElementById("book"); el?.scrollIntoView({ behavior: "smooth" }); window.dispatchEvent(new CustomEvent("preselect-service", { detail: id })); }}
                className="group relative rounded-2xl border border-border bg-card p-7 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient shadow-gold">
                  <Icon className="h-6 w-6 text-navy" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                  {tr("request")} <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
