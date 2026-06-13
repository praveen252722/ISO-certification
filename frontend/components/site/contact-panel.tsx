import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactItems = [
  {
    label: "Phone",
    value: "+91 73861 81914 / +91 70950 81914",
    href: "tel:+917386181914",
    icon: Phone,
    accent: "text-teal-700 bg-teal-50"
  },
  {
    label: "Email",
    value: "vjinternationalcertifications@example.com",
    href: "mailto:vjinternationalcertifications@example.com",
    icon: Mail,
    accent: "text-amber-600 bg-amber-50"
  },
  {
    label: "Location",
    value: "Shamshiguda, Kukatpally, Hyderabad 500072",
    href: "https://maps.app.goo.gl/Bt4KS8WU1Szv6M2NA",
    icon: MapPin,
    accent: "text-rose-600 bg-rose-50"
  },
  {
    label: "Instagram",
    value: "VJ International Certifications",
    href: "https://www.instagram.com/",
    icon: Instagram,
    accent: "text-fuchsia-600 bg-fuchsia-50"
  }
];

export function ContactPanel() {
  return (
    <Card className="overflow-hidden border-0 bg-slate-950 text-white shadow-2xl">
      <div className="relative p-6">
        <div className="absolute inset-0 gold-radial opacity-80" />
        <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-amber-300/30 blur-2xl animate-glow-pulse" />
        <div className="relative">
          <p className="text-sm font-bold uppercase text-amber-200">Contact VJ International Certifications</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-normal">Speak with our certification team</h2>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            Reach us for ISO consultation, documentation support, certification guidance, and verification assistance.
          </p>
        </div>
      </div>
      <CardContent className="grid gap-3 bg-white p-5 text-slate-950">
        {contactItems.map((item) => {
          const content = (
            <>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.accent}`}>
              <item.icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase text-muted-foreground">{item.label}</span>
              <span className="block break-words font-semibold leading-5 group-hover:text-primary">{item.value}</span>
            </span>
            </>
          );

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-lg border bg-white p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              {content}
            </a>
          ) : (
            <div key={item.label} className="group flex items-center gap-4 rounded-lg border bg-white p-4">
              {content}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
