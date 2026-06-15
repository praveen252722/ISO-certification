import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  createCertificate,
  deleteCertificate,
  downloadCertificate,
  listCertificates,
  searchByCertificateId,
  searchByClientName,
  updateCertificate,
  verifyCertificate
} from "../controllers/certificate.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const certificateRoutes = Router();

function certificatePayloadValidators({ partial = false } = {}) {
  const requiredText = (field, message) => {
    const chain = body(field).trim();
    return partial ? chain.optional({ checkFalsy: false }) : chain.notEmpty().withMessage(message);
  };

  const requiredDate = (field, message) => {
    const chain = body(field);
    return partial ? chain.optional({ checkFalsy: false }).isISO8601().withMessage(message) : chain.isISO8601().withMessage(message);
  };

  return [
    body("certificateId").optional({ checkFalsy: true }).trim().isLength({ min: 3 }).withMessage("Certificate ID must be at least 3 characters"),
    requiredText("clientName", "Client name is required"),
    requiredText("companyName", "Company name is required"),
    body("certificateNumber").optional({ checkFalsy: true }).trim().isLength({ min: 3 }).withMessage("Certificate number must be at least 3 characters"),
    requiredText("certificateType", "Certificate type is required"),
    body("certificationScope").optional({ checkFalsy: true }).trim(),
    requiredDate("issueDate", "Issue date must be a valid date"),
    requiredDate("expiryDate", "Expiry date must be a valid date"),
    body("status").optional().isIn(["ACTIVE", "EXPIRED", "SUSPENDED", "REVOKED", "PENDING"]),
    body("email").optional({ checkFalsy: true }).isEmail().normalizeEmail(),
    body("phone").optional({ checkFalsy: true }).trim(),
    body("address").optional({ checkFalsy: true }).trim(),
    body("certificatePdf").optional({ checkFalsy: true }).custom((value) => {
      if (String(value).startsWith("/uploads/")) return true;
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error("Certificate PDF must be a valid URL or local upload path");
      }
    }),
    body("companyLogo").optional({ checkFalsy: true }).custom((value) => {
      if (String(value).startsWith("/uploads/")) return true;
      try {
        new URL(value);
        return true;
      } catch {
        throw new Error("Company logo must be a valid URL or local upload path");
      }
    })
  ];
}

certificateRoutes.get("/verify/:certificateNumber", param("certificateNumber").trim().notEmpty(), validate, verifyCertificate);
certificateRoutes.get("/search/id/:certificateId", param("certificateId").trim().notEmpty(), validate, searchByCertificateId);
certificateRoutes.get("/search/client", query("clientName").trim().isLength({ min: 2 }), validate, searchByClientName);
certificateRoutes.get("/search/client/:clientName", param("clientName").trim().isLength({ min: 2 }), validate, searchByClientName);
certificateRoutes.get("/:id/download", param("id").trim().notEmpty(), validate, downloadCertificate);

certificateRoutes.use(authenticate);
certificateRoutes.get("/", authorize("ADMIN", "AUDITOR"), listCertificates);
certificateRoutes.post("/", authorize("ADMIN", "AUDITOR"), certificatePayloadValidators(), validate, createCertificate);
certificateRoutes.put("/:id", authorize("ADMIN", "AUDITOR"), param("id").trim().notEmpty(), certificatePayloadValidators({ partial: true }), validate, updateCertificate);
certificateRoutes.delete("/:id", authorize("ADMIN", "AUDITOR"), param("id").trim().notEmpty(), validate, deleteCertificate);
