import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    certificationType: { type: String, required: true, index: true },
    scope: { type: String, required: true },
    sites: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "CHANGES_REQUESTED", "AUDIT_SCHEDULED", "APPROVED", "REJECTED"],
      default: "SUBMITTED",
      index: true
    },
    requiredDocuments: [
      {
        name: String,
        status: { type: String, enum: ["PENDING", "UPLOADED", "APPROVED", "REJECTED"], default: "PENDING" },
        fileUrl: String
      }
    ],
    assignedAuditor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewNotes: String,
    submittedAt: { type: Date, default: Date.now },
    approvedAt: Date
  },
  { timestamps: true }
);

applicationSchema.index({ certificationType: "text", scope: "text" });

export const Application = mongoose.model("Application", applicationSchema);
