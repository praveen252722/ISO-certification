import { PublicLayout } from "@/components/site/public-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpenCheck, CheckCircle2, ClipboardList, FileCheck2, ShieldCheck } from "lucide-react";

const serviceGroups = [
  {
    title: "Certificate Consultants",
    services: [
      {
        title: "ISO Accreditation Specialists",
        icon: Award,
        details: ["Request for Price", "Response Time: Within 24 Hrs", "Payment Method: Online/offline"]
      },
      {
        title: "ISO Standard Compliance Consultants",
        icon: ShieldCheck,
        details: ["Certification readiness review", "Gap assessment support", "Documentation guidance"]
      },
      {
        title: "ISO Compliance Solutions",
        icon: ClipboardList,
        details: ["Documentation Provision: Comprehensive Guides", "Certification Standard: ISO 9001, ISO 14001"]
      }
    ]
  },
  {
    title: "Certification Consultants",
    services: [
      {
        title: "ISO Certification Consultants",
        icon: FileCheck2,
        details: ["Application support", "Audit coordination", "Certificate verification assistance"]
      },
      {
        title: "Documentation & Process Setup",
        icon: BookOpenCheck,
        details: ["Quality manuals", "Policy templates", "Process records and registers"]
      }
    ]
  }
];

export default function ServicesPage() {
  return (
    <PublicLayout>
      <section className="gold-radial text-white">
        <div className="container py-16">
          <Badge variant="warning">All Services</Badge>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal md:text-5xl">ISO consulting and certification services for growing businesses</h1>
          <p className="mt-5 max-w-3xl leading-8 text-sky-50">
            Choose the right certification support, documentation guidance, compliance review, and audit coordination services from VJ International Certifications.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-10">
          {serviceGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <h2 className="text-2xl font-extrabold tracking-normal">{group.title} <span className="text-muted-foreground">({group.services.length} Services)</span></h2>
                <Button asChild variant="ghost"><a href="https://wa.me/918341864446" target="_blank" rel="noreferrer">View All</a></Button>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {group.services.map((service) => (
                  <Card key={service.title} className="overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-36 overflow-hidden bg-slate-950">
                      <div className="absolute inset-0 gold-radial" />
                      <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-amber-300/25 blur-2xl animate-glow-pulse" />
                      <div className="relative flex h-full items-center justify-center">
                        <service.icon className="h-14 w-14 text-amber-200" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 text-sm text-muted-foreground">
                        {service.details.map((detail) => (
                          <p key={detail} className="flex gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <span>{detail}</span>
                          </p>
                        ))}
                      </div>
                      <Button asChild className="mt-5 w-full">
                        <a href={`https://wa.me/918341864446?text=${encodeURIComponent(`Hello, I want details about ${service.title}.`)}`} target="_blank" rel="noreferrer">
                          Get Best Price
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
