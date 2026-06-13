import compression from "compression";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { join } from "path";
import { env } from "./config/env.js";
import { connectMongoDB } from "./lib/mongodb.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import routes from "./routes/index.js";

const ALLOWED_ORIGINS = [
  env.clientUrl.replace(/\/+$/, ""),
  'https://vjinternationalcertification.com',
  'https://www.vjinternationalcertification.com',
  ...(env.nodeEnv === 'development' ? ['http://localhost:3000', 'http://localhost:3001'] : [])
].filter(Boolean);

function isOriginAllowed(origin) {
  if (!origin) return true;
  const cleaned = origin.replace(/\/+$/, "");
  return ALLOWED_ORIGINS.some((allowed) => allowed === cleaned);
}

app.use((_req, res, next) => {
  const origin = _req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
  }
  if (_req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
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
