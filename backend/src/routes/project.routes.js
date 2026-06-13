import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  createProject,
  deleteProject,
  listAdminProjects,
  listProjects,
  updateProject,
  uploadProjectImage
} from "../controllers/project.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const projectRoutes = Router();

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

function projectPayloadValidators({ partial = false } = {}) {
  const requiredTitle = body("title").trim();

  return [
    partial ? requiredTitle.optional({ checkFalsy: false }) : requiredTitle.notEmpty().withMessage("Project title is required"),
    body("summary").optional({ checkFalsy: true }).trim(),
    body("description").optional({ checkFalsy: true }).trim(),
    body("companyName").optional({ checkFalsy: true }).trim(),
    body("certificationType").optional({ checkFalsy: true }).trim(),
    body("certifiedDate").optional({ checkFalsy: true }).isISO8601().withMessage("Certified date must be a valid date"),
    body("isPublished").optional().toBoolean().isBoolean(),
    optionalUrl("imageUrl")
  ];
}

projectRoutes.get("/", query("limit").optional().isInt({ min: 1, max: 100 }), validate, listProjects);

projectRoutes.use(authenticate);
projectRoutes.get("/admin", authorize("ADMIN"), listAdminProjects);
projectRoutes.post("/upload-image", authorize("ADMIN"), upload.single("projectImage"), uploadProjectImage);
projectRoutes.post("/", authorize("ADMIN"), projectPayloadValidators(), validate, createProject);
projectRoutes.put("/:id", authorize("ADMIN"), param("id").trim().notEmpty(), projectPayloadValidators({ partial: true }), validate, updateProject);
projectRoutes.delete("/:id", authorize("ADMIN"), param("id").trim().notEmpty(), validate, deleteProject);
