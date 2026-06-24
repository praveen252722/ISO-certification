import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  createOrganization,
  deleteOrganization,
  listAdminOrganizations,
  listOrganizations,
  updateOrganization,
  uploadOrganizationImage,
  uploadOrganizationImage2
} from "../controllers/organization.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const organizationRoutes = Router();

const optionalUrl = (field) =>
  body(field).optional({ checkFalsy: true }).custom((value) => {
    if (String(value).startsWith("/")) return true;
    try {
      new URL(value);
      return true;
    } catch {
      throw new Error(`${field} must be a valid URL or local upload path`);
    }
  });

function organizationPayloadValidators({ partial = false } = {}) {
  return [
    partial
      ? body("title").trim().optional({ checkFalsy: false })
      : body("title").trim().notEmpty().withMessage("Organization title is required"),
    body("description").optional({ checkFalsy: true }).trim(),
    body("certificationDate").optional({ checkFalsy: true }).isISO8601().withMessage("Certification date must be a valid date"),
    body("status").optional().isIn(["Certified", "Active"]).withMessage("Status must be Certified or Active"),
    optionalUrl("imageUrl"),
    optionalUrl("imageUrl2")
  ];
}

organizationRoutes.get("/", query("limit").optional().isInt({ min: 1, max: 100 }), validate, listOrganizations);

organizationRoutes.use(authenticate);
organizationRoutes.get("/admin", authorize("ADMIN"), listAdminOrganizations);
organizationRoutes.post("/upload-image", authorize("ADMIN"), upload.single("organizationImage"), uploadOrganizationImage);
organizationRoutes.post("/upload-image2", authorize("ADMIN"), upload.single("organizationImage2"), uploadOrganizationImage2);
organizationRoutes.post("/", authorize("ADMIN"), organizationPayloadValidators(), validate, createOrganization);
organizationRoutes.put("/:id", authorize("ADMIN"), param("id").trim().notEmpty(), organizationPayloadValidators({ partial: true }), validate, updateOrganization);
organizationRoutes.delete("/:id", authorize("ADMIN"), param("id").trim().notEmpty(), validate, deleteOrganization);
