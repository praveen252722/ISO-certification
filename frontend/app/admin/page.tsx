"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Building2, Download, FileCheck2, ImageIcon, LayoutDashboard, Loader2, LogOut, Plus, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL, apiClient } from "@/services/api";

type Tab = "dashboard" | "certificates" | "organizations";

interface CertificateRecord {
  _id?: string;
  id?: string;
  clientName: string;
  companyName: string;
  certificateNumber: string;
  certificateType: string;
  certificationScope?: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface OrganizationRecord {
  _id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  certificationDate?: string;
  status: string;
}

interface OverviewMetrics {
  totalCertifications: number;
  activeCertificates: number;
  expiredCertificates: number;
  byType: Array<{ _id: string; count: number }>;
}

const emptyCertificate = {
  clientName: "",
  companyName: "",
  certificateNumber: "",
  certificateType: "ISO 9001:2015",
  certificationScope: "",
  issueDate: "",
  expiryDate: "",
  status: "ACTIVE",
  email: "",
  phone: "",
  address: ""
};

const emptyOrganization = {
  title: "",
  description: "",
  imageUrl: "",
  certificationDate: "",
  status: "Certified"
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState<{ name: string; email: string; role: string } | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [certificateForm, setCertificateForm] = useState(emptyCertificate);
  const [editingCertificateId, setEditingCertificateId] = useState("");
  const [search, setSearch] = useState("");
  const [organizations, setOrganizations] = useState<OrganizationRecord[]>([]);
  const [organizationForm, setOrganizationForm] = useState(emptyOrganization);
  const [editingOrganizationId, setEditingOrganizationId] = useState("");

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
      const data = await apiClient<{ token: string; user: { name: string; email: string; role: string } }>("/auth/admin-login", {
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
      const [overview, certificateData, organizationData] = await Promise.all([
        request<{ metrics: OverviewMetrics }>("/analytics/overview"),
        request<{ items: CertificateRecord[] }>("/certificates?limit=50"),
        request<{ items: OrganizationRecord[] }>("/organizations/admin?limit=50")
      ]);
      setMetrics(overview.metrics);
      setCertificates(certificateData.items ?? []);
      setOrganizations(organizationData.items ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load admin data");
    } finally {
      setLoading(false);
    }
  }

  async function createCertificate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...certificateForm };
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

  function editCertificate(certificate: CertificateRecord) {
    const id = certificate._id || certificate.id || certificate.certificateNumber || "";
    setEditingCertificateId(id);
    setCertificateForm({
      clientName: certificate.clientName ?? "",
      companyName: certificate.companyName ?? "",
      certificateNumber: certificate.certificateNumber ?? "",
      certificateType: certificate.certificateType ?? "",
      certificationScope: certificate.certificationScope ?? "",
      issueDate: certificate.issueDate?.slice(0, 10) ?? "",
      expiryDate: certificate.expiryDate?.slice(0, 10) ?? "",
      status: certificate.status ?? "ACTIVE",
      email: certificate.email ?? "",
      phone: certificate.phone ?? "",
      address: certificate.address ?? ""
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

  async function uploadOrganizationImage(file?: File) {
    if (!file) return "";
    const formData = new FormData();
    formData.append("organizationImage", file);

    const response = await fetch(`${API_URL}/organizations/upload-image`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message ?? "Image upload failed");
    return data.file.url as string;
  }

  async function handleOrganizationImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const url = await uploadOrganizationImage(file);
      setOrganizationForm((current) => ({ ...current, imageUrl: url }));
      setNotice("Organization image uploaded.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function saveOrganization(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...organizationForm };
      if (editingOrganizationId) {
        await request(`/organizations/${editingOrganizationId}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await request("/organizations", { method: "POST", body: JSON.stringify(payload) });
      }
      setOrganizationForm(emptyOrganization);
      setEditingOrganizationId("");
      setNotice(editingOrganizationId ? "Organization updated." : "Organization created.");
      await loadAdminData();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Organization save failed");
    } finally {
      setLoading(false);
    }
  }

  function editOrganization(org: OrganizationRecord) {
    setEditingOrganizationId(org._id ?? "");
    setOrganizationForm({
      title: org.title ?? "",
      description: org.description ?? "",
      imageUrl: org.imageUrl ?? "",
      certificationDate: org.certificationDate?.slice(0, 10) ?? "",
      status: org.status ?? "Certified"
    });
    setTab("organizations");
  }

  async function removeOrganization(id: string) {
    if (!confirm("Delete this organization?")) return;
    setLoading(true);
    try {
      await request(`/organizations/${id}`, { method: "DELETE" });
      setNotice("Organization deleted.");
      await loadAdminData();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  const visibleCertificates = certificates.filter((item) => {
    const text = `${item.clientName} ${item.companyName} ${item.certificateNumber}`.toLowerCase();
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
            ["certificates", FileCheck2, "Certificates"],
            ["organizations", Building2, "Organizations"]
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
        {tab === "certificates" ? (
          <CertificatesPanel
            form={certificateForm}
            setForm={setCertificateForm}
            onSubmit={createCertificate}
            certificates={visibleCertificates}
            search={search}
            setSearch={setSearch}
            removeCertificate={removeCertificate}
            editCertificate={editCertificate}
            editingCertificateId={editingCertificateId}
            setEditingCertificateId={setEditingCertificateId}
            onExport={downloadExport}
          />
        ) : null}
        {tab === "organizations" ? (
          <OrganizationsPanel
            form={organizationForm}
            setForm={setOrganizationForm}
            onSubmit={saveOrganization}
            onImageChange={handleOrganizationImageChange}
            organizations={organizations}
            removeOrganization={removeOrganization}
            editOrganization={editOrganization}
            editingOrganizationId={editingOrganizationId}
            setEditingOrganizationId={setEditingOrganizationId}
          />
        ) : null}
      </section>
    </main>
  );
}

function Dashboard({ metrics }: { metrics: OverviewMetrics | null }) {
  const cards = [
    ["Total Certifications", metrics?.totalCertifications ?? 0],
    ["Active Certificates", metrics?.activeCertificates ?? 0],
    ["Expired Certificates", metrics?.expiredCertificates ?? 0]
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

function CertificatesPanel({ form, setForm, onSubmit, certificates, search, setSearch, removeCertificate, editCertificate, editingCertificateId, setEditingCertificateId, onExport }: {
  form: typeof emptyCertificate;
  setForm: (value: typeof emptyCertificate) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  certificates: CertificateRecord[];
  search: string;
  setSearch: (value: string) => void;
  removeCertificate: (id: string) => void;
  editCertificate: (certificate: CertificateRecord) => void;
  editingCertificateId: string;
  setEditingCertificateId: (value: string) => void;
  onExport?: (kind: "csv" | "xls") => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[460px_1fr]">
      <Card>
        <CardHeader><CardTitle>Add Certificate</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input placeholder="Client name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required />
            <Input placeholder="Company name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
            <Input placeholder="Certificate number" value={form.certificateNumber} onChange={(e) => setForm({ ...form, certificateNumber: e.target.value })} required />
            <Input placeholder="Certificate type" value={form.certificateType} onChange={(e) => setForm({ ...form, certificateType: e.target.value })} required />
            <Textarea placeholder="Certification scope" value={form.certificationScope} onChange={(e) => setForm({ ...form, certificationScope: e.target.value })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} required />
              <Input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} required />
            </div>
            <Textarea placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <div className="flex gap-2">
              <Button type="submit"><Plus className="h-4 w-4" /> {editingCertificateId ? "Update Certificate" : "Save Certificate"}</Button>
              {editingCertificateId ? <Button type="button" variant="outline" onClick={() => setEditingCertificateId("")}>Cancel</Button> : null}
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certificate Management</CardTitle>
          <div className="flex items-center gap-2">
            {onExport ? <Button size="sm" variant="outline" onClick={() => onExport("xls")}><Download className="h-4 w-4" /> Export</Button> : null}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="w-48 pl-9" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-b-lg">
            {certificates.map((certificate) => {
              const id = certificate._id || certificate.id || certificate.certificateNumber;
              return (
                <div key={id} className="grid gap-3 border-b p-4 xl:grid-cols-[1.2fr_1fr_0.8fr_auto] xl:items-center">
                  <div>
                    <strong>{certificate.companyName}</strong>
                    <p className="text-sm text-muted-foreground">{certificate.clientName}</p>
                  </div>
                  <span>{certificate.certificateType}</span>
                  <Badge variant={certificate.status === "ACTIVE" ? "success" : "warning"}>{certificate.status}</Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => editCertificate(certificate)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => removeCertificate(id)}>Delete</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function OrganizationsPanel({ form, setForm, onSubmit, onImageChange, organizations, removeOrganization, editOrganization, editingOrganizationId, setEditingOrganizationId }: {
  form: typeof emptyOrganization;
  setForm: (value: typeof emptyOrganization) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  organizations: OrganizationRecord[];
  removeOrganization: (id: string) => void;
  editOrganization: (org: OrganizationRecord) => void;
  editingOrganizationId: string;
  setEditingOrganizationId: (value: string) => void;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-[460px_1fr]">
      <Card>
        <CardHeader><CardTitle>{editingOrganizationId ? "Edit Organization" : "Add Organization"}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input type="file" accept="image/png,image/jpeg" onChange={onImageChange} />
            {form.imageUrl ? <p className="truncate text-xs text-muted-foreground">{form.imageUrl}</p> : null}
            <Input type="date" value={form.certificationDate} onChange={(e) => setForm({ ...form, certificationDate: e.target.value })} />
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Certified</option>
              <option>Active</option>
            </select>
            <div className="flex gap-2">
              <Button type="submit"><Plus className="h-4 w-4" /> {editingOrganizationId ? "Update Organization" : "Save Organization"}</Button>
              {editingOrganizationId ? <Button type="button" variant="outline" onClick={() => setEditingOrganizationId("")}>Cancel</Button> : null}
            </div>
          </form>
        </CardContent>
      </Card>
      <TableCard title="Organizations">
        {organizations.map((org) => {
          const image = org.imageUrl;
          return (
            <div key={org._id} className="grid gap-3 border-b p-4 xl:grid-cols-[1.2fr_1fr_0.8fr_auto] xl:items-center">
              <div>
                <strong>{org.title}</strong>
                {org.description ? <p className="truncate text-sm text-muted-foreground">{org.description}</p> : null}
              </div>
              <span className="text-sm text-muted-foreground">{org.certificationDate ? new Date(org.certificationDate).toLocaleDateString() : "-"}</span>
              <Badge variant={org.status === "Certified" ? "success" : "outline"}>{org.status}</Badge>
              <div className="flex gap-2">
                {image ? <Button asChild size="sm" variant="outline"><a href={image} target="_blank" rel="noreferrer"><ImageIcon className="h-4 w-4" /></a></Button> : null}
                <Button size="sm" variant="outline" onClick={() => editOrganization(org)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => removeOrganization(org._id ?? "")}>Delete</Button>
              </div>
            </div>
          );
        })}
      </TableCard>
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
