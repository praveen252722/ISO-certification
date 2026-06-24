"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "@/components/site/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/services/api";

interface OrganizationApiRecord {
  _id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  certificationDate?: string;
  createdAt?: string;
}

interface DisplayProject {
  title: string;
  image: string;
  date: string;
  description: string;
}

function formatProjectDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function mapOrganization(item: OrganizationApiRecord): DisplayProject {
  return {
    title: item.title,
    image: item.imageUrl ?? "",
    date: formatProjectDate(item.certificationDate ?? item.createdAt),
    description: item.description ?? "Certification support completed with verified documentation."
  };
}

export function LatestCertifiedOrganizations({ limit = 10, showViewAll = true }: { limit?: number; showViewAll?: boolean }) {
  const [organizations, setOrganizations] = useState<DisplayProject[]>([]);

  const visibleOrganizations = useMemo(() => organizations.slice(0, limit), [limit, organizations]);

  useEffect(() => {
    let ignore = false;

    async function loadOrganizations() {
      try {
        const response = await fetch(`${API_URL}/organizations?limit=${limit}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Organizations fetch failed");
        const data = await response.json() as { items?: OrganizationApiRecord[] };
        const live = (data.items ?? []).map(mapOrganization).filter((item) => item.title);

        if (!ignore && live.length) {
          setOrganizations(live);
        }
      } catch {
        // silently ignore
      }
    }

    void loadOrganizations();
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
          {visibleOrganizations.map((item, index) => (
            <ProjectCard key={`${item.title}-${index}`} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
