import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateNumber: { type: String, required: true, unique: true, index: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    certificationType: { type: String, required: true, index: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true, index: true },
    status: { type: String, enum: ["ACTIVE", "EXPIRED", "SUSPENDED", "REVOKED"], default: "ACTIVE", index: true },
    qrCodeUrl: String,
    pdfUrl: String,
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const Certificate = mongoose.model("Certificate", certificateSchema);
