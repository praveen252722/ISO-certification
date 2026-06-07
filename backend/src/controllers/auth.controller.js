import crypto from "crypto";
import { body } from "express-validator";
import { User } from "../models/User.js";
import { sendEmail } from "../services/email.service.js";
import { signAccessToken } from "../services/token.service.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerRules = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  body("role").optional().isIn(["CLIENT"])
];

export const loginRules = [body("email").isEmail(), body("password").notEmpty()];

export const register = asyncHandler(async (req, res) => {
  const exists = await User.exists({ email: req.body.email });
  if (exists) throw new ApiError(409, "Email is already registered");

  const user = await User.create({ ...req.body, role: "CLIENT" });
  const token = signAccessToken(user);
  res.status(201).json({ success: true, token, user: sanitizeUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user || !(await user.comparePassword(req.body.password))) throw new ApiError(401, "Invalid email or password");

  user.lastLoginAt = new Date();
  await user.save();
  const token = signAccessToken(user);
  res.json({ success: true, token, user: sanitizeUser(user) });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: sanitizeUser(req.user) });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();
    await sendEmail({ to: user.email, subject: "Reset your ISO platform password", html: `<p>Reset token: ${user.resetPasswordToken}</p>` });
  }
  res.json({ success: true, message: "If the account exists, a reset email has been sent" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: new Date() } });
  if (!user) throw new ApiError(400, "Invalid or expired reset token");
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ success: true, message: "Password reset successful" });
});

function sanitizeUser(user) {
  return { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, phone: user.phone };
}
