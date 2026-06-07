import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { PublicLayout } from "@/components/site/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  return (
    <PublicLayout>
      <section className="container flex min-h-[640px] items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <ShieldCheck className="mx-auto h-11 w-11 text-primary" />
            <CardTitle>Admin Panel</CardTitle>
            <p className="text-sm text-muted-foreground">Restricted access for ISO certification administrators.</p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input defaultValue="admin" aria-label="Username" placeholder="Username" />
            <Input defaultValue="admin" aria-label="Password" type="password" placeholder="Password" />
            <Button asChild>
              <Link href="/admin/dashboard"><LockKeyhole className="h-4 w-4" /> Login</Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground">Default access: username admin, password admin. Change it from Admin Settings.</p>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}
