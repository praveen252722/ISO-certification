import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    clientName: { type: String, trim: true, index: true },
    companyName: { type: String, trim: true, index: true },
    certificateNumber: { type: String, required: true, unique: true, trim: true, index: true },
    certificateType: { type: String, trim: true, index: true },
    certificationType: { type: String, trim: true, index: true },
    certificationScope: { type: String, trim: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true, index: true },
    status: { type: String, enum: ["ACTIVE", "EXPIRED", "SUSPENDED", "REVOKED", "PENDING"], default: "ACTIVE", index: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    auditorName: { type: String, trim: true },
    remarks: { type: String, trim: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", index: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

certificateSchema.index({ clientName: "text", companyName: "text", certificateNumber: "text" });

certificateSchema.pre("validate", function normalizeCertificateFields(next) {
  if (!this.certificateType && this.certificationType) this.certificateType = this.certificationType;
  if (!this.certificationType && this.certificateType) this.certificationType = this.certificateType;
  return next();
});

export const Certificate = mongoose.model("Certificate", certificateSchema);
