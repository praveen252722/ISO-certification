import { Router } from "express";
import { body, param } from "express-validator";
import { createApplication, listApplications, getApplication, updateApplication, deleteApplication, updateApplicationStatus, uploadDocument, deleteDocument, myApplications } from "../controllers/application.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const applicationRoutes = Router();

applicationRoutes.use(authenticate);
applicationRoutes.get("/my-applications", myApplications);
applicationRoutes.get("/", authorize("ADMIN", "AUDITOR"), listApplications);
applicationRoutes.post("/", authorize("CLIENT"), body("certificationType").notEmpty().withMessage("Certification type is required"), body("scope").notEmpty().withMessage("Scope is required"), validate, createApplication);
applicationRoutes.get("/:id", getApplication);
applicationRoutes.put("/:id", updateApplication);
applicationRoutes.delete("/:id", authorize("ADMIN"), deleteApplication);
applicationRoutes.put("/:id/status", authorize("ADMIN", "AUDITOR"), body("status").isIn(["DRAFT", "SUBMITTED", "UNDER_REVIEW", "CHANGES_REQUESTED", "AUDIT_SCHEDULED", "APPROVED", "REJECTED"]).withMessage("Invalid status"), validate, updateApplicationStatus);
applicationRoutes.post("/:id/documents", authorize("CLIENT"), upload.single("document"), uploadDocument);
applicationRoutes.delete("/:id/documents/:docId", authorize("CLIENT", "ADMIN"), deleteDocument);
