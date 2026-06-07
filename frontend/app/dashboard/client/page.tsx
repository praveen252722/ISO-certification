import { CalendarCheck, CreditCard, Download, FileUp, RotateCcw } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { certificates } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

const clientStats = [
  { label: "Active certificates", value: "3", icon: Download },
  { label: "Pending applications", value: "2", icon: FileUp },
  { label: "Upcoming audits", value: "1", icon: CalendarCheck },
  { label: "Renewal reminders", value: "2", icon: RotateCcw }
];

export default function ClientDashboardPage() {
  return (
    <DashboardShell title="Client Dashboard" role="Client / Company User">
      <div className="grid gap-4 md:grid-cols-4">
        {clientStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <stat.icon className="mb-4 h-8 w-8 text-primary" />
              <p className="text-2xl font-extrabold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader><CardTitle>Application status</CardTitle></CardHeader>
          <CardContent className="grid gap-5">
            {["Company profile", "Documents uploaded", "Audit scheduled", "Admin approval", "Certificate issued"].map((step, index) => (
              <div key={step}>
                <div className="mb-2 flex justify-between text-sm font-semibold"><span>{step}</span><span>{index < 3 ? "Complete" : "Pending"}</span></div>
                <Progress value={index < 3 ? 100 : index === 3 ? 45 : 0} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Payment history</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {["Application fee", "Stage 1 audit", "Certificate generation"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-md border p-3">
                <span className="flex items-center gap-2 font-semibold"><CreditCard className="h-4 w-4" /> {item}</span>
                <Badge variant={index < 2 ? "success" : "warning"}>{index < 2 ? "Paid" : "Due"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Download certificates</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          {certificates.slice(0, 2).map((cert) => (
            <div key={cert.number} className="flex flex-col justify-between gap-3 rounded-md border p-4 md:flex-row md:items-center">
              <div>
                <p className="font-bold">{cert.company}</p>
                <p className="text-sm text-muted-foreground">{cert.type} · expires {formatDate(cert.expiryDate)}</p>
              </div>
              <Button><Download className="h-4 w-4" /> Download PDF</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
