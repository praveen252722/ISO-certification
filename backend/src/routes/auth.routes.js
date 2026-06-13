import { Router } from "express";
import { body } from "express-validator";
import { adminLogin, register, login, forgotPassword, resetPassword, me, updatePassword } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const authRoutes = Router();

authRoutes.post("/admin-login", body("username").notEmpty(), body("password").notEmpty(), validate, adminLogin);
authRoutes.post("/register", body("name").notEmpty().withMessage("Name is required"), body("email").isEmail().withMessage("Valid email is required"), body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"), validate, register);
authRoutes.post("/login", body("email").isEmail().withMessage("Valid email is required"), body("password").notEmpty().withMessage("Password is required"), validate, login);
authRoutes.post("/forgot-password", body("email").isEmail().withMessage("Valid email is required"), validate, forgotPassword);
authRoutes.post("/reset-password/:token", body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"), validate, resetPassword);
authRoutes.get("/me", authenticate, me);
authRoutes.put("/update-password", authenticate, body("currentPassword").notEmpty().withMessage("Current password is required"), body("newPassword").isLength({ min: 8 }).withMessage("New password must be at least 8 characters"), validate, updatePassword);
