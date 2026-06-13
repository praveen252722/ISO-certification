const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Report title is required'],
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['audit', 'financial', 'client', 'certificate'],
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
    format: {
      type: String,
      enum: ['pdf', 'csv', 'json', 'xlsx'],
      default: 'pdf',
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

reportSchema.index({ type: 1 });
reportSchema.index({ generatedBy: 1 });
reportSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Report', reportSchema);
