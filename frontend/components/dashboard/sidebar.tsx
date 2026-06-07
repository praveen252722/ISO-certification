import Link from "next/link";
import { BarChart3, Bell, CalendarCheck, FileCheck2, Home, MessageSquareText, Settings, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Overview", href: "/admin/dashboard", icon: Home },
  { label: "Applications", href: "/admin/dashboard#applications", icon: FileCheck2 },
  { label: "Clients", href: "/admin/dashboard#clients", icon: Users },
  { label: "Audits", href: "/dashboard/auditor", icon: CalendarCheck },
  { label: "Analytics", href: "/admin/dashboard#analytics", icon: BarChart3 },
  { label: "Projects CMS", href: "/admin/projects", icon: MessageSquareText },
  { label: "Notifications", href: "/admin/dashboard#notifications", icon: Bell },
  { label: "Settings", href: "/admin/settings", icon: Settings }
];

export function DashboardSidebar() {
  return (
    <aside className="hidden min-h-screen w-72 border-r bg-slate-950 p-4 text-white lg:block">
      <Link href="/" className="mb-8 flex items-center gap-3 rounded-md p-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="font-extrabold">ISO Certify</p>
          <p className="text-xs text-slate-300">Admin command center</p>
        </div>
      </Link>
      <nav className="grid gap-1">
        {links.map((link) => (
          <Button key={link.href} asChild variant="ghost" className="justify-start text-slate-200 hover:bg-white/10 hover:text-white">
            <Link href={link.href}><link.icon className="h-4 w-4" /> {link.label}</Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
