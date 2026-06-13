import { Router } from "express";
import { body } from "express-validator";
import { createAudit, listAudits, getAudit, updateAudit, deleteAudit, updateAuditStatus, myAudits, addFinding } from "../controllers/audit.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const auditRoutes = Router();

auditRoutes.use(authenticate);
auditRoutes.get("/my-audits", myAudits);
auditRoutes.get("/", authorize("ADMIN", "AUDITOR"), listAudits);
auditRoutes.post("/", authorize("ADMIN", "AUDITOR"), body("application").isMongoId(), body("company").isMongoId(), body("auditor").isMongoId(), body("scheduledAt").isISO8601(), validate, createAudit);
auditRoutes.get("/:id", getAudit);
auditRoutes.put("/:id", authorize("ADMIN", "AUDITOR"), updateAudit);
auditRoutes.delete("/:id", authorize("ADMIN"), deleteAudit);
auditRoutes.put("/:id/status", authorize("ADMIN", "AUDITOR"), body("status").isIn(["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).withMessage("Invalid status"), validate, updateAuditStatus);
auditRoutes.post("/:id/findings", authorize("ADMIN", "AUDITOR"), body("clause").notEmpty(), body("severity").isIn(["LOW", "MEDIUM", "HIGH", "CRITICAL"]), body("description").notEmpty(), validate, addFinding);
