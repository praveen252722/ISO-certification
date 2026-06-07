import multer from "multer";
import { ApiError } from "../utils/apiError.js";

const storage = multer.memoryStorage();
const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) return cb(new ApiError(400, "Unsupported file type"));
    return cb(null, true);
  }
});
