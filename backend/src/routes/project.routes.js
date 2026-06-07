import { Router } from "express";
import { body } from "express-validator";
import { adminListProjects, deleteProject, listProjects, upsertProject } from "../controllers/project.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const projectRoutes = Router();

projectRoutes.get("/", listProjects);
projectRoutes.use(authenticate, authorize("SUPER_ADMIN", "ADMIN"));
projectRoutes.get("/admin", adminListProjects);
projectRoutes.post("/", body("title").notEmpty(), body("imageUrl").optional().isURL(), validate, upsertProject);
projectRoutes.patch("/:id", body("title").notEmpty(), body("imageUrl").optional().isURL(), validate, upsertProject);
projectRoutes.delete("/:id", deleteProject);
