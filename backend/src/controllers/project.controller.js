import { Project } from "../models/Project.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

function projectLookup(value) {
  if (/^[a-f\d]{24}$/i.test(value)) return { _id: value };
  return { slug: value };
}

function projectPayload(body) {
  const payload = {
    title: body.title?.trim(),
    companyName: body.companyName?.trim(),
    certificationType: body.certificationType?.trim(),
    summary: (body.summary ?? body.description)?.trim(),
    imageUrl: body.imageUrl?.trim(),
    isPublished: body.isPublished
  };

  if (body.certifiedDate) payload.certifiedDate = body.certifiedDate;

  Object.keys(payload).forEach((key) => {
    if (payload[key] === "" || payload[key] === undefined) delete payload[key];
  });

  return payload;
}

export const listProjects = asyncHandler(async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit ?? 30), 1), 100);
  const items = await Project.find({ isPublished: true })
    .sort({ certifiedDate: -1, createdAt: -1 })
    .limit(limit);

  res.json({ success: true, items });
});

export const listAdminProjects = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page ?? 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit ?? 50), 1), 100);
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.search) {
    const search = String(req.query.search).trim();
    filter.$or = [
      { title: new RegExp(search, "i") },
      { summary: new RegExp(search, "i") },
      { companyName: new RegExp(search, "i") },
      { certificationType: new RegExp(search, "i") }
    ];
  }

  const [items, total] = await Promise.all([
    Project.find(filter).sort({ certifiedDate: -1, createdAt: -1 }).skip(skip).limit(limit),
    Project.countDocuments(filter)
  ]);

  res.json({ success: true, page, limit, total, items });
});

export const uploadProjectImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Project image file is required");

  const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer, "projects");

  res.status(201).json({
    success: true,
    file: {
      url: imageUrl,
      publicId,
      originalName: req.file.originalname
    }
  });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(projectPayload(req.body));
  res.status(201).json({ success: true, project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndUpdate(projectLookup(req.params.id), projectPayload(req.body), {
    new: true,
    runValidators: true
  });

  if (!project) throw new ApiError(404, "Project not found");
  res.json({ success: true, project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndDelete(projectLookup(req.params.id));

  if (!project) throw new ApiError(404, "Project not found");
  res.json({ success: true, message: "Project deleted successfully" });
});
