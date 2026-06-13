const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    certificationType: {
      type: String,
      required: [true, 'Certification type is required'],
      enum: [
        'ISO 9001',
        'ISO 14001',
        'ISO 45001',
        'ISO 27001',
        'ISO 22000',
        'ISO 13485',
      ],
    },
    certificateNumber: {
      type: String,
      unique: true,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'revoked'],
      default: 'active',
    },
    qrCode: {
      type: String,
    },
    pdfUrl: {
      type: String,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

certificateSchema.index({ certificateNumber: 1 });
certificateSchema.index({ userId: 1 });
certificateSchema.index({ status: 1 });
certificateSchema.index({ expiryDate: 1 });

module.exports = mongoose.model('Certificate', certificateSchema);
