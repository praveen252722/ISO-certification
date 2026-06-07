import { PublicLayout } from "@/components/site/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <PublicLayout>
      <section className="container flex min-h-[560px] items-center justify-center py-16">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle>Forgot Password</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <Input type="email" placeholder="Email address" />
            <Button>Send reset link</Button>
          </CardContent>
        </Card>
      </section>
    </PublicLayout>
  );
}
