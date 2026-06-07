import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["PENDING", "PAID", "FAILED", "REFUNDED"], default: "PENDING", index: true },
    provider: String,
    transactionId: String,
    paidAt: Date
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
