const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Muhammad Haseeb',
    },
    role: {
      type: String,
      default: 'MERN Stack Developer',
    },
    experience: {
      type: String,
      default: '2+ Years',
    },
    location: {
      type: String,
      default: 'Pakistan',
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      default: '',
    },
    aboutStory: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '#',
    },
    avatar: {
      type: String,
      default: '',
    },
    socials: {
      github: {
        type: String,
        default: '#',
      },
      linkedin: {
        type: String,
        default: '#',
      },
      twitter: {
        type: String,
        default: '#',
      },
      email: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Profile', profileSchema)