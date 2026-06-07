import { Router } from "express";
import { body } from "express-validator";
import { createAudit, listAudits, summarizeAudit, updateAudit } from "../controllers/audit.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const auditRoutes = Router();

auditRoutes.use(authenticate);
auditRoutes.get("/", authorize("SUPER_ADMIN", "ADMIN", "AUDITOR"), listAudits);
auditRoutes.post("/", authorize("SUPER_ADMIN", "ADMIN"), body("application").isMongoId(), body("company").isMongoId(), body("auditor").isMongoId(), body("scheduledAt").isISO8601(), validate, createAudit);
auditRoutes.patch("/:id", authorize("SUPER_ADMIN", "ADMIN", "AUDITOR"), updateAudit);
auditRoutes.post("/:id/summary", authorize("SUPER_ADMIN", "ADMIN", "AUDITOR"), summarizeAudit);
