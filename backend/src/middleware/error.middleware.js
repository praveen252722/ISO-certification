import { ApiError } from "../utils/apiError.js";

export function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode ?? 500;
  res.status(statusCode).json({
    success: false,
    message: error.message ?? "Internal server error",
    details: error.details,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack
  });
}
