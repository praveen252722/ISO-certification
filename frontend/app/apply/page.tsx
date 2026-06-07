import { PublicLayout } from "@/components/site/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ApplyPage() {
  return (
    <PublicLayout>
      <section className="container py-16">
        <h1 className="text-4xl font-extrabold tracking-normal">Apply for ISO Certification</h1>
        <Card className="mt-8">
          <CardHeader><CardTitle>Company application</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Company name" />
            <Input placeholder="Contact person" />
            <Input placeholder="Email" />
            <Input placeholder="WhatsApp number" />
            <Input placeholder="Certification type" />
            <Input placeholder="Number of sites" />
            <Textarea className="md:col-span-2" placeholder="Business scope and certification requirement" />
            <Button className="md:col-span-2">Submit application</Button>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}
