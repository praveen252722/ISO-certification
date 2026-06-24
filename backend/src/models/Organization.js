import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    publicId: { type: String, trim: true },
    certificationDate: { type: Date },
    status: { type: String, enum: ["Certified", "Active"], default: "Certified", index: true }
  },
  { timestamps: true }
);

organizationSchema.index({ title: "text", description: "text" });

export const Organization = mongoose.model("Organization", organizationSchema);
