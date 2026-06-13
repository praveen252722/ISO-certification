import mongoose from "mongoose";

function slugify(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    companyName: String,
    certificationType: String,
    summary: String,
    imageUrl: String,
    certifiedDate: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

projectSchema.index({ title: "text", summary: "text", companyName: "text" });

projectSchema.pre("validate", function setProjectSlug(next) {
  if (!this.slug && this.title) {
    const baseSlug = slugify(this.title) || "certified-organization";
    this.slug = `${baseSlug}-${Date.now().toString(36)}`;
  }
  next();
});

export const Project = mongoose.model("Project", projectSchema);
