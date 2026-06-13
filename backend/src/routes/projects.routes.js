import { Router } from "express";
import { body } from "express-validator";
import { createProject, listProjects, getProject, updateProject, deleteProject } from "../controllers/project.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const projectRoutes = Router();

projectRoutes.get("/", listProjects);
projectRoutes.post("/", authenticate, authorize("ADMIN"), body("title").notEmpty(), body("slug").notEmpty(), validate, createProject);
projectRoutes.get("/:id", getProject);
projectRoutes.put("/:id", authenticate, authorize("ADMIN"), updateProject);
projectRoutes.delete("/:id", authenticate, authorize("ADMIN"), deleteProject);
