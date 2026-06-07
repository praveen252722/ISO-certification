import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ApplicationsBarChart, AuditLineChart, CertificatePieChart, RevenueAreaChart } from "@/components/charts/analytics-charts";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { applications, certificates, dashboardStats } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <DashboardShell title="Admin Dashboard" role="Super Admin / Certification Manager">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-extrabold">{stat.value}</p>
                <Badge variant="success" className="mt-3">{stat.change}</Badge>
              </div>
              <stat.icon className="h-9 w-9 text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-primary">Live certification board</p>
              <CardTitle>Workflow Intelligence</CardTitle>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin/projects">Manage website images and project details</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          {["Application submitted", "Documents validated", "Audit scheduled", "Certificate QR generated"].map((item, index) => (
            <div key={item} className="rounded-md border bg-muted p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">{index + 1}</div>
              <p className="font-semibold">{item}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Tracked by admin</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Tabs defaultValue="analytics" className="mt-6">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" id="analytics">
          <div className="grid gap-5 xl:grid-cols-2">
            <Card><CardHeader><CardTitle>Revenue analytics</CardTitle></CardHeader><CardContent><RevenueAreaChart /></CardContent></Card>
            <Card><CardHeader><CardTitle>Monthly applications</CardTitle></CardHeader><CardContent><ApplicationsBarChart /></CardContent></Card>
            <Card><CardHeader><CardTitle>Active vs expired certificates</CardTitle></CardHeader><CardContent><CertificatePieChart /></CardContent></Card>
            <Card><CardHeader><CardTitle>Audit completion rates</CardTitle></CardHeader><CardContent><AuditLineChart /></CardContent></Card>
          </div>
        </TabsContent>
        <TabsContent value="applications" id="applications">
          <Card>
            <CardHeader><CardTitle>Applications table</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Owner</TableHead><TableHead>Date</TableHead><TableHead /></TableRow></TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.company}>
                      <TableCell className="font-semibold">{app.company}</TableCell>
                      <TableCell>{app.type}</TableCell>
                      <TableCell><Badge variant="outline">{app.status}</Badge></TableCell>
                      <TableCell>{app.owner}</TableCell>
                      <TableCell>{formatDate(app.date)}</TableCell>
                      <TableCell><Button size="sm">Review</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="certificates">
          <Card>
            <CardHeader><CardTitle>Certificates table</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Number</TableHead><TableHead>Company</TableHead><TableHead>Type</TableHead><TableHead>Expiry</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.number}>
                      <TableCell className="font-semibold">{cert.number}</TableCell>
                      <TableCell>{cert.company}</TableCell>
                      <TableCell>{cert.type}</TableCell>
                      <TableCell>{formatDate(cert.expiryDate)}</TableCell>
                      <TableCell><Badge variant="success">{cert.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="automation" id="whatsapp">
          <Card>
            <CardHeader><CardTitle>WhatsApp and AI automation center</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {["Renewal reminders", "Audit reminders", "Certificate notifications", "Payment confirmations", "AI audit summaries", "Compliance suggestions"].map((item) => (
                <div key={item} className="rounded-md border bg-muted p-4 font-semibold">{item}</div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
