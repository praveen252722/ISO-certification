import Link from "next/link";
import { PublicLayout } from "@/components/site/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <PublicLayout>
      <section className="container flex min-h-[620px] items-center justify-center py-16">
        <Card className="w-full max-w-xl">
          <CardHeader><CardTitle>Create client account</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Full name" />
            <Input placeholder="Company name" />
            <Input type="email" placeholder="Email address" />
            <Input placeholder="WhatsApp number" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm password" />
            <Button asChild className="md:col-span-2"><Link href="/dashboard/client">Register</Link></Button>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}
