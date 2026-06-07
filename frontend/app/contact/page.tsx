import { PublicLayout } from "@/components/site/public-layout";
import { ContactPanel } from "@/components/site/contact-panel";
import { InquiryForm } from "@/components/site/inquiry-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="container grid gap-8 py-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h1 className="text-4xl font-extrabold tracking-normal">Contact VJ International Certifications</h1>
          <p className="mt-4 leading-7 text-muted-foreground">Talk to our certification team about ISO application, documentation, audit readiness, renewals, and verification.</p>
          <div className="mt-6">
            <ContactPanel />
          </div>
        </div>
        <Card>
          <CardHeader><CardTitle>Send a message</CardTitle></CardHeader>
          <CardContent>
            <InquiryForm />
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}
