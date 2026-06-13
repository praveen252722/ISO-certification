import { env } from "./env.js";
import { connectMongoDB } from "../lib/mongodb.js";

export async function connectDatabase() {
  console.log("Connecting to MongoDB...");
  await connectMongoDB(env.mongoUri);
  console.log("MongoDB connected");
}
