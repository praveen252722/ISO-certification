import { PublicLayout } from "@/components/site/public-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Badge variant="outline">About us</Badge>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal">A certification authority built for reliable ISO compliance and transparent audit delivery.</h1>
            <p className="mt-6 leading-8 text-muted-foreground">
              ISO Certification Management System supports organizations through the full certification lifecycle: application review, document control, auditor assignment, evidence validation, audit reporting, certificate issuance, renewal reminders, and public certificate verification.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              Our team combines certification operations, quality management experience, digital workflow design, and customer support to help companies maintain confidence across ISO 9001, ISO 14001, ISO 45001, ISO 27001, ISO 22000, and related standards.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-64 rounded-lg bg-cover bg-center shadow-soft" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80)" }} />
            <div className="h-64 rounded-lg bg-cover bg-center shadow-soft sm:mt-10" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80)" }} />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Mission", "Make ISO certification simpler, faster, auditable, and easier for clients to verify online."],
            ["Operations", "Every application, document, audit, approval, certificate, and renewal is tracked with clear accountability."],
            ["Trust", "Certificates include unique IDs, QR-ready verification, expiry status, and transparent public validation."]
          ].map(([title, text]) => (
            <Card key={title}>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
