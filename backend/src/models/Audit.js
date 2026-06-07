import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true, index: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    auditor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    scheduledAt: { type: Date, required: true, index: true },
    type: { type: String, enum: ["STAGE_1", "STAGE_2", "SURVEILLANCE", "RENEWAL"], default: "STAGE_1" },
    status: { type: String, enum: ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"], default: "SCHEDULED", index: true },
    findings: [
      {
        clause: String,
        severity: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"], default: "LOW" },
        description: String,
        correctiveAction: String,
        status: { type: String, enum: ["OPEN", "CLOSED"], default: "OPEN" }
      }
    ],
    notes: String,
    aiSummary: String,
    timeline: [{ label: String, actor: String, timestamp: { type: Date, default: Date.now } }]
  },
  { timestamps: true }
);

export const Audit = mongoose.model("Audit", auditSchema);
