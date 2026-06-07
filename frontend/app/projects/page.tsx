import { PublicLayout } from "@/components/site/public-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = ["Multi-site manufacturing audit", "Hospital quality management", "Cloud security compliance", "Food safety renewal program", "Environmental impact certification", "Medical device QMS"];

export default function ProjectsPage() {
  return (
    <PublicLayout>
      <section className="container py-16">
        <h1 className="text-4xl font-extrabold tracking-normal">Projects Showcase</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project}>
              <CardHeader><CardTitle>{project}</CardTitle></CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">End-to-end certification delivery with evidence review, audit reports, client communications, and public certificate verification.</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
