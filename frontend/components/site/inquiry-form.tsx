"use client";

import { FormEvent, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "918341864446";

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

export function InquiryForm({ buttonLabel = "Submit enquiry on WhatsApp" }: { buttonLabel?: string }) {
  const [formData, setFormData] = useState<InquiryFormValues>(initialValues);

  function updateField(field: keyof InquiryFormValues, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const whatsappMessage = `New ISO Certification Inquiry

Name: ${formData.name}
Company: ${formData.company}
Email: ${formData.email}
Phone: ${formData.phone}
ISO Type: ${formData.isoType}

Message:
${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
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
        placeholder="Phone or WhatsApp number"
        required
      />
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
        placeholder="Your requirement"
        required
      />
      <Button type="submit">
        <MessageSquareText className="h-4 w-4" /> {buttonLabel}
      </Button>
    </form>
  );
}
