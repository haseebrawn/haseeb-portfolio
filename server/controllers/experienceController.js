const Experience = require('../models/Experience')
const asyncHandler = require('../utils/asyncHandler')

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

const parseDate = (value) => {
  if (!value) return null

  if (/^\d{4}-\d{2}$/.test(value)) {
    return new Date(`${value}-01T00:00:00.000Z`)
  }

  return new Date(value)
}

const buildExperiencePayload = (body) => {
  const {
    title,
    company,
    companyUrl,
    employmentType,
    location,
    startDate,
    endDate,
    isCurrent,
    description,
    responsibilities,
    techStack,
    achievements,
    displayOrder,
    isActive,
  } = body

  return {
    title,
    company,
    companyUrl: companyUrl || '#',
    employmentType: employmentType || 'Full-time',
    location: location || '',
    startDate: parseDate(startDate),
    endDate: isCurrent ? null : parseDate(endDate),
    isCurrent: Boolean(isCurrent),
    description,
    responsibilities: toArray(responsibilities),
    techStack: toArray(techStack),
    achievements: toArray(achievements),
    displayOrder: Number(displayOrder) || 0,
    isActive: Boolean(isActive),
  }
}

const getPublicExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({
    isCurrent: -1,
    displayOrder: 1,
    startDate: -1,
  })

  res.json({
    success: true,
    data: experiences,
  })
})

const getAdminExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find().sort({
    displayOrder: 1,
    startDate: -1,
  })

  res.json({
    success: true,
    data: experiences,
  })
})

const getExperienceById = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id)

  if (!experience) {
    res.status(404)
    throw new Error('Experience not found')
  }

  res.json({
    success: true,
    data: experience,
  })
})

const createExperience = asyncHandler(async (req, res) => {
  const { title, company, startDate, description } = req.body

  if (!title || !company || !startDate || !description) {
    res.status(400)
    throw new Error('Title, company, start date, and description are required')
  }

  const payload = buildExperiencePayload(req.body)

  const experience = await Experience.create(payload)

  res.status(201).json({
    success: true,
    message: 'Experience created successfully',
    data: experience,
  })
})

const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id)

  if (!experience) {
    res.status(404)
    throw new Error('Experience not found')
  }

  const { title, company, startDate, description } = req.body

  if (!title || !company || !startDate || !description) {
    res.status(400)
    throw new Error('Title, company, start date, and description are required')
  }

  const payload = buildExperiencePayload(req.body)

  const updatedExperience = await Experience.findByIdAndUpdate(
    req.params.id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  )

  res.json({
    success: true,
    message: 'Experience updated successfully',
    data: updatedExperience,
  })
})

const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id)

  if (!experience) {
    res.status(404)
    throw new Error('Experience not found')
  }

  await experience.deleteOne()

  res.json({
    success: true,
    message: 'Experience deleted successfully',
  })
})

const toggleExperienceStatus = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id)

  if (!experience) {
    res.status(404)
    throw new Error('Experience not found')
  }

  experience.isActive = !experience.isActive

  await experience.save()

  res.json({
    success: true,
    message: experience.isActive
      ? 'Experience activated successfully'
      : 'Experience deactivated successfully',
    data: experience,
  })
})

module.exports = {
  getPublicExperiences,
  getAdminExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  toggleExperienceStatus,
}