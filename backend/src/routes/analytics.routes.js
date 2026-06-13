import { Router } from "express";
import { getOverview, getCertifications, getRevenue, getApplications, getClients } from "../controllers/analytics.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

export const analyticsRoutes = Router();

analyticsRoutes.use(authenticate, authorize("ADMIN", "AUDITOR"));
analyticsRoutes.get("/overview", getOverview);
analyticsRoutes.get("/certifications", getCertifications);
analyticsRoutes.get("/revenue", getRevenue);
analyticsRoutes.get("/applications", getApplications);
analyticsRoutes.get("/clients", getClients);
