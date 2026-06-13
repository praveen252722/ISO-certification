const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
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
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'certified'],
      default: 'draft',
    },
    documents: [documentSchema],
    notes: {
      type: String,
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    stage: {
      type: String,
      default: 'application',
    },
    submittedAt: Date,
    reviewedAt: Date,
    certifiedAt: Date,
  },
  { timestamps: true }
);

applicationSchema.index({ userId: 1, status: 1 });
applicationSchema.index({ certificationType: 1 });
applicationSchema.index({ assignedTo: 1 });

module.exports = mongoose.model('Application', applicationSchema);
