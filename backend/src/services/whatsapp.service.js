import twilio from "twilio";
import { env } from "../config/env.js";

export async function sendWhatsAppMessage({ to, message }) {
  if (!env.whatsapp.accountSid || !env.whatsapp.authToken || !env.whatsapp.from) {
    return { provider: "mock", status: "queued", to, message };
  }

  const client = twilio(env.whatsapp.accountSid, env.whatsapp.authToken);
  return client.messages.create({
    from: env.whatsapp.from,
    to: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
    body: message
  });
}

export function renewalReminderTemplate({ companyName, certificateNumber, expiryDate }) {
  return `ISO renewal reminder: ${companyName}, certificate ${certificateNumber} expires on ${new Date(expiryDate).toDateString()}. Please upload renewal documents.`;
}

export function auditReminderTemplate({ companyName, scheduledAt }) {
  return `ISO audit reminder: ${companyName}, your audit is scheduled on ${new Date(scheduledAt).toLocaleString()}.`;
}
