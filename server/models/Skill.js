const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      trim: true,
    },
    level: {
      type: String,
      enum: ['Basic', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    percentage: {
      type: Number,
      default: 70,
      min: 0,
      max: 100,
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'text-primary',
    },
    description: {
      type: String,
      default: '',
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

module.exports = mongoose.model('Skill', skillSchema)