import { PublicLayout } from "@/components/site/public-layout";
import { GoogleMapsShowcase } from "@/components/site/google-maps-showcase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="animate-reveal-up">
            <Badge variant="outline">About us</Badge>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal">VJ International Certifications, Hyderabad</h1>
            <p className="mt-6 leading-8 text-muted-foreground">
              VJ International Certifications provides ISO certification support with Brief-UKASL Accreditation. The company helps organizations prepare documentation, coordinate audit readiness, manage certification applications, and maintain clear verification records.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              Led by Proprietor T. Gabriel, the team works with clients across quality, safety, environmental, food safety, and information security standards. The office is located at 2-122/181/1, Sriram Nagar, Shamshiguda, Kukatpally, Hyderabad 500072.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild><Link href="/contact">Contact VJ Certifications</Link></Button>
              <Button asChild variant="outline"><a href="https://maps.app.goo.gl/Bt4KS8WU1Szv6M2NA" target="_blank" rel="noreferrer">Open Google Map</a></Button>
            </div>
          </div>
          <GoogleMapsShowcase compact />
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
