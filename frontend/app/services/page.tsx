import { PublicLayout } from "@/components/site/public-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { certificationTypes } from "@/lib/demo-data";

export default function ServicesPage() {
  return (
    <PublicLayout>
      <section className="container py-16">
        <h1 className="text-4xl font-extrabold tracking-normal">ISO Services</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certificationTypes.map((type) => (
            <Card key={type}>
              <CardHeader><CardTitle>{type}</CardTitle></CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Application workflow, document checklist, audit scheduling, report upload, certificate generation, and renewal reminders.
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
