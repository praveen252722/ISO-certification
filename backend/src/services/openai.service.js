import OpenAI from "openai";
import { env } from "../config/env.js";

const client = env.openaiApiKey ? new OpenAI({ apiKey: env.openaiApiKey }) : null;

export async function generateAuditSummary({ notes, findings }) {
  if (!client) {
    return "AI provider is not configured. Summary placeholder: review audit notes, confirm findings, and assign corrective actions.";
  }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Create concise ISO audit summaries with risks, strengths, and corrective actions." },
      { role: "user", content: JSON.stringify({ notes, findings }) }
    ]
  });

  return response.choices[0]?.message?.content ?? "";
}
