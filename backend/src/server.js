import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { User } from "./models/User.js";

let mongoReady = false;

async function ensureDefaultAdmin() {
  const username = process.env.DEFAULT_ADMIN_USERNAME ?? "admin";
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  const existingAdmin = await User.findOne({ username }).select("+password");

  if (existingAdmin) {
    if (password) {
      existingAdmin.password = password;
    }
    existingAdmin.name = existingAdmin.name || "VJ Admin";
    existingAdmin.email = existingAdmin.email || "admin@vjinternationalcertification.com";
    existingAdmin.role = "ADMIN";
    existingAdmin.isActive = true;
    await existingAdmin.save();
    console.log(`Default admin ready. Username: ${username}`);
    return;
  }

  if (!password) {
    console.warn("DEFAULT_ADMIN_PASSWORD not set in environment variables. Skipping default admin creation.");
    return;
  }

  await User.create({
    name: "VJ Admin",
    username,
    email: process.env.DEFAULT_ADMIN_EMAIL ?? "admin@vjinternationalcertification.com",
    password,
    role: "ADMIN",
    phone: "+917386181914"
  });

  console.log(`Default admin created. Username: ${username}`);
}

app.listen(env.port, () => {
  console.log(`API listening on port ${env.port}`);

  connectDatabase()
    .then(async () => {
      mongoReady = true;
      try {
        await ensureDefaultAdmin();
      } catch (err) {
        console.error("Failed to seed default admin:", err.message);
      }
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      if (error.code) console.error(`MongoDB error code: ${error.code}`);
    });
});
