import { Router } from "express";
import { body } from "express-validator";
import { downloadCertificate, generateCertificate, listCertificates, verifyCertificate } from "../controllers/certificate.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const certificateRoutes = Router();

certificateRoutes.get("/verify/:certificateNumber", verifyCertificate);
certificateRoutes.use(authenticate);
certificateRoutes.get("/", authorize("SUPER_ADMIN", "ADMIN", "AUDITOR"), listCertificates);
certificateRoutes.post("/", authorize("SUPER_ADMIN", "ADMIN"), body("applicationId").isMongoId(), validate, generateCertificate);
certificateRoutes.get("/:id/download", downloadCertificate);
