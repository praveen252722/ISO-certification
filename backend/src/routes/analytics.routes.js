import { Router } from "express";
import { overview } from "../controllers/analytics.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

export const analyticsRoutes = Router();

analyticsRoutes.use(authenticate, authorize("SUPER_ADMIN", "ADMIN"));
analyticsRoutes.get("/overview", overview);
