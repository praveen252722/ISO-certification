const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    completionDate: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'ongoing',
    },
  },
  { timestamps: true }
);

projectSchema.index({ featured: 1 });
projectSchema.index({ status: 1 });

module.exports = mongoose.model('Project', projectSchema);
