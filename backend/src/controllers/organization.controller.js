import { Organization } from "../models/Organization.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

function organizationPayload(body) {
  const payload = {
    title: body.title?.trim(),
    description: body.description?.trim(),
    imageUrl: body.imageUrl?.trim(),
    imageUrl2: body.imageUrl2?.trim(),
    status: body.status
  };

  if (body.certificationDate) payload.certificationDate = body.certificationDate;

  Object.keys(payload).forEach((key) => {
    if (payload[key] === "" || payload[key] === undefined) delete payload[key];
  });

  return payload;
}

export const listOrganizations = asyncHandler(async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit ?? 30), 1), 100);
  const items = await Organization.find()
    .sort({ certificationDate: -1, createdAt: -1 })
    .limit(limit);

  res.json({ success: true, items });
});

export const listAdminOrganizations = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page ?? 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit ?? 50), 1), 100);
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.search) {
    const search = String(req.query.search).trim();
    filter.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") }
    ];
  }

  const [items, total] = await Promise.all([
    Organization.find(filter).sort({ certificationDate: -1, createdAt: -1 }).skip(skip).limit(limit),
    Organization.countDocuments(filter)
  ]);

  res.json({ success: true, page, limit, total, items });
});

export const uploadOrganizationImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Organization image file is required");

  const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer, "organizations");

  res.status(201).json({
    success: true,
    file: {
      url: imageUrl,
      publicId,
      originalName: req.file.originalname
    }
  });
});

export const createOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.create(organizationPayload(req.body));
  res.status(201).json({ success: true, organization });
});

export const updateOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findByIdAndUpdate(req.params.id, organizationPayload(req.body), {
    new: true,
    runValidators: true
  });

  if (!organization) throw new ApiError(404, "Organization not found");
  res.json({ success: true, organization });
});

export const uploadOrganizationImage2 = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Organization image file is required");

  const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer, "organizations");

  res.status(201).json({
    success: true,
    file: {
      url: imageUrl,
      publicId,
      originalName: req.file.originalname
    }
  });
});

export const deleteOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findByIdAndDelete(req.params.id);

  if (!organization) throw new ApiError(404, "Organization not found");
  res.json({ success: true, message: "Organization deleted successfully" });
});
