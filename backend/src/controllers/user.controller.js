import { AuditLog } from "../models/AuditLog.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination } from "../utils/pagination.js";

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, username, securityPin } = req.body;

  if (securityPin !== "VJ@123") {
    throw new ApiError(403, "Invalid security PIN");
  }

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) throw new ApiError(409, "Email already in use");

  const user = await User.create({ name, email, password, role: role || "STAFF", phone, username });

  await AuditLog.create({
    actor: req.user._id,
    action: "USER_CREATED",
    entity: "User",
    entityId: user._id,
    metadata: { createdUser: user.email, role: user.role }
  });

  res.status(201).json({ success: true, message: "User created successfully", user });
});

export const listUsers = asyncHandler(async (req, res) => {
  const { skip, limit, page } = getPagination(req.query);

  const filter = {};
  if (req.query.role) filter.role = req.query.role.toUpperCase();
  if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === "true";
  if (req.query.search) {
    const search = String(req.query.search).trim();
    filter.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { username: new RegExp(search, "i") }
    ];
  }

  const [items, total] = await Promise.all([
    User.find(filter).populate("company").sort("-createdAt").skip(skip).limit(limit),
    User.countDocuments(filter)
  ]);

  res.json({ success: true, page, limit, total, totalPages: Math.ceil(total / limit), items });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("company");
  if (!user) throw new ApiError(404, "User not found");

  res.json({ success: true, user });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, username } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  if (req.user.role !== "ADMIN" && req.user._id.toString() !== req.params.id) {
    throw new ApiError(403, "You can only update your own profile");
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) {
    const exists = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.params.id } });
    if (exists) throw new ApiError(409, "Email already in use");
    user.email = email;
  }
  if (phone !== undefined) user.phone = phone;
  if (username !== undefined) user.username = username;

  await user.save();

  res.json({ success: true, message: "User updated successfully", user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  if (user.role === "ADMIN") {
    const adminCount = await User.countDocuments({ role: "ADMIN", isActive: true });
    if (adminCount <= 1) throw new ApiError(400, "Cannot delete the last active admin");
  }

  await User.findByIdAndUpdate(req.params.id, { isActive: false });

  res.json({ success: true, message: "User deactivated successfully" });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  if (user.role === "ADMIN" && role !== "ADMIN") {
    const adminCount = await User.countDocuments({ role: "ADMIN", isActive: true });
    if (adminCount <= 1) throw new ApiError(400, "Cannot change role of the last admin");
  }

  user.role = role;
  await user.save();

  res.json({ success: true, message: `User role updated to ${role}`, user });
});

export const listAuditors = asyncHandler(async (req, res) => {
  const auditors = await User.find({ role: "AUDITOR", isActive: true }).select("name email phone").sort("name");

  res.json({ success: true, items: auditors });
});
