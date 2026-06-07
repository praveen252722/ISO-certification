import { Application } from "../models/Application.js";
import { Audit } from "../models/Audit.js";
import { Certificate } from "../models/Certificate.js";
import { Payment } from "../models/Payment.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const overview = asyncHandler(async (_req, res) => {
  const [totalCertifications, activeCertificates, pendingApplications, upcomingAudits, revenue] = await Promise.all([
    Certificate.countDocuments(),
    Certificate.countDocuments({ status: "ACTIVE" }),
    Application.countDocuments({ status: { $in: ["SUBMITTED", "UNDER_REVIEW", "CHANGES_REQUESTED"] } }),
    Audit.countDocuments({ status: "SCHEDULED", scheduledAt: { $gte: new Date() } }),
    Payment.aggregate([{ $match: { status: "PAID" } }, { $group: { _id: null, total: { $sum: "$amount" } } }])
  ]);

  res.json({
    success: true,
    metrics: {
      totalCertifications,
      activeCertificates,
      pendingApplications,
      upcomingAudits,
      revenue: revenue[0]?.total ?? 0
    }
  });
});
