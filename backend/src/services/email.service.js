import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export async function sendEmail({ to, subject, html }) {
  if (!env.smtp.host) return { provider: "mock", status: "queued", to, subject };

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined
  });

  return transporter.sendMail({ from: env.smtp.from, to, subject, html });
}
