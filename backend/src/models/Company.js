import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    legalName: { type: String, trim: true },
    registrationNumber: { type: String, trim: true },
    industry: { type: String, trim: true },
    website: String,
    address: {
      line1: String,
      city: String,
      state: String,
      country: { type: String, default: "India" },
      postalCode: String
    },
    primaryContact: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    documents: [
      {
        name: String,
        url: String,
        type: String,
        uploadedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

companySchema.index({ name: "text", industry: "text" });

export const Company = mongoose.model("Company", companySchema);
