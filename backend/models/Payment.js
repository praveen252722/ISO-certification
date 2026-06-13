const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
      uppercase: true,
      minlength: 3,
      maxlength: 3,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    method: {
      type: String,
      trim: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
    invoiceUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ applicationId: 1 });
paymentSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
