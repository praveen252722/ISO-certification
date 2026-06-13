import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true, index: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    description: String,
    isPublic: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

export const Setting = mongoose.model("Setting", settingSchema);
