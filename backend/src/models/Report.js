import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["AUDIT", "REVENUE", "CLIENT", "COMPLIANCE"], required: true, index: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    audit: { type: mongoose.Schema.Types.ObjectId, ref: "Audit" },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileUrl: String,
    summary: String,
    data: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
