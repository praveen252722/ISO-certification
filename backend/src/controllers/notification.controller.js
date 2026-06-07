import { Notification } from "../models/Notification.js";
import { sendWhatsAppMessage } from "../services/whatsapp.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listNotifications = asyncHandler(async (req, res) => {
  const items = await Notification.find({ recipient: req.user._id }).sort("-createdAt").limit(50);
  res.json({ success: true, items });
});

export const sendNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);
  if (req.body.channel === "WHATSAPP") {
    await sendWhatsAppMessage({ to: req.body.to, message: req.body.message });
    notification.status = "SENT";
    notification.sentAt = new Date();
    await notification.save();
  }
  res.status(201).json({ success: true, notification });
});

export const markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate({ _id: req.params.id, recipient: req.user._id }, { status: "READ", readAt: new Date() }, { new: true });
  res.json({ success: true, notification });
});
