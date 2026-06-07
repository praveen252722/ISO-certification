import { Router } from "express";
import { listProjects } from "../controllers/project.controller.js";

export const projectRoutes = Router();

projectRoutes.get("/", listProjects);
