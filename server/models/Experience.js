const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    companyUrl: {
      type: String,
      default: '#',
      trim: true,
    },
    employmentType: {
      type: String,
      default: 'Full-time',
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      default: null,
    },
    isCurrent: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
    achievements: {
      type: [String],
      default: [],
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Experience', experienceSchema)