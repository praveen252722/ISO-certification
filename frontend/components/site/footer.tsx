import Link from "next/link";
import { Facebook, Linkedin, Mail, MapPin, Phone, ShieldCheck, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navItems } from "@/lib/demo-data";

export function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-600">
              <ShieldCheck />
            </div>
            <div>
              <p className="font-extrabold uppercase">ISO Certification Authority</p>
              <p className="text-sm text-slate-300">Enterprise certification management</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Apply, audit, approve, generate, renew, and verify ISO certificates from one secure platform.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Twitter, Linkedin].map((Icon, index) => (
              <Button key={index} size="icon" variant="outline" className="border-slate-700 bg-transparent text-white hover:bg-slate-800">
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Quick Navigation</h3>
          <div className="grid gap-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Company Details</h3>
          <div className="grid gap-3 text-sm text-slate-300">
            <span className="flex gap-2"><MapPin className="h-4 w-4" /> Hyderabad, Telangana, India</span>
            <span className="flex gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</span>
            <span className="flex gap-2"><Mail className="h-4 w-4" /> support@isocertify.example</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Newsletter</h3>
          <p className="mb-4 text-sm text-slate-300">Monthly compliance updates, audit reminders, and ISO renewal insights.</p>
          <div className="flex gap-2">
            <Input placeholder="Email address" className="border-slate-700 bg-slate-900" />
            <Button variant="accent">Join</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-400">
        © 2026 ISO Certification Management System. All rights reserved.
      </div>
    </footer>
  );
}
