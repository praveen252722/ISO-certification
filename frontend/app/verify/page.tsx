"use client";

import { useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { CheckCircle2, Search, ShieldAlert } from "lucide-react";
import { PublicLayout } from "@/components/site/public-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { certificates } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function VerifyPage() {
  const [query, setQuery] = useState("ISO-2026-9001-1842");
  const result = useMemo(
    () => certificates.find((certificate) => certificate.number.toLowerCase() === query.trim().toLowerCase()),
    [query]
  );

  return (
    <PublicLayout>
      <section className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="success">Public certificate verification</Badge>
          <h1 className="mt-4 text-4xl font-extrabold tracking-normal">Verify Certificate</h1>
          <p className="mt-4 text-muted-foreground">Search by certificate number or scan the QR code printed on the certificate.</p>
          <div className="mt-8 flex gap-2">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ISO-2026-9001-1842" />
            <Button><Search className="h-4 w-4" /> Search</Button>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          {result ? (
            <Card>
              <CardContent className="grid gap-8 p-6 md:grid-cols-[1fr_220px]">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-700">Certificate is valid</p>
                      <h2 className="text-2xl font-extrabold">{result.company}</h2>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Info label="Certificate Number" value={result.number} />
                    <Info label="Certification Type" value={result.type} />
                    <Info label="Issue Date" value={formatDate(result.issueDate)} />
                    <Info label="Expiry Date" value={formatDate(result.expiryDate)} />
                    <Info label="Status" value={result.status} />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border bg-muted p-4">
                  <QRCodeCanvas value={`https://verify.example/certificates/${result.number}`} size={160} />
                  <p className="mt-3 text-center text-xs text-muted-foreground">QR verification ready for PDF certificates</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldAlert className="text-destructive" /> Certificate not found</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">Check the certificate number and try again.</CardContent>
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
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}
