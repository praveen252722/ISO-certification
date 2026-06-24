import dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const backendRoot = resolve(currentDir, "../..");
const projectRoot = resolve(backendRoot, "..");

dotenv.config({ path: resolve(projectRoot, ".env.local") });
dotenv.config({ path: resolve(backendRoot, ".env.local") });
dotenv.config();

function resolveMongoUri() {
  const raw = process.env.MONGODB_URI;
  if (!raw) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  let uri = raw.trim();
  if (uri.startsWith("MONGODB_URI=")) {
    uri = uri.slice("MONGODB_URI=".length);
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(`MONGODB_URI must start with "mongodb://" or "mongodb+srv://". Got: ${uri.slice(0, 30)}...`);
  }

  if (envIsDevelopment() && (uri.includes("<db_password>") || uri.includes("YOUR_DATABASE_PASSWORD"))) {
    console.warn("MONGODB_URI contains a placeholder password. Using local MongoDB for development: mongodb://127.0.0.1:27017/vj_certification");
    return "mongodb://127.0.0.1:27017/vj_certification";
  }

  return uri;
}

function envIsDevelopment() {
  return (process.env.NODE_ENV ?? "development") === "development";
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  clientUrl: process.env.CLIENT_URL ?? "https://www.vjinternationalcertification.com",
  mongoUri: resolveMongoUri(),
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? ""
};
