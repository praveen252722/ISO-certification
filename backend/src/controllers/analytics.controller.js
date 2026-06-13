import { Certificate } from "../models/Certificate.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getOverview = asyncHandler(async (_req, res) => {
  const [totalCertificates, activeCertificates, expiredCertificates, users, byType] = await Promise.all([
    Certificate.countDocuments(),
    Certificate.countDocuments({ status: "ACTIVE" }),
    Certificate.countDocuments({ $or: [{ status: "EXPIRED" }, { expiryDate: { $lt: new Date() } }] }),
    User.countDocuments(),
    Certificate.aggregate([
      { $group: { _id: "$certificateType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
  ]);

  res.json({
    success: true,
    metrics: {
      totalCertifications: totalCertificates,
      totalCertificates,
      activeCertificates,
      expiredCertificates,
      users,
      byType
    }
  });
});

export const overview = getOverview;

export const getCertifications = asyncHandler(async (_req, res) => {
  const [byStatus, byType, recent] = await Promise.all([
    Certificate.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Certificate.aggregate([{ $group: { _id: "$certificateType", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Certificate.find().sort("-createdAt").limit(8).lean()
  ]);

  res.json({ success: true, byStatus, byType, recent });
});

export const getRevenue = asyncHandler(async (_req, res) => {
  res.json({ success: true, monthly: [], recent: [] });
});

export const getApplications = asyncHandler(async (_req, res) => {
  res.json({ success: true, byStatus: [], monthly: [] });
});

export const getClients = asyncHandler(async (_req, res) => {
  const [total, active, recent] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isActive: true }),
    User.find().sort("-createdAt").limit(10).select("-password").lean()
  ]);

  res.json({ success: true, total, active, recent });
});
