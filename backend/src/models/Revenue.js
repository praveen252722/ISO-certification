import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema(
  {
    certificate: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate", index: true },
    companyName: { type: String, trim: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR", uppercase: true, trim: true },
    paymentMode: { type: String, trim: true },
    paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED", "REFUNDED"], default: "PENDING", index: true },
    paidAt: Date,
    notes: String
  },
  { timestamps: true }
);

export const Revenue = mongoose.model("Revenue", revenueSchema);
