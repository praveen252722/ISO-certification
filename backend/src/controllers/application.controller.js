import { Application } from "../models/Application.js";
import { Company } from "../models/Company.js";
import { ActivityLog } from "../models/ActivityLog.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination } from "../utils/pagination.js";

export const listApplications = asyncHandler(async (req, res) => {
  const { skip, limit, page } = getPagination(req.query);
  const filter = req.query.status ? { status: req.query.status } : {};
  const [items, total] = await Promise.all([
    Application.find(filter).populate("company client assignedAuditor").sort("-createdAt").skip(skip).limit(limit),
    Application.countDocuments(filter)
  ]);
  res.json({ success: true, page, total, items });
});

export const createApplication = asyncHandler(async (req, res) => {
  const company = await Company.create({ name: req.body.companyName, primaryContact: req.user._id, industry: req.body.industry });
  const application = await Application.create({
    company: company._id,
    client: req.user._id,
    certificationType: req.body.certificationType,
    scope: req.body.scope,
    sites: req.body.sites,
    requiredDocuments: req.body.requiredDocuments ?? []
  });
  await ActivityLog.create({ actor: req.user._id, action: "APPLICATION_CREATED", entity: "Application", entityId: application._id });
  res.status(201).json({ success: true, application });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) throw new ApiError(404, "Application not found");
  application.status = req.body.status;
  application.reviewNotes = req.body.reviewNotes;
  if (req.body.status === "APPROVED") application.approvedAt = new Date();
  await application.save();
  res.json({ success: true, application });
});
