import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { User } from "./models/User.js";

async function ensureDefaultAdmin() {
  const username = process.env.DEFAULT_ADMIN_USERNAME ?? "admin";
  const password = process.env.DEFAULT_ADMIN_PASSWORD ?? "VJ@123";
  const existingAdmin = await User.findOne({ username }).select("+password");

  if (existingAdmin) {
    existingAdmin.name = existingAdmin.name || "VJ Admin";
    existingAdmin.email = existingAdmin.email || "admin@vjinternationalcertification.com";
    existingAdmin.password = password;
    existingAdmin.role = "ADMIN";
    existingAdmin.isActive = true;
    await existingAdmin.save();
    console.log(`Default admin ready. Username: ${username}`);
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

connectDatabase()
  .then(async () => {
    await ensureDefaultAdmin();
    app.listen(env.port, () => console.log(`API listening on port ${env.port}`));
  })
  .catch((error) => {
    console.error("Failed to start server");
    console.error(error.message);
    if (error.code) console.error(`MongoDB error code: ${error.code}`);
    process.exit(1);
  });
