import { Router } from "express";
import { body } from "express-validator";
import { downloadCertificate, generateCertificate, listCertificates, verifyCertificate } from "../controllers/certificate.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const certificateRoutes = Router();

certificateRoutes.get("/verify/:certificateNumber", verifyCertificate);
certificateRoutes.use(authenticate);
certificateRoutes.get("/", authorize("AUDITOR"), listCertificates);
certificateRoutes.post("/", authorize("AUDITOR"), body("applicationId").isMongoId(), validate, generateCertificate);
certificateRoutes.get("/:id/download", downloadCertificate);
