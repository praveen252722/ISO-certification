"use client";

import { FormEvent, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InquiryFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  isoType: string;
  message: string;
}

const initialValues: InquiryFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  isoType: "",
  message: ""
};

export function InquiryForm({ buttonLabel = "Submit enquiry" }: { buttonLabel?: string }) {
  const [formData, setFormData] = useState<InquiryFormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof InquiryFormValues, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setFormData(initialValues);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-5 xl:grid-cols-2">
        <Input
          name="name"
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Full name"
          required
        />
        <Input
          name="company"
          value={formData.company}
          onChange={(event) => updateField("company", event.target.value)}
          placeholder="Company name"
          required
        />
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="Email address"
          required
        />
        <Input
          name="phone"
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="Phone number"
          required
        />
      </div>
      <Input
        name="isoType"
        value={formData.isoType}
        onChange={(event) => updateField("isoType", event.target.value)}
        placeholder="ISO type, e.g. ISO 9001"
        required
      />
      <Textarea
        name="message"
        value={formData.message}
        onChange={(event) => updateField("message", event.target.value)}
        placeholder="Tell us about your certification requirement"
        className="min-h-32"
        required
      />
      <Button type="submit" className="h-11 w-full">
        <MessageSquareText className="h-4 w-4" /> {buttonLabel}
      </Button>
      {submitted ? <p className="rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">Inquiry received locally for Phase 1.</p> : null}
    </form>
  );
}
