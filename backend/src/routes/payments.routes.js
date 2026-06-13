import { Router } from "express";
import { body } from "express-validator";
import { createPayment, listPayments, getPayment, myPayments, revenueStats } from "../controllers/payment.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

export const paymentRoutes = Router();

paymentRoutes.use(authenticate);
paymentRoutes.get("/my-payments", myPayments);
paymentRoutes.get("/revenue/stats", authorize("ADMIN", "AUDITOR"), revenueStats);
paymentRoutes.get("/", authorize("ADMIN", "AUDITOR"), listPayments);
paymentRoutes.post("/", authorize("CLIENT"), body("company").isMongoId(), body("amount").isNumeric(), body("application").optional().isMongoId(), validate, createPayment);
paymentRoutes.get("/:id", getPayment);
