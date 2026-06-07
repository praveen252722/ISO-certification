import { PublicLayout } from "@/components/site/public-layout";
import { InquiryForm } from "@/components/site/inquiry-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="container grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h1 className="text-4xl font-extrabold tracking-normal">Contact Page</h1>
          <p className="mt-4 leading-7 text-muted-foreground">Talk to our certification team about ISO application, audit scheduling, renewals, verification, or enterprise onboarding.</p>
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
