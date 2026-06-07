import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, MapPin, Phone } from "lucide-react";
import { ContactPanel } from "@/components/site/contact-panel";
import { GoogleMapsShowcase } from "@/components/site/google-maps-showcase";
import { InquiryForm } from "@/components/site/inquiry-form";
import { ProjectCard } from "@/components/site/project-card";
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

const certifiedProjects = [
  {
    title: "Police Department Certification Support",
    image: "/images/projects/certified-organization-1.png",
    date: "June 8, 2026",
    description: "Certification support and coordination completed with public safety department teams."
  },
  {
    title: "School Compliance Program",
    image: "/images/projects/certified-organization-2.png",
    date: "June 8, 2026",
    description: "Documentation and certification guidance delivered for education institution compliance."
  },
  {
    title: "Fire Safety Certification Assistance",
    image: "/images/projects/certified-organization-3.png",
    date: "June 8, 2026",
    description: "Fire safety and process compliance certification support with verified documentation."
  },
  {
    title: "Police Office Certification Handover",
    image: "/images/projects/certified-organization-4.png",
    date: "June 8, 2026",
    description: "Certificate handover and compliance recognition with department leadership."
  },
  {
    title: "Apex Elevators Certification",
    image: "/images/projects/certified-organization-5.png",
    date: "June 8, 2026",
    description: "Certification consultation and quality documentation support for elevator services."
  },
  {
    title: "Fire Department Readiness Program",
    image: "/images/projects/certified-organization-6.png",
    date: "June 8, 2026",
    description: "Audit readiness and compliance documentation support for emergency service operations."
  },
  {
    title: "Sri Sairam High School Certification",
    image: "/images/projects/certified-organization-7.png",
    date: "June 8, 2026",
    description: "Institution certification program with student awareness and management documentation."
  },
  {
    title: "Business Certification Handover",
    image: "/images/projects/certified-organization-8.png",
    date: "June 8, 2026",
    description: "Client certificate handover for business compliance and quality management readiness."
  },
  {
    title: "Cyberabad Police School Program",
    image: "/images/projects/certified-organization-9.png",
    date: "June 8, 2026",
    description: "ISO guidance and certification support for police training and education activity."
  },
  {
    title: "Institution Recognition Program",
    image: "/images/projects/certified-organization-10.png",
    date: "June 8, 2026",
    description: "Certificate and award handover with institutional leadership and compliance records."
  }
];

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="hero-grid relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 gold-radial" />
        <div className="absolute left-1/2 top-16 h-72 w-72 rounded-full bg-amber-400/30 blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 right-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl animate-glow-pulse" />
        <div className="container relative grid min-h-[680px] items-center gap-10 py-16 lg:grid-cols-[1fr_0.85fr]">
          <div className="animate-reveal-up">
            <Badge variant="warning" className="mb-5">ISO certification services in Hyderabad</Badge>
            <h1 className="animate-title-sweep max-w-4xl text-4xl font-extrabold leading-tight tracking-normal md:text-6xl">
              <span className="title-solid-color title-sheen">
                VJ International Certifications
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-sky-50">
              Global Excellence | Trust | Assurance. Professional ISO documentation, certification guidance, audit coordination, and verification support led by Proprietor T. Gabriel.
            </p>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-sky-50 sm:grid-cols-2">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-300" /> +91 73861 81914</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-amber-300" /> +91 70950 81914</span>
              <span className="flex items-start gap-2 sm:col-span-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-300" /> 2-122/181/1, Sriram Nagar, Shamshiguda, Kukatpally, Hyderabad 500072</span>
            </div>
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

          <GoogleMapsShowcase />
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

      <section className="bg-slate-100 py-16 dark:bg-slate-900">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge variant="outline">Projects showcase</Badge>
              <h2 className="mt-3 text-3xl font-extrabold tracking-normal">Latest certified organizations</h2>
            </div>
            <Button asChild variant="ghost"><Link href="/projects">View all projects</Link></Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {certifiedProjects.map((item, index) => (
              <ProjectCard key={item.title} {...item} index={index} />
            ))}
          </div>
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
            {processSteps.map((step, index) => (
              <Card key={step.title} className="animate-stagger-pop" style={{ animationDelay: `${index * 100}ms` }}>
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
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="success">ISO services</Badge>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal">Certification types supported out of the box</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Choose the ISO certification track that fits your business with consultation, documentation guidance, audit readiness, and certificate support.
          </p>
          <div className="mt-8 grid gap-5 text-left md:grid-cols-2 lg:grid-cols-3">
            {certificationTypes.map((type, index) => (
              <Card
                key={type}
                className="animate-stagger-pop transition hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <CardHeader>
                  <CheckCircle2 className="h-9 w-9 text-secondary" />
                  <CardTitle>{type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Consultation, documentation guidance, audit readiness, and certificate support.
                  </p>
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
            <Card className="mt-6 overflow-hidden shadow-soft">
              <CardHeader className="border-b bg-muted/40 px-6 py-5">
                <CardTitle className="text-xl leading-tight">Inquiry Form</CardTitle>
                <p className="text-sm text-muted-foreground">Share your requirement and we will open WhatsApp with the filled details.</p>
              </CardHeader>
              <CardContent className="p-7">
                <InquiryForm buttonLabel="Send enquiry on WhatsApp" />
              </CardContent>
            </Card>
          </div>
          <ContactPanel />
        </div>
      </section>
    </PublicLayout>
  );
}
