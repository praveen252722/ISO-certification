import { Audit } from "../models/Audit.js";
import { generateAuditSummary } from "../services/openai.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listAudits = asyncHandler(async (_req, res) => {
  const items = await Audit.find().populate("application company auditor").sort("-scheduledAt").limit(100);
  res.json({ success: true, items });
});

export const createAudit = asyncHandler(async (req, res) => {
  const audit = await Audit.create(req.body);
  res.status(201).json({ success: true, audit });
});

export const updateAudit = asyncHandler(async (req, res) => {
  const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.json({ success: true, audit });
});

export const summarizeAudit = asyncHandler(async (req, res) => {
  const audit = await Audit.findById(req.params.id);
  const summary = await generateAuditSummary({ notes: audit.notes, findings: audit.findings });
  audit.aiSummary = summary;
  await audit.save();
  res.json({ success: true, summary });
});
