import { Router } from "express";
import { body } from "express-validator";
import { createCompany, getCompany, updateCompany, getCompanyProfile } from "../controllers/company.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const companyRoutes = Router();

companyRoutes.get("/profile", authenticate, getCompanyProfile);
companyRoutes.post("/", authenticate, authorize("ADMIN"), body("name").notEmpty(), validate, createCompany);
companyRoutes.get("/:id", getCompany);
companyRoutes.put("/:id", authenticate, authorize("ADMIN"), updateCompany);
