import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { join } from "path";
import { env } from "./config/env.js";
import { connectMongoDB } from "./lib/mongodb.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import routes from "./routes/index.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(join(process.cwd(), "uploads")));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 250, standardHeaders: true, legacyHeaders: false }));

app.get("/api/test-db", async (_req, res, next) => {
  try {
    await connectMongoDB(env.mongoUri);
    res.json({ success: true, message: "MongoDB Connected Successfully" });
  } catch (error) {
    next(error);
  }
});

app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);
