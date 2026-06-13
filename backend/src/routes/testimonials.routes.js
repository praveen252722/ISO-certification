import { Router } from "express";
import { body } from "express-validator";
import { createTestimonial, listTestimonials, getTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonial.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const testimonialRoutes = Router();

testimonialRoutes.get("/", listTestimonials);
testimonialRoutes.post("/", authenticate, authorize("ADMIN"), body("name").notEmpty(), body("quote").notEmpty(), body("rating").optional().isInt({ min: 1, max: 5 }), validate, createTestimonial);
testimonialRoutes.get("/:id", getTestimonial);
testimonialRoutes.put("/:id", authenticate, authorize("ADMIN"), updateTestimonial);
testimonialRoutes.delete("/:id", authenticate, authorize("ADMIN"), deleteTestimonial);
