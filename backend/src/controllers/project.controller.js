import { Project } from "../models/Project.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listProjects = asyncHandler(async (_req, res) => {
  const items = await Project.find({ isPublished: true }).sort("-createdAt");
  res.json({ success: true, items });
});
