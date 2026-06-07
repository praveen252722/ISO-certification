import { Router } from "express";
import { Parser } from "json2csv";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { Report } from "../models/Report.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const reportRoutes = Router();

reportRoutes.use(authenticate, authorize("SUPER_ADMIN", "ADMIN", "AUDITOR"));
reportRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    const reports = await Report.find().sort("-createdAt").limit(100);
    res.json({ success: true, items: reports });
  })
);
reportRoutes.get(
  "/export.csv",
  asyncHandler(async (_req, res) => {
    const reports = await Report.find().lean();
    const csv = new Parser({ fields: ["title", "type", "summary", "createdAt"] }).parse(reports);
    res.header("Content-Type", "text/csv").attachment("reports.csv").send(csv);
  })
);
