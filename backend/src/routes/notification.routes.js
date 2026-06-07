import { Router } from "express";
import { body } from "express-validator";
import { listNotifications, markRead, sendNotification } from "../controllers/notification.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const notificationRoutes = Router();

notificationRoutes.use(authenticate);
notificationRoutes.get("/", listNotifications);
notificationRoutes.post("/", authorize("SUPER_ADMIN", "ADMIN"), body("recipient").isMongoId(), body("title").notEmpty(), body("message").notEmpty(), validate, sendNotification);
notificationRoutes.patch("/:id/read", markRead);
