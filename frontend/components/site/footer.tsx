import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navItems } from "@/lib/demo-data";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/vjinternationalcertifications", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/vjinternationalcertifications", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/vjcertifications", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/vjinternationalcertifications", label: "Instagram" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#012f2e] text-slate-100">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#f6d46f] bg-white">
              <img src="/images/brand/vj-international-logo.jpeg" alt="VJ International Certifications logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-extrabold uppercase">VJ International Certifications</p>
              <p className="text-sm text-[#fff3c4]">Global Excellence | Trust | Assurance</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Professional ISO certification support, documentation guidance, audit coordination, and certificate verification.
          </p>
          <div className="mt-5 flex gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Button key={label} size="icon" variant="outline" className="border-slate-700 bg-transparent text-white hover:bg-slate-800" asChild>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
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
          <h3 className="mb-4 font-semibold">Contact Details</h3>
          <div className="grid gap-3 text-sm text-slate-300">
            <span className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /> 2-122/181/1, Sriram Nagar, Shamshiguda, Kukatpally, Hyderabad 500072</span>
            <span className="flex gap-2"><Phone className="h-4 w-4 shrink-0 mt-0.5" /> +91 73861 81914</span>
            <span className="flex gap-2"><Mail className="h-4 w-4 shrink-0 mt-0.5" /> info@vjinternationalcertification.com</span>
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
        &copy; 2026 VJ International Certifications. All rights reserved.
      </div>
    </footer>
  );
}
