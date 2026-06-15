import { ApiError } from "../utils/apiError.js";

export function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error, _req, res, _next) {
  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern ?? error.keyValue ?? {})[0] ?? "value";
    return res.status(409).json({
      success: false,
      message: `${field} already exists. Please use a unique ${field}.`,
      details: error.keyValue
    });
  }

  const statusCode = error.statusCode ?? 500;
  res.status(statusCode).json({
    success: false,
    message: error.message ?? "Internal server error",
    details: error.details,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack
  });
}
