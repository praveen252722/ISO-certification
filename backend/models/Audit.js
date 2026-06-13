const mongoose = require('mongoose');

const findingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  severity: {
    type: String,
    enum: ['critical', 'major', 'minor', 'observation'],
    default: 'minor',
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'in_progress'],
    default: 'open',
  },
});

const auditSchema = new mongoose.Schema(
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
    auditorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['initial', 'surveillance', 'recertification'],
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'failed'],
      default: 'scheduled',
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    completedDate: Date,
    findings: [findingSchema],
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    report: {
      type: String,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

auditSchema.index({ applicationId: 1 });
auditSchema.index({ auditorId: 1, status: 1 });

module.exports = mongoose.model('Audit', auditSchema);
