import { Router } from "express";
import { analyticsRoutes } from "./analytics.routes.js";
import { applicationRoutes } from "./application.routes.js";
import { auditRoutes } from "./audit.routes.js";
import { authRoutes } from "./auth.routes.js";
import { certificateRoutes } from "./certificate.routes.js";
import { notificationRoutes } from "./notification.routes.js";
import { projectRoutes } from "./project.routes.js";
import { reportRoutes } from "./report.routes.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, status: "ok", service: "ISO Certification API" }));
router.use("/auth", authRoutes);
router.use("/applications", applicationRoutes);
router.use("/certificates", certificateRoutes);
router.use("/audits", auditRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/notifications", notificationRoutes);
router.use("/projects", projectRoutes);
router.use("/reports", reportRoutes);

export default router;
