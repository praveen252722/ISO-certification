import slugify from "slugify";
import { Project } from "../models/Project.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listProjects = asyncHandler(async (_req, res) => {
  const items = await Project.find({ isPublished: true }).sort("-createdAt");
  res.json({ success: true, items });
});

export const adminListProjects = asyncHandler(async (_req, res) => {
  const items = await Project.find().sort("-createdAt");
  res.json({ success: true, items });
});

export const upsertProject = asyncHandler(async (req, res) => {
  const payload = {
    title: req.body.title,
    slug: req.body.slug ?? slugify(req.body.title, { lower: true, strict: true }),
    companyName: req.body.companyName,
    certificationType: req.body.certificationType,
    summary: req.body.summary,
    imageUrl: req.body.imageUrl,
    isPublished: req.body.isPublished ?? true
  };

  const project = req.params.id
    ? await Project.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    : await Project.create(payload);

  res.status(req.params.id ? 200 : 201).json({ success: true, project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
