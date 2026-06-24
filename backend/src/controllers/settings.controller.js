import { User } from "../models/User.js";
import { Setting } from "../models/Setting.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.find().sort("key");
  const map = {};
  for (const s of settings) {
    map[s.key] = s.value;
  }
  res.json({ success: true, settings: map });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const entries = req.body;
  if (!entries || typeof entries !== "object") {
    throw new ApiError(400, "Request body must be an object of key-value pairs");
  }

  const ops = Object.entries(entries).map(([key, value]) => ({
    updateOne: { filter: { key }, upsert: true, update: { key, value } }
  }));

  await Setting.bulkWrite(ops);

  const updated = await Setting.find().sort("key");
  const map = {};
  for (const s of updated) {
    map[s.key] = s.value;
  }

  res.json({ success: true, message: "Settings updated", settings: map });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw new ApiError(400, "Current password is incorrect");

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: "Password changed successfully" });
});

export const uploadLogo = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const { imageUrl } = await uploadToCloudinary(req.file.buffer, "logos");

  await Setting.findOneAndUpdate(
    { key: "logo" },
    { key: "logo", value: imageUrl },
    { upsert: true }
  );

  res.json({ success: true, message: "Logo uploaded", url: imageUrl });
});
