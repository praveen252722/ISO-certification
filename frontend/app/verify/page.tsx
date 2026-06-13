"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Download, Search, ShieldAlert, XCircle } from "lucide-react";
import { PublicLayout } from "@/components/site/public-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_URL, apiClient } from "@/services/api";
import { formatDate } from "@/lib/utils";

interface CertificateRecord {
  clientName?: string;
  companyName?: string;
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
  downloadUrl?: string;
}

interface VerifyResponse {
  certificate: CertificateRecord;
}

function isValid(certificate: CertificateRecord) {
  return certificate.status === "ACTIVE" && new Date(certificate.expiryDate) >= new Date();
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyLoading />}>
      <VerifyCertificateContent />
    </Suspense>
  );
}

function VerifyLoading() {
  return (
    <PublicLayout>
      <section className="container py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">Verify Certificate</h1>
        <p className="mt-4 text-muted-foreground">Loading verification form...</p>
      </section>
    </PublicLayout>
  );
}

function VerifyCertificateContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("certificateId") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<CertificateRecord | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const downloadUrl = useMemo(() => {
    if (!result) return "";
    const path = result.downloadUrl ?? `/api/v1/certificates/${result.certificateId}/download`;
    return path.startsWith("http") ? path : `${API_URL.replace(/\/api\/v1$/, "")}${path}`;
  }, [result]);

  async function searchCertificate(value = query) {
    const certificateId = value.trim();
    if (!certificateId) {
      setError("Enter a certificate ID.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiClient<VerifyResponse>(`/certificates/verify/${encodeURIComponent(certificateId)}`);
      setResult(data.certificate);
    } catch (requestError) {
      setResult(null);
      setError(requestError instanceof Error ? requestError.message : "Certificate not found");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void searchCertificate();
  }

  useEffect(() => {
    if (initialQuery) void searchCertificate(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const valid = result ? isValid(result) : false;

  return (
    <PublicLayout>
      <section className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="success">Public certificate verification</Badge>
          <h1 className="mt-4 text-4xl font-extrabold tracking-normal">Verify Certificate</h1>
          <p className="mt-4 text-muted-foreground">Search by certificate ID to verify a certificate and download the uploaded PDF.</p>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Enter certificate ID" />
            <Button type="submit" disabled={loading}>
              <Search className="h-4 w-4" /> {loading ? "Searching" : "Search"}
            </Button>
          </form>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          {result ? (
            <Card className="overflow-hidden">
              <div className={`flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white ${valid ? "bg-emerald-600" : "bg-red-600"}`}>
                {valid ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {valid ? "Certificate Valid" : "Certificate Invalid"}
              </div>
              <CardContent className="grid gap-8 p-6 md:grid-cols-[1fr_240px]">
                <div>
                  <h2 className="text-2xl font-extrabold">{result.companyName || result.clientName}</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Info label="Client Name" value={result.clientName ?? "Not provided"} />
                    <Info label="Company Name" value={result.companyName ?? "Not provided"} />
                    <Info label="Certificate ID" value={result.certificateId} />
                    <Info label="Certificate Number" value={result.certificateNumber} />
                    <Info label="Certificate Type" value={result.certificateType} />
                    <Info label="Issue Date" value={formatDate(result.issueDate)} />
                    <Info label="Expiry Date" value={formatDate(result.expiryDate)} />
                    <Info label="Status" value={result.status} />
                    <Info label="Address" value={result.address ?? "Not provided"} />
                  </div>
                  {result.certificationScope ? (
                    <div className="mt-4 rounded-md border bg-background p-4">
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Certification Scope</p>
                      <p className="mt-1 leading-7">{result.certificationScope}</p>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border bg-muted p-4 text-center">
                  <Download className="h-14 w-14 text-primary" />
                  <p className="mt-3 text-sm text-muted-foreground">View or download the uploaded certificate PDF.</p>
                  <Button asChild className="mt-4 w-full">
                    <a href={downloadUrl} target="_blank" rel="noreferrer">
                      <Download className="h-4 w-4" /> View PDF
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="text-destructive" /> {error || "Search for a certificate"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {error ? "Certificate is invalid or not found." : "Enter the certificate ID printed on the certificate."}
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-background p-4">
      <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 break-words font-bold">{value}</p>
    </div>
  );
}
