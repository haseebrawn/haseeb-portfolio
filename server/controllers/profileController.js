const Profile = require('../models/Profile')
const asyncHandler = require('../utils/asyncHandler')

const defaultProfile = {
  name: 'Muhammad Haseeb',
  role: 'MERN Stack Developer',
  experience: '2+ Years',
  location: 'Pakistan',
  email: 'hello@muhammadhaseeb.dev',
  phone: '+92 300 1234567',
  summary:
    'I build modern, responsive, and scalable web applications using the MERN stack.',
  aboutStory:
    'I am Muhammad Haseeb, a MERN Stack Developer with 2+ years of experience building modern web applications, dashboards, APIs, and database-driven platforms.',
  resumeUrl: '#',
  avatar: '',
  socials: {
    github: '#',
    linkedin: '#',
    twitter: '#',
    email: 'mailto:hello@muhammadhaseeb.dev',
  },
}

const getProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne()

  if (!profile) {
    profile = await Profile.create(defaultProfile)
  }

  res.json({
    success: true,
    data: profile,
  })
})

const updateProfile = asyncHandler(async (req, res) => {
  const {
    name,
    role,
    experience,
    location,
    email,
    phone,
    summary,
    aboutStory,
    resumeUrl,
    avatar,
    socials,
  } = req.body

  if (!name || !role || !email || !summary || !aboutStory) {
    res.status(400)
    throw new Error('Name, role, email, summary, and about story are required')
  }

  let profile = await Profile.findOne()

  const payload = {
    name,
    role,
    experience,
    location,
    email,
    phone,
    summary,
    aboutStory,
    resumeUrl,
    avatar,
    socials: {
      github: socials?.github || '#',
      linkedin: socials?.linkedin || '#',
      twitter: socials?.twitter || '#',
      email: socials?.email || `mailto:${email}`,
    },
  }

  if (!profile) {
    profile = await Profile.create(payload)
  } else {
    profile = await Profile.findByIdAndUpdate(profile._id, payload, {
      new: true,
      runValidators: true,
    })
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: profile,
  })
})

module.exports = {
  getProfile,
  updateProfile,
}