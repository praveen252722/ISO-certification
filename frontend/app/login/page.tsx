import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PublicLayout } from "@/components/site/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <PublicLayout>
      <section className="container flex min-h-[620px] items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input type="email" placeholder="Email address" />
            <Input type="password" placeholder="Password" />
            <Button asChild><Link href="/dashboard/client">Sign in</Link></Button>
            <div className="flex justify-between text-sm">
              <Link href="/forgot-password" className="text-primary">Forgot password?</Link>
              <Link href="/register" className="text-primary">Create account</Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}
