import { User } from "../models/User.js";
import { signAccessToken } from "../services/token.service.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function sanitizeUser(user) {
  return { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role, phone: user.phone, company: user.company, isActive: user.isActive, createdAt: user.createdAt };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, company } = req.body;

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) throw new ApiError(409, "Email is already registered");

  const user = await User.create({ name, email, password, phone, company, role: "CLIENT" });
  const token = signAccessToken(user);

  res.status(201).json({ success: true, message: "Registration successful", token, user: sanitizeUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  if (!user.isActive) throw new ApiError(403, "Account is deactivated. Contact administrator.");

  user.lastLoginAt = new Date();
  await user.save();

  const token = signAccessToken(user);
  res.json({ success: true, message: "Login successful", token, user: sanitizeUser(user) });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Password reset email is not enabled in Phase 1" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  res.status(501).json({ success: false, message: "Password reset email is not enabled in Phase 1" });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("company");
  if (!user) throw new ApiError(404, "User not found");

  res.json({ success: true, user: sanitizeUser(user) });
});

export const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username.toLowerCase(), role: { $in: ["ADMIN", "STAFF"] } }).select("+password");
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  if (!user.isActive) throw new ApiError(403, "Account deactivated");

  user.lastLoginAt = new Date();
  await user.save();

  const token = signAccessToken(user);
  res.json({ success: true, token, user: sanitizeUser(user) });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new ApiError(400, "Current password is incorrect");

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: "Password updated successfully" });
});
