import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useLang, PHONE_INTL } from "@/lib/i18n";
import { SERVICES } from "./Services";
import { MessageCircle, CalendarCheck } from "lucide-react";

export function BookingForm() {
  const { lang, tr } = useLang();
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [deviceTime, setDeviceTime] = useState(() => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id) setService(id);
    };
    window.addEventListener("preselect-service", handler);
    return () => window.removeEventListener("preselect-service", handler);
  }, []);

  // keep deviceTime updated (every minute) and prefill the time input once
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setDeviceTime(`${hh}:${mm}`);
    };
    // set initial time input to device time if empty
    if (!time) setTime(deviceTime);
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const svc = SERVICES.find(s => s.id === service);
    const svcLabel = svc ? svc[lang].t : service;
    const msg = lang === "es"
      ? `Hola, mi nombre es ${name}. Quiero solicitar el servicio de ${svcLabel} para el día ${date} a las ${time}. Dirección: ${address}. Detalles: ${details}. Teléfono: ${phone}.`
      : `Hello, my name is ${name}. I would like to request ${svcLabel} on ${date} at ${time}. Address: ${address}. Details: ${details}. Phone: ${phone}.`;
    window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="book" className="py-20 lg:py-28 bg-hero-gradient text-navy-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="container mx-auto px-4 grid lg:grid-cols-5 gap-10 relative">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{tr("book_kicker")}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">{tr("book_title")}</h2>
          <div className="gold-divider mt-5" />
          <p className="mt-5 text-navy-foreground/80 max-w-md">{tr("book_sub")}</p>
          <div className="mt-8 flex items-center gap-3 text-sm text-navy-foreground/80">
            <CalendarCheck className="h-5 w-5 text-gold" /> Mon – Sat: 8AM – 8PM
          </div>
        </div>

        <form onSubmit={submit} className="lg:col-span-3 bg-background text-foreground rounded-2xl p-7 lg:p-9 shadow-elegant grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block">{tr("field_service")}</Label>
            <Select value={service} onValueChange={setService} required>
              <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
              <SelectContent>
                {SERVICES.map(s => <SelectItem key={s.id} value={s.id}>{s[lang].t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block">{tr("field_date")}</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <Label className="mb-1.5 block">{tr("field_time")}</Label>
            <div className="flex items-center gap-2">
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              <div className="text-xs text-muted-foreground">
                <div>Tu zona horaria: <span className="font-medium">{deviceTime}</span></div>
                <button type="button" onClick={() => setTime(deviceTime)} className="text-[11px] text-accent hover:underline">Usar ahora</button>
              </div>
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block">{tr("field_name")}</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
          </div>
          <div>
            <Label className="mb-1.5 block">{tr("field_phone")}</Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} required />
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block">{tr("field_address")}</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} maxLength={200} required />
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block">{tr("field_details")}</Label>
            <Textarea value={details} onChange={(e) => setDetails(e.target.value)} maxLength={500} rows={4} required />
          </div>
          <Button type="submit" size="lg" className="sm:col-span-2 bg-[#25D366] hover:bg-[#1fb958] text-white font-semibold">
            <MessageCircle className="mr-2 h-5 w-5" /> {tr("send_wa")}
          </Button>
        </form>
      </div>
    </section>
  );
}
