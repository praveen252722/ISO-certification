import { PublicLayout } from "@/components/site/public-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpenCheck, CheckCircle2, ClipboardList, FileCheck2, Leaf, ServerCog, ShieldAlert, ShieldCheck, Stethoscope, Utensils } from "lucide-react";

const serviceGroups = [
  {
    title: "Certificate Consultants",
    services: [
      {
        title: "ISO 9001:2015 Quality Management System",
        icon: Award,
        details: ["Globally accepted quality management standard", "Process control and continual improvement", "Customer satisfaction and audit readiness"]
      },
      {
        title: "ISO 14001:2015 Environment Management System",
        icon: Leaf,
        details: ["Environmental management framework", "Risk, compliance, and sustainability controls", "Documentation and audit preparation"]
      },
      {
        title: "ISO 13485:2016 Medical Devices",
        icon: Stethoscope,
        details: ["Medical device quality system guidance", "Regulatory documentation support", "Traceability and process control readiness"]
      }
    ]
  },
  {
    title: "Certification Consultants",
    services: [
      {
        title: "ISO 20000:2011 IT Service Management",
        icon: ServerCog,
        details: ["IT service management process support", "Service delivery control documentation", "Audit coordination assistance"]
      },
      {
        title: "ISO 22000:2018 Food Safety Management",
        icon: Utensils,
        details: ["Food chain safety management requirements", "Hygiene, hazard, and control documentation", "Certification readiness support"]
      },
      {
        title: "ISO 50001:2018 Energy Management",
        icon: ClipboardList,
        details: ["Company-level energy management system", "Energy performance improvement planning", "Monitoring and records guidance"]
      },
      {
        title: "ISO 27001:2013 Information Security",
        icon: ShieldCheck,
        details: ["Security policy and control framework", "Risk assessment documentation", "Information security audit readiness"]
      },
      {
        title: "ISO 45001:2018 Occupational Health & Safety",
        icon: ShieldAlert,
        details: ["Workplace health and safety requirements", "Hazard control and incident records", "Compliance documentation support"]
      },
      {
        title: "ISO 37001:2016 Anti-Bribery Management",
        icon: FileCheck2,
        details: ["Anti-bribery management system guidance", "Policy and due diligence documentation", "Implementation and audit support"]
      },
      {
        title: "GHP Good Hygiene Practices",
        icon: BookOpenCheck,
        details: ["Hygiene practice documentation", "Food handling and sanitation controls", "Compliance review support"]
      },
      {
        title: "AS 9100(D) Aerospace Certification",
        icon: Award,
        details: ["Aerospace quality management guidance", "Supplier and process control documentation", "Audit readiness assistance"]
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
          <p className="mt-5 max-w-3xl leading-8 text-[#fff6d6]">
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
                <Button asChild variant="ghost"><a href="/contact">View All</a></Button>
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
                        <a href="/contact">
                          Get the certificate
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
