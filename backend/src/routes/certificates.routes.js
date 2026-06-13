import { Router } from "express";
import { body, param } from "express-validator";
import { createCertificate, listCertificates, getCertificate, updateCertificate, deleteCertificate, verifyCertificate, myCertificates, revokeCertificate, getCertificateStats } from "../controllers/certificate.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const certificateRoutes = Router();

certificateRoutes.get("/verify/:certificateNumber", param("certificateNumber").trim().notEmpty(), validate, verifyCertificate);
certificateRoutes.get("/stats", authenticate, authorize("ADMIN", "AUDITOR"), getCertificateStats);

certificateRoutes.use(authenticate);
certificateRoutes.get("/my-certificates", myCertificates);
certificateRoutes.get("/", authorize("ADMIN", "AUDITOR"), listCertificates);
certificateRoutes.post("/", authorize("ADMIN", "AUDITOR"), body("clientName").notEmpty(), body("certificationType").notEmpty(), body("issueDate").isISO8601(), body("expiryDate").isISO8601(), validate, createCertificate);
certificateRoutes.get("/:id", getCertificate);
certificateRoutes.put("/:id", authorize("ADMIN", "AUDITOR"), updateCertificate);
certificateRoutes.delete("/:id", authorize("ADMIN"), deleteCertificate);
certificateRoutes.post("/:id/revoke", authorize("ADMIN"), body("reason").optional().trim(), validate, revokeCertificate);
