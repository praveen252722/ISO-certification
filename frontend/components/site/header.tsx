"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import { navItems } from "@/lib/demo-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-gradient-to-r from-sky-900 via-sky-700 to-cyan-600 text-white shadow-lg">
      <div className="flex min-h-20 items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-amber-300 bg-white text-sky-800 shadow-md">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xl font-extrabold uppercase tracking-normal md:text-2xl">ISO Certification Authority</p>
            <p className="truncate text-sm font-medium text-sky-50 md:text-base">Compliance, audits, certificates and verification</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-bold transition hover:bg-white/12"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="rounded-md p-2 xl:hidden" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/15 px-4 py-3 xl:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 font-semibold hover:bg-white/12" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
