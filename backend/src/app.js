import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import { join } from "path";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import routes from "./routes/index.js";

export const app = express();

const corsOptions = {
  origin: [
    env.clientUrl.replace(/\/+$/, ""),
    "https://vjinternationalcertification.com",
    "https://www.vjinternationalcertification.com",
    ...(env.nodeEnv === "development" ? ["http://localhost:3000"] : [])
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(join(process.cwd(), "uploads")));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 250, standardHeaders: true, legacyHeaders: false }));

app.get("/api/v1/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", (req, res, next) => {
  if (mongoose.connection.readyState === 1) return next();
  res.status(503).json({
    success: false,
    message: "Database connection not ready. Please try again in a few seconds."
  });
});

app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);
