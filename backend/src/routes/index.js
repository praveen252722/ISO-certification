import { Router } from "express";
import { analyticsRoutes } from "./analytics.routes.js";
import { authRoutes } from "./auth.routes.js";
import { certificateRoutes } from "./certificate.routes.js";
import { exportRoutes } from "./export.routes.js";
import { projectRoutes } from "./project.routes.js";
import { userRoutes } from "./users.routes.js";
import { connectMongoDB } from "../lib/mongodb.js";
import { env } from "../config/env.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, status: "ok", service: "ISO Certification API" }));
router.get("/test-db", async (_req, res, next) => {
  try {
    await connectMongoDB(env.mongoUri);
    res.json({ success: true, message: "MongoDB Connected Successfully" });
  } catch (error) {
    next(error);
  }
});
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/certificates", certificateRoutes);
router.use("/projects", projectRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/export", exportRoutes);

export default router;
