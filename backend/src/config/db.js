import { env } from "./env.js";
import { connectMongoDB, sanitizeMongoUri } from "../lib/mongodb.js";

export async function connectDatabase() {
  console.log(`Connecting to MongoDB: ${sanitizeMongoUri(env.mongoUri)}`);
  await connectMongoDB(env.mongoUri);
  console.log("MongoDB connected");
}
