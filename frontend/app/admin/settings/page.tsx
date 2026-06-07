import { KeyRound, Save, UserCog } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
  return (
    <DashboardShell title="Admin Settings" role="Admin controlled username and password management">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCog className="h-5 w-5" /> Admin username</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input defaultValue="admin" placeholder="Current username" />
            <Input placeholder="New username" />
            <Button><Save className="h-4 w-4" /> Update username</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><KeyRound className="h-5 w-5" /> Admin password</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Input type="password" defaultValue="admin" placeholder="Current password" />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm password" />
            <Button><Save className="h-4 w-4" /> Update password</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
