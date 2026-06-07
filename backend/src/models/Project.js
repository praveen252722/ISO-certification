import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    companyName: String,
    certificationType: String,
    summary: String,
    imageUrl: String,
    isPublished: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
