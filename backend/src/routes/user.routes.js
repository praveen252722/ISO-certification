import { Router } from "express";
import { User } from "../models/User.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const userRoutes = Router();

userRoutes.use(authenticate, authorize("SUPER_ADMIN", "ADMIN"));
userRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const filter = req.query.role ? { role: req.query.role } : {};
    const users = await User.find(filter).select("-password").sort("-createdAt").limit(100);
    res.json({ success: true, items: users });
  })
);

userRoutes.patch(
  "/admin-credentials",
  asyncHandler(async (req, res) => {
    const admin = await User.findById(req.user._id).select("+password");
    if (req.body.username) admin.username = req.body.username.toLowerCase();
    if (req.body.password) admin.password = req.body.password;
    await admin.save();
    res.json({ success: true, user: { id: admin._id, name: admin.name, username: admin.username, email: admin.email, role: admin.role } });
  })
);
