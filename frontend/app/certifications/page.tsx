import { PublicLayout } from "@/components/site/public-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { certificates } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function CertificationsPage() {
  return (
    <PublicLayout>
      <section className="container py-16">
        <h1 className="text-4xl font-extrabold tracking-normal">Certification Types</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.number}>
              <CardHeader>
                <Badge variant="success">{cert.status}</Badge>
                <CardTitle>{cert.type}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{cert.company}</p>
                <p>Valid until {formatDate(cert.expiryDate)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
