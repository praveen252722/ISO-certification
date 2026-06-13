import { Router } from "express";
import { body } from "express-validator";
import { createReport, listReports, getReport, deleteReport, exportReport } from "../controllers/report.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const reportRoutes = Router();

reportRoutes.use(authenticate, authorize("ADMIN", "AUDITOR"));
reportRoutes.get("/", listReports);
reportRoutes.post("/", body("title").notEmpty(), body("type").isIn(["AUDIT", "REVENUE", "CLIENT", "COMPLIANCE"]), validate, createReport);
reportRoutes.get("/:id", getReport);
reportRoutes.delete("/:id", deleteReport);
reportRoutes.post("/:id/export", exportReport);
