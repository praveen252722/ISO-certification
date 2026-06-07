import { Router } from "express";
import { body } from "express-validator";
import { adminLogin, adminLoginRules, forgotPassword, login, loginRules, me, register, registerRules, resetPassword } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const authRoutes = Router();

authRoutes.post("/register", registerRules, validate, register);
authRoutes.post("/login", loginRules, validate, login);
authRoutes.post("/admin-login", adminLoginRules, validate, adminLogin);
authRoutes.post("/forgot-password", body("email").isEmail(), validate, forgotPassword);
authRoutes.post("/reset-password", body("token").notEmpty(), body("password").isLength({ min: 8 }), validate, resetPassword);
authRoutes.get("/me", authenticate, me);
