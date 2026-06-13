"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { BarChart3, Download, FileCheck2, LayoutDashboard, Loader2, LogOut, Plus, RefreshCw, Search, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL, apiClient } from "@/services/api";
import { formatCurrency, formatDate } from "@/lib/utils";

type Tab = "dashboard" | "users" | "certificates" | "exports";

interface AdminUser {
  id?: string;
  _id?: string;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
}

interface CertificateRecord {
  _id?: string;
  id?: string;
  clientName: string;
  companyName: string;
  certificateId: string;
  certificateNumber: string;
  certificateType: string;
  certificationScope?: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  email?: string;
  phone?: string;
  address?: string;
  certificatePdf?: string;
}

interface OverviewMetrics {
  totalCertifications: number;
  activeCertificates: number;
  expiredCertificates: number;
  users: number;
  byType: Array<{ _id: string; count: number }>;
}

const emptyCertificate = {
  clientName: "",
  companyName: "",
  certificateId: "",
  certificateNumber: "",
  certificateType: "ISO 9001:2015",
  certificationScope: "",
  issueDate: "",
  expiryDate: "",
  status: "ACTIVE",
  email: "",
  phone: "",
  address: "",
  certificatePdf: ""
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({ username: "admin", password: "VJ@123" });
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [revenue, setRevenue] = useState<{ monthly: Array<{ month: string; total: number; count: number }>; recent: Array<Record<string, unknown>> }>({ monthly: [], recent: [] });
  const [certificateForm, setCertificateForm] = useState(emptyCertificate);
  const [editingCertificateId, setEditingCertificateId] = useState("");
  const [userForm, setUserForm] = useState({ name: "", username: "", email: "", password: "", phone: "", role: "STAFF", securityPin: "" });
  const [editingUserId, setEditingUserId] = useState("");
  const [search, setSearch] = useState("");

  const apiBase = useMemo(() => API_URL.replace(/\/api\/v1$/, ""), []);

  useEffect(() => {
    const savedToken = localStorage.getItem("vj_admin_token");
    const savedUser = localStorage.getItem("vj_admin_user");
    if (savedToken) setToken(savedToken);
    if (savedUser) setAdmin(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (token) void loadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function request<T>(path: string, options: RequestInit = {}) {
    return apiClient<T>(path, { ...options, token });
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiClient<{ token: string; user: AdminUser }>("/auth/admin-login", {
        method: "POST",
        body: JSON.stringify(loginForm)
      });
      setToken(data.token);
      setAdmin(data.user);
      localStorage.setItem("vj_admin_token", data.token);
      localStorage.setItem("vj_admin_user", JSON.stringify(data.user));
      setNotice("Admin login successful.");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to login");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("vj_admin_token");
    localStorage.removeItem("vj_admin_user");
    setToken("");
    setAdmin(null);
  }

  async function loadAdminData() {
    setLoading(true);
    setError("");
    try {
      const [overview, userData, certificateData, revenueData] = await Promise.all([
        request<{ metrics: OverviewMetrics }>("/analytics/overview"),
        request<{ items: AdminUser[] }>("/users?limit=50"),
        request<{ items: CertificateRecord[] }>("/certificates?limit=50"),
        Promise.resolve({ monthly: [], recent: [] })
      ]);
      setMetrics(overview.metrics);
      setUsers(userData.items ?? []);
      setCertificates(certificateData.items ?? []);
      setRevenue(revenueData);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load admin data");
    } finally {
      setLoading(false);
    }
  }

  async function uploadPdf(file?: File) {
    if (!file) return "";
    const formData = new FormData();
    formData.append("certificatePdf", file);

    const response = await fetch(`${API_URL}/certificates/upload-pdf`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message ?? "PDF upload failed");
    const url = data.file.url as string;
    return url.startsWith("/uploads/") ? `${apiBase}${url}` : url;
  }

  async function handlePdfChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const url = await uploadPdf(file);
      setCertificateForm((current) => ({ ...current, certificatePdf: url }));
      setNotice("Certificate PDF uploaded.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "PDF upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function createCertificate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...certificateForm,
        certificateId: certificateForm.certificateId.trim().toUpperCase(),
        certificateNumber: certificateForm.certificateNumber.trim() || certificateForm.certificateId.trim().toUpperCase()
      };
      if (editingCertificateId) {
        await request(`/certificates/${encodeURIComponent(editingCertificateId)}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await request("/certificates", { method: "POST", body: JSON.stringify(payload) });
      }
      setCertificateForm(emptyCertificate);
      setEditingCertificateId("");
      setNotice(editingCertificateId ? "Certificate updated." : "Certificate saved to MongoDB.");
      await loadAdminData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Certificate save failed");
    } finally {
      setLoading(false);
    }
  }

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editingUserId) {
        await request(`/users/${editingUserId}`, {
          method: "PUT",
          body: JSON.stringify({
            name: userForm.name,
            username: userForm.username,
            email: userForm.email,
            phone: userForm.phone
          })
        });
        await request(`/users/${editingUserId}/role`, { method: "PUT", body: JSON.stringify({ role: userForm.role }) });
      } else {
        await request("/users", { method: "POST", body: JSON.stringify(userForm) });
      }
      setUserForm({ name: "", username: "", email: "", password: "", phone: "", role: "STAFF", securityPin: "" });
      setEditingUserId("");
      setNotice(editingUserId ? "User updated." : "User created.");
      await loadAdminData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "User save failed");
    } finally {
      setLoading(false);
    }
  }

  async function removeCertificate(id: string) {
    if (!confirm("Delete this certificate?")) return;
    setLoading(true);
    try {
      await request(`/certificates/${encodeURIComponent(id)}`, { method: "DELETE" });
      setNotice("Certificate deleted.");
      await loadAdminData();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  async function removeUser(id: string) {
    if (!confirm("Delete this user?")) return;
    setLoading(true);
    try {
      await request(`/users/${id}`, { method: "DELETE" });
      setNotice("User deleted.");
      await loadAdminData();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  function editUser(user: AdminUser) {
    const id = user._id ?? user.id ?? "";
    setEditingUserId(id);
    setUserForm({
      name: user.name ?? "",
      username: user.username ?? "",
      email: user.email ?? "",
      password: "",
      phone: user.phone ?? "",
      role: user.role ?? "STAFF",
      securityPin: "VJ@123"
    });
    setTab("users");
  }

  function editCertificate(certificate: CertificateRecord) {
    const id = certificate.certificateId || certificate._id || certificate.id || "";
    setEditingCertificateId(id);
    setCertificateForm({
      clientName: certificate.clientName ?? "",
      companyName: certificate.companyName ?? "",
      certificateId: certificate.certificateId ?? "",
      certificateNumber: certificate.certificateNumber ?? "",
      certificateType: certificate.certificateType ?? "",
      certificationScope: certificate.certificationScope ?? "",
      issueDate: certificate.issueDate?.slice(0, 10) ?? "",
      expiryDate: certificate.expiryDate?.slice(0, 10) ?? "",
      status: certificate.status ?? "ACTIVE",
      email: certificate.email ?? "",
      phone: certificate.phone ?? "",
      address: certificate.address ?? "",
      certificatePdf: certificate.certificatePdf ?? ""
    });
    setTab("certificates");
  }

  function downloadExport(kind: "csv" | "xls") {
    const link = document.createElement("a");
    link.href = `${API_URL}/export/certificates.${kind}`;
    link.download = `certificates.${kind}`;
    fetch(link.href, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        if (!response.ok) throw new Error("Export failed");
        const blob = await response.blob();
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch((exportError) => setError(exportError instanceof Error ? exportError.message : "Export failed"));
  }

  const visibleCertificates = certificates.filter((item) => {
    const text = `${item.clientName} ${item.companyName} ${item.certificateId} ${item.certificateNumber}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  if (!token) {
    return (
      <main className="min-h-screen bg-muted/40 px-4 py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
            <CardTitle>VJ Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">Use your admin username and password.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <Input value={loginForm.username} onChange={(event) => setLoginForm({ ...loginForm, username: event.target.value })} placeholder="Username" />
              <Input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} placeholder="Password" />
              {error ? <p className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
              <Button type="submit" disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Login</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">VJ International Certifications</p>
            <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="success">{admin?.role ?? "ADMIN"}</Badge>
            <Button variant="outline" onClick={loadAdminData} disabled={loading}><RefreshCw className="h-4 w-4" /> Refresh</Button>
            <Button variant="destructive" onClick={logout}><LogOut className="h-4 w-4" /> Logout</Button>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:px-8">
          {[
            ["dashboard", LayoutDashboard, "Dashboard"],
            ["users", Users, "Users"],
            ["certificates", FileCheck2, "Certificates"],
            ["exports", Download, "Exports"]
          ].map(([key, Icon, label]) => (
            <Button key={String(key)} variant={tab === key ? "default" : "outline"} onClick={() => setTab(key as Tab)}>
              <Icon className="h-4 w-4" /> {String(label)}
            </Button>
          ))}
        </nav>
      </header>

      <section className="grid gap-5 p-4 lg:p-8">
        {notice ? <p className="rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">{notice}</p> : null}
        {error ? <p className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
        {tab === "dashboard" ? <Dashboard metrics={metrics} /> : null}
        {tab === "users" ? <UsersPanel users={users} userForm={userForm} setUserForm={setUserForm} createUser={createUser} editingUserId={editingUserId} setEditingUserId={setEditingUserId} editUser={editUser} removeUser={removeUser} /> : null}
        {tab === "certificates" ? (
          <CertificatesPanel
            form={certificateForm}
            setForm={setCertificateForm}
            onSubmit={createCertificate}
            onPdfChange={handlePdfChange}
            certificates={visibleCertificates}
            search={search}
            setSearch={setSearch}
            removeCertificate={removeCertificate}
            editCertificate={editCertificate}
            editingCertificateId={editingCertificateId}
            setEditingCertificateId={setEditingCertificateId}
            apiBase={apiBase}
          />
        ) : null}
        {tab === "exports" ? <ExportPanel downloadExport={downloadExport} /> : null}
      </section>
    </main>
  );
}

function Dashboard({ metrics }: { metrics: OverviewMetrics | null }) {
  const cards = [
    ["Total Certifications", metrics?.totalCertifications ?? 0],
    ["Active Certificates", metrics?.activeCertificates ?? 0],
    ["Expired Certificates", metrics?.expiredCertificates ?? 0],
    ["Users", metrics?.users ?? 0]
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map(([label, value]) => (
        <Card key={String(label)}>
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-extrabold">{value}</p>
          </CardContent>
        </Card>
      ))}
      <Card className="md:col-span-2 xl:col-span-3">
        <CardHeader><CardTitle>Certificates by Type</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          {metrics?.byType?.length ? metrics.byType.map((item) => (
            <div key={item._id || "Unknown"} className="flex items-center justify-between rounded-md border p-3">
              <span>{item._id || "Unknown"}</span>
              <strong>{item.count}</strong>
            </div>
          )) : <p className="text-sm text-muted-foreground">No certificate records yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

function UsersPanel({ users, userForm, setUserForm, createUser, editingUserId, setEditingUserId, editUser, removeUser }: {
  users: AdminUser[];
  userForm: { name: string; username: string; email: string; password: string; phone: string; role: string; securityPin: string };
  setUserForm: (value: { name: string; username: string; email: string; password: string; phone: string; role: string; securityPin: string }) => void;
  createUser: (event: FormEvent<HTMLFormElement>) => void;
  editingUserId: string;
  setEditingUserId: (value: string) => void;
  editUser: (user: AdminUser) => void;
  removeUser: (id: string) => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
      <Card>
        <CardHeader><CardTitle>Create User</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={createUser} className="grid gap-3">
            <Input placeholder="Name" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} required />
            <Input placeholder="Username" value={userForm.username} onChange={(e) => setUserForm({ ...userForm, username: e.target.value })} />
            <Input type="email" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} required />
            <Input placeholder="Phone" value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} />
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
              <option>STAFF</option>
              <option>AUDITOR</option>
              <option>CLIENT</option>
              <option>ADMIN</option>
            </select>
            <Input type="password" placeholder={editingUserId ? "Leave blank when editing" : "Password"} value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} required={!editingUserId} />
            {!editingUserId ? <Input placeholder="Security PIN" value={userForm.securityPin} onChange={(e) => setUserForm({ ...userForm, securityPin: e.target.value })} required /> : null}
            <div className="flex gap-2">
              <Button type="submit"><Plus className="h-4 w-4" /> {editingUserId ? "Update User" : "Add User"}</Button>
              {editingUserId ? <Button type="button" variant="outline" onClick={() => setEditingUserId("")}>Cancel</Button> : null}
            </div>
          </form>
        </CardContent>
      </Card>
      <TableCard title="Users">
        {users.map((user) => (
          <div key={user._id ?? user.id ?? user.email} className="grid gap-2 border-b p-4 md:grid-cols-4">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
            <Badge variant={user.role === "ADMIN" ? "warning" : "outline"}>{user.role}</Badge>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => editUser(user)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => removeUser(user._id ?? user.id ?? "")}>Delete</Button>
            </div>
          </div>
        ))}
      </TableCard>
    </div>
  );
}

function CertificatesPanel({ form, setForm, onSubmit, onPdfChange, certificates, search, setSearch, removeCertificate, editCertificate, editingCertificateId, setEditingCertificateId, apiBase }: {
  form: typeof emptyCertificate;
  setForm: (value: typeof emptyCertificate) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onPdfChange: (event: ChangeEvent<HTMLInputElement>) => void;
  certificates: CertificateRecord[];
  search: string;
  setSearch: (value: string) => void;
  removeCertificate: (id: string) => void;
  editCertificate: (certificate: CertificateRecord) => void;
  editingCertificateId: string;
  setEditingCertificateId: (value: string) => void;
  apiBase: string;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[460px_1fr]">
      <Card>
        <CardHeader><CardTitle>Add Certificate</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input placeholder="Client name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required />
            <Input placeholder="Company name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
            <Input placeholder="Certificate ID" value={form.certificateId} onChange={(e) => setForm({ ...form, certificateId: e.target.value })} required />
            <Input placeholder="Certificate number" value={form.certificateNumber} onChange={(e) => setForm({ ...form, certificateNumber: e.target.value })} />
            <Input placeholder="Certificate type" value={form.certificateType} onChange={(e) => setForm({ ...form, certificateType: e.target.value })} required />
            <Textarea placeholder="Certification scope" value={form.certificationScope} onChange={(e) => setForm({ ...form, certificationScope: e.target.value })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} required />
              <Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} required />
            </div>
            <Textarea placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input type="file" accept="application/pdf" onChange={onPdfChange} />
            <Input placeholder="Certificate PDF URL" value={form.certificatePdf} onChange={(e) => setForm({ ...form, certificatePdf: e.target.value })} />
            <div className="flex gap-2">
              <Button type="submit"><Plus className="h-4 w-4" /> {editingCertificateId ? "Update Certificate" : "Save Certificate"}</Button>
              {editingCertificateId ? <Button type="button" variant="outline" onClick={() => setEditingCertificateId("")}>Cancel</Button> : null}
            </div>
          </form>
        </CardContent>
      </Card>
      <TableCard title="Certificate Management" action={<div className="relative w-full max-w-sm"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search certificates" value={search} onChange={(e) => setSearch(e.target.value)} /></div>}>
        {certificates.map((certificate) => {
          const id = certificate.certificateId || certificate._id || certificate.id || certificate.certificateNumber;
          const pdf = certificate.certificatePdf?.startsWith("/uploads/") ? `${apiBase}${certificate.certificatePdf}` : certificate.certificatePdf;
          return (
            <div key={id} className="grid gap-3 border-b p-4 xl:grid-cols-[1.2fr_1fr_0.8fr_0.8fr_auto] xl:items-center">
              <div>
                <strong>{certificate.companyName}</strong>
                <p className="text-sm text-muted-foreground">{certificate.clientName}</p>
              </div>
              <span>{certificate.certificateId}</span>
              <span>{certificate.certificateType}</span>
              <Badge variant={certificate.status === "ACTIVE" ? "success" : "warning"}>{certificate.status}</Badge>
              <div className="flex gap-2">
                {pdf ? <Button asChild size="sm" variant="outline"><a href={pdf} target="_blank" rel="noreferrer">PDF</a></Button> : null}
                <Button size="sm" variant="outline" onClick={() => editCertificate(certificate)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => removeCertificate(id)}>Delete</Button>
              </div>
            </div>
          );
        })}
      </TableCard>
    </div>
  );
}

function RevenuePanel({ revenue }: { revenue: { monthly: Array<{ month: string; total: number; count: number }>; recent: Array<Record<string, unknown>> } }) {
  const max = Math.max(...revenue.monthly.map((item) => item.total), 1);
  return (
    <div className="grid gap-5">
      <Card>
        <CardHeader><CardTitle>Revenue Overview</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          {revenue.monthly.length ? revenue.monthly.map((item) => (
            <div key={item.month}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{item.month}</span>
                <strong>{formatCurrency(item.total)}</strong>
              </div>
              <div className="h-3 rounded-full bg-muted">
                <div className="h-3 rounded-full bg-primary" style={{ width: `${Math.max((item.total / max) * 100, 4)}%` }} />
              </div>
            </div>
          )) : <p className="text-muted-foreground">No paid revenue records yet.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

function ExportPanel({ downloadExport }: { downloadExport: (kind: "csv" | "xls") => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {(["csv", "xls"] as const).map((kind) => (
        <Card key={kind}>
          <CardContent className="grid gap-4 p-6">
            <Download className="h-8 w-8 text-primary" />
            <h2 className="text-xl font-bold">{kind === "csv" ? "CSV Export" : "Excel Export"}</h2>
            <p className="text-sm text-muted-foreground">Download certificate records from MongoDB.</p>
            <Button onClick={() => downloadExport(kind)}>Download</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TableCard({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <CardTitle>{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-b-lg">{children}</div>
      </CardContent>
    </Card>
  );
}
