import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export function DashboardShell({ title, role, children }: { title: string; role: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="flex">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b bg-background/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-extrabold tracking-normal md:text-2xl">{title}</h1>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
              <div className="hidden w-full max-w-md items-center gap-2 rounded-md border bg-muted px-3 md:flex">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search clients, certificates, audits" className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon"><Bell className="h-4 w-4" /></Button>
                <Avatar><AvatarFallback>ISO</AvatarFallback></Avatar>
              </div>
            </div>
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
