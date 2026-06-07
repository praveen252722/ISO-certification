import { ImagePlus, Save, Upload } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const existingProjects = [
  {
    title: "Manufacturing quality transformation",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Food safety certification rollout",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Information security audit program",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
  }
];

export default function AdminProjectsPage() {
  return (
    <DashboardShell title="Projects CMS" role="Admin controlled website images and information">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImagePlus className="h-5 w-5" /> Add or update project image</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input placeholder="Project title" />
            <Input placeholder="Company name" />
            <Input placeholder="Certification type" />
            <Input placeholder="Image URL or Cloudinary URL" />
            <Textarea placeholder="Project details shown on the public website" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline"><Upload className="h-4 w-4" /> Upload image</Button>
              <Button><Save className="h-4 w-4" /> Save website update</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {existingProjects.map((project) => (
            <Card key={project.title} className="overflow-hidden">
              <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
              <CardContent className="flex flex-col justify-between gap-3 p-5 md:flex-row md:items-center">
                <div>
                  <p className="font-bold">{project.title}</p>
                  <p className="text-sm text-muted-foreground">Admin can manually update image, title, company, ISO type, and details.</p>
                </div>
                <Button variant="outline">Edit</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
