"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "@/components/site/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/services/api";

interface ProjectApiRecord {
  _id?: string;
  slug?: string;
  title: string;
  summary?: string;
  description?: string;
  imageUrl?: string;
  certifiedDate?: string;
  createdAt?: string;
}

interface DisplayProject {
  title: string;
  image: string;
  date: string;
  description: string;
}

const fallbackProjects: DisplayProject[] = [
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

function resolveImageUrl(value?: string) {
  if (!value) return "";
  if (value.startsWith("/uploads/")) return `${API_URL.replace(/\/api\/v1$/, "")}${value}`;
  return value;
}

function formatProjectDate(value?: string) {
  if (!value) return "June 8, 2026";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "June 8, 2026";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function mapProject(item: ProjectApiRecord): DisplayProject {
  return {
    title: item.title,
    image: resolveImageUrl(item.imageUrl),
    date: formatProjectDate(item.certifiedDate ?? item.createdAt),
    description: item.summary ?? item.description ?? "Certification support completed with verified documentation."
  };
}

export function LatestCertifiedOrganizations({ limit = 10, showViewAll = true }: { limit?: number; showViewAll?: boolean }) {
  const [projects, setProjects] = useState<DisplayProject[]>(() => fallbackProjects.slice(0, limit));

  const visibleProjects = useMemo(() => projects.slice(0, limit), [limit, projects]);

  useEffect(() => {
    let ignore = false;

    async function loadProjects() {
      try {
        const response = await fetch(`${API_URL}/projects?limit=${limit}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Project fetch failed");
        const data = await response.json() as { items?: ProjectApiRecord[] };
        const liveProjects = (data.items ?? []).map(mapProject).filter((item) => item.title);

        if (!ignore && liveProjects.length) {
          setProjects(liveProjects);
        }
      } catch {
        if (!ignore) setProjects(fallbackProjects.slice(0, limit));
      }
    }

    void loadProjects();
    return () => {
      ignore = true;
    };
  }, [limit]);

  return (
    <section className="bg-slate-100 py-16 dark:bg-slate-900">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge variant="outline">Projects showcase</Badge>
            <h2 className="mt-3 text-3xl font-extrabold tracking-normal">Latest certified organizations</h2>
          </div>
          {showViewAll ? <Button asChild variant="ghost"><Link href="/projects">View all projects</Link></Button> : null}
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((item, index) => (
            <ProjectCard key={`${item.title}-${index}`} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
