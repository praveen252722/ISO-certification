import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch } from "lucide-react";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PublicLayout } from "@/components/site/public-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { achievements, certificationTypes, counters, processSteps, testimonials } from "@/lib/demo-data";

const clients = ["Tata Steel", "Apollo Health", "Infosys", "L&T", "Dr. Reddy's", "Mahindra"];
const faqs = [
  "How long does ISO certification take?",
  "Can we track audit status online?",
  "Does the certificate include QR verification?",
  "Can renewal reminders be automated on WhatsApp?"
];

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="hero-grid relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,47,73,0.96),rgba(14,116,144,0.78)),url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center" />
        <div className="container relative grid min-h-[680px] items-center gap-10 py-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Badge variant="warning" className="mb-5">Accredited ISO certification workflow platform</Badge>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-normal md:text-6xl">
              ISO Certification Management System
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-50">
              A premium SaaS platform for companies to apply, auditors to monitor, admins to approve, and customers to verify certificates online.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <Link href="/apply">Apply for Certification <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <Link href="/verify"><FileSearch className="h-4 w-4" /> Verify Certificate</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {counters.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-extrabold">{item.value}</p>
                  <p className="mt-1 text-xs font-medium text-sky-100">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/95 p-5 text-slate-950 shadow-2xl">
            <div className="mb-5">
              <div>
                <p className="text-sm font-semibold text-sky-700">Certification journey</p>
                <h2 className="text-2xl font-extrabold">Apply, audit and verify</h2>
              </div>
            </div>
            <div className="grid gap-3">
              {["Application submitted", "Documents validated", "Stage 1 audit scheduled", "Certificate QR generated"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-md border bg-slate-50 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{item}</p>
                    <p className="text-sm text-slate-500">Automated evidence, alerts, and approvals</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button asChild className="w-full">
                <Link href="/dashboard/client">Client Dashboard</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/dashboard/auditor">Auditor View</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item) => (
            <Card key={item.label}>
              <CardContent className="p-5">
                <item.icon className="mb-4 h-8 w-8 text-primary" />
                <p className="text-3xl font-extrabold">{item.value}+</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="container">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge variant="outline">Certification process</Badge>
              <h2 className="mt-3 text-3xl font-extrabold tracking-normal">From application to verified certificate</h2>
            </div>
            <Button asChild variant="outline"><Link href="/services">Explore services</Link></Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  <step.icon className="h-9 w-9 text-secondary" />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="success">ISO services</Badge>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal">Certification types supported out of the box</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Manage multi-site applications, auditor assignments, findings, certificate lifecycle, renewals, and public verification for every major ISO standard.
          </p>
          <div className="mx-auto mt-6 grid max-w-2xl gap-3 text-left">
            {certificationTypes.map((type) => (
              <div key={type} className="flex items-center gap-3 rounded-md border bg-card p-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 dark:bg-slate-900">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge variant="outline">Projects showcase</Badge>
              <h2 className="mt-3 text-3xl font-extrabold tracking-normal">Latest certified organizations</h2>
            </div>
            <Button asChild variant="ghost"><Link href="/projects">View all projects</Link></Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {["Manufacturing quality transformation", "Food safety certification rollout", "Information security audit program"].map((title, index) => (
              <Card key={title} className="overflow-hidden">
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-${index === 0 ? "1517048676732-d65bc937f952" : index === 1 ? "1556761175-b413da4baf72" : "1552664730-d307ca884978"}?auto=format&fit=crop&w=900&q=80)` }} />
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Completed with document review, audit trail, certificate generation, and renewal automation.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-10 text-center">
          <Badge variant="outline">Trusted by enterprise teams</Badge>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal">Client confidence at every checkpoint</h2>
        </div>
        <div className="mb-10 grid grid-cols-2 gap-3 text-center md:grid-cols-6">
          {clients.map((client) => (
            <div key={client} className="rounded-md border bg-card p-4 text-sm font-bold text-muted-foreground">{client}</div>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <CardContent className="p-5">
                <p className="leading-7 text-muted-foreground">“{item.quote}”</p>
                <p className="mt-5 font-bold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <Badge variant="outline">FAQs</Badge>
            <h2 className="mt-3 text-3xl font-extrabold tracking-normal">Clear answers for certification teams</h2>
            <div className="mt-6 grid gap-3">
              {faqs.map((faq) => (
                <div key={faq} className="rounded-md border p-4 font-semibold">{faq}</div>
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Contact our certification team</CardTitle>
            </CardHeader>
            <CardContent>
              <InquiryForm buttonLabel="Send enquiry on WhatsApp" />
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
