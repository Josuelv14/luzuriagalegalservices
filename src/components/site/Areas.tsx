import { useLang } from "@/lib/i18n";
import { MapPin } from "lucide-react";

const AREAS = ["Queens", "Yonkers", "Bronx", "Manhattan", "Brooklyn", "Westchester", "Long Island"];

export function Areas() {
  const { tr } = useLang();
  return (
    <section id="areas" className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{tr("areas_kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-navy">{tr("areas_title")}</h2>
          <div className="gold-divider mt-5" />
          <p className="mt-5 text-muted-foreground max-w-lg">{tr("areas_sub")}</p>
          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {AREAS.map((a) => (
              <li key={a} className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-3 text-sm font-medium text-navy">
                <MapPin className="h-4 w-4 text-accent" /> {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-elegant border border-border h-[420px]">
          <iframe
            title="Service area map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193595.25280022654!2d-74.11808606639049!3d40.70582548783556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
