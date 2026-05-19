const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

const processSchema = new mongoose.Schema(
  {
    step: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: '',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    fullDescription: {
      type: String,
      trim: true,
      default: '',
    },
    problemStatement: {
      type: String,
      trim: true,
      default: '',
    },
    solution: {
      type: String,
      trim: true,
      default: '',
    },
    techStack: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    results: {
      type: [resultSchema],
      default: [],
    },
    gallery: {
      type: [String],
      default: [],
    },
    process: {
      type: [processSchema],
      default: [],
    },
    timeline: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'Full Stack Developer',
    },
    team: {
      type: String,
      default: 'Solo Project',
    },
    preview: {
      type: String,
      default: 'dashboard',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      default: '#',
    },
    githubUrl: {
      type: String,
      default: '#',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Project', projectSchema)