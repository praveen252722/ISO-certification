import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
