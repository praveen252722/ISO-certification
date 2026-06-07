import { Router } from "express";
import { overview } from "../controllers/analytics.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

export const analyticsRoutes = Router();

analyticsRoutes.use(authenticate, authorize("AUDITOR"));
analyticsRoutes.get("/overview", overview);
