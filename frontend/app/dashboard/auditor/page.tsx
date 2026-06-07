import { Brain, CalendarDays, ClipboardCheck, FileText } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { applications } from "@/lib/demo-data";

const aiActions = [
  { icon: Brain, label: "Generate audit summary" },
  { icon: ClipboardCheck, label: "Suggest corrective actions" },
  { icon: FileText, label: "Draft smart report" },
  { icon: CalendarDays, label: "Prepare visit agenda" }
];

export default function AuditorDashboardPage() {
  return (
    <DashboardShell title="Auditor Dashboard" role="Auditor / Compliance Reviewer">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader><CardTitle>Audit schedule</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Standard</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.company}>
                    <TableCell className="font-semibold">{app.company}</TableCell>
                    <TableCell>{app.type}</TableCell>
                    <TableCell><Badge variant="outline">{app.status}</Badge></TableCell>
                    <TableCell><Button size="sm">Open timeline</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>AI audit assistant</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {aiActions.map((action) => (
              <Button key={action.label} variant="outline" className="justify-start"><action.icon className="h-4 w-4" /> {action.label}</Button>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Audit timeline</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          {["Opening meeting", "Document evidence review", "Site inspection", "Non-conformity log", "Closing meeting", "AI summary generated"].map((item, index) => (
            <div key={item} className="flex gap-4 rounded-md border bg-card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</div>
              <div>
                <p className="font-semibold">{item}</p>
                <p className="text-sm text-muted-foreground">Tracked with timestamp, owner, evidence, and activity logs.</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
