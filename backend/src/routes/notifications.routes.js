import { Router } from "express";
import { body } from "express-validator";
import { listNotifications, markRead, markAllRead, createNotification, deleteNotification } from "../controllers/notification.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const notificationRoutes = Router();

notificationRoutes.use(authenticate);
notificationRoutes.get("/", listNotifications);
notificationRoutes.put("/read-all", markAllRead);
notificationRoutes.put("/:id/read", markRead);
notificationRoutes.post("/", authorize("ADMIN"), body("recipient").isMongoId(), body("title").notEmpty(), body("message").notEmpty(), validate, createNotification);
notificationRoutes.delete("/:id", deleteNotification);
