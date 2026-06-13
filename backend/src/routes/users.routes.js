import { Router } from "express";
import { body } from "express-validator";
import { createUser, listUsers, getUser, updateUser, deleteUser, updateUserRole, listAuditors } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const userRoutes = Router();

userRoutes.use(authenticate);
userRoutes.post("/", authorize("ADMIN"), body("name").notEmpty(), body("email").isEmail(), body("password").isLength({ min: 8 }), body("securityPin").notEmpty(), validate, createUser);
userRoutes.get("/", authorize("ADMIN"), listUsers);
userRoutes.get("/auditors/list", listAuditors);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", body("name").optional().trim(), body("email").optional().isEmail(), body("phone").optional().trim(), validate, updateUser);
userRoutes.delete("/:id", authorize("ADMIN"), deleteUser);
userRoutes.put("/:id/role", authorize("ADMIN"), body("role").isIn(["ADMIN", "AUDITOR", "CLIENT", "STAFF"]).withMessage("Invalid role"), validate, updateUserRole);
