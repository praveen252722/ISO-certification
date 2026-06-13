import { Router } from "express";
import { body } from "express-validator";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import * as settingsCtrl from "../controllers/settings.controller.js";

export const settingsRoutes = Router();

settingsRoutes.use(authenticate, authorize("ADMIN"));

settingsRoutes.get("/", settingsCtrl.getSettings);
settingsRoutes.put("/", settingsCtrl.updateSettings);
settingsRoutes.put("/password", body("currentPassword").notEmpty(), body("newPassword").isLength({ min: 8 }), validate, settingsCtrl.changePassword);
settingsRoutes.post("/upload-logo", settingsCtrl.uploadLogo);
