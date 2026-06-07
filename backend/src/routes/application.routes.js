import { Router } from "express";
import { body } from "express-validator";
import { createApplication, listApplications, updateApplicationStatus } from "../controllers/application.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const applicationRoutes = Router();

applicationRoutes.use(authenticate);
applicationRoutes.get("/", authorize("SUPER_ADMIN", "ADMIN", "AUDITOR"), listApplications);
applicationRoutes.post(
  "/",
  authorize("CLIENT"),
  body("companyName").notEmpty(),
  body("certificationType").notEmpty(),
  body("scope").notEmpty(),
  validate,
  createApplication
);
applicationRoutes.patch("/:id/status", authorize("SUPER_ADMIN", "ADMIN"), body("status").notEmpty(), validate, updateApplicationStatus);
