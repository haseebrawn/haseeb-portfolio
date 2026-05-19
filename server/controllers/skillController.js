const Skill = require('../models/Skill')
const asyncHandler = require('../utils/asyncHandler')

const getSkills = asyncHandler(async (req, res) => {
  const { category } = req.query

  const query = { isActive: true }

  if (category && category !== 'All') {
    query.category = category
  }

  const skills = await Skill.find(query).sort({
    displayOrder: 1,
    createdAt: -1,
  })

  res.json({
    success: true,
    count: skills.length,
    data: skills,
  })
})

const adminGetSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({
    displayOrder: 1,
    createdAt: -1,
  })

  res.json({
    success: true,
    count: skills.length,
    data: skills,
  })
})

const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body)

  res.status(201).json({
    success: true,
    message: 'Skill created successfully',
    data: skill,
  })
})

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!skill) {
    res.status(404)
    throw new Error('Skill not found')
  }

  res.json({
    success: true,
    message: 'Skill updated successfully',
    data: skill,
  })
})

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id)

  if (!skill) {
    res.status(404)
    throw new Error('Skill not found')
  }

  await skill.deleteOne()

  res.json({
    success: true,
    message: 'Skill deleted successfully',
  })
})

const toggleSkillStatus = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id)

  if (!skill) {
    res.status(404)
    throw new Error('Skill not found')
  }

  skill.isActive = !skill.isActive
  await skill.save()

  res.json({
    success: true,
    message: 'Skill status updated',
    data: skill,
  })
})

module.exports = {
  getSkills,
  adminGetSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  toggleSkillStatus,
}