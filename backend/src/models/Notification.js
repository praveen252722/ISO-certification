import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    channel: { type: String, enum: ["IN_APP", "EMAIL", "WHATSAPP"], default: "IN_APP" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["QUEUED", "SENT", "FAILED", "READ"], default: "QUEUED", index: true },
    metadata: mongoose.Schema.Types.Mixed,
    sentAt: Date,
    readAt: Date
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
