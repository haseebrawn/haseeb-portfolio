const Project = require('../models/Project')
const asyncHandler = require('../utils/asyncHandler')

const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const getProjects = asyncHandler(async (req, res) => {
  const { category, featured } = req.query

  const query = { isActive: true }

  if (category && category !== 'All') {
    query.category = category
  }

  if (featured === 'true') {
    query.featured = true
  }

  const projects = await Project.find(query).sort({
    displayOrder: 1,
    createdAt: -1,
  })

  res.json({
    success: true,
    count: projects.length,
    data: projects,
  })
})

const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    isActive: true,
    featured: true,
  }).sort({
    displayOrder: 1,
    createdAt: -1,
  })

  res.json({
    success: true,
    count: projects.length,
    data: projects,
  })
})

const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug,
    isActive: true,
  })

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.json({
    success: true,
    data: project,
  })
})

const adminGetProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({
    displayOrder: 1,
    createdAt: -1,
  })

  res.json({
    success: true,
    count: projects.length,
    data: projects,
  })
})

const adminGetProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.json({
    success: true,
    data: project,
  })
})

const createProject = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    slug: req.body.slug || createSlug(req.body.title),
  }

  const project = await Project.create(payload)

  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project,
  })
})

const updateProject = asyncHandler(async (req, res) => {
  const payload = { ...req.body }

  if (payload.title && !payload.slug) {
    payload.slug = createSlug(payload.title)
  }

  const project = await Project.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  })

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  res.json({
    success: true,
    message: 'Project updated successfully',
    data: project,
  })
})

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  await project.deleteOne()

  res.json({
    success: true,
    message: 'Project deleted successfully',
  })
})

const toggleFeaturedProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  project.featured = !project.featured
  await project.save()

  res.json({
    success: true,
    message: 'Project featured status updated',
    data: project,
  })
})

const toggleProjectStatus = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(404)
    throw new Error('Project not found')
  }

  project.isActive = !project.isActive
  await project.save()

  res.json({
    success: true,
    message: 'Project status updated',
    data: project,
  })
})

module.exports = {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  adminGetProjects,
  adminGetProjectById,
  createProject,
  updateProject,
  deleteProject,
  toggleFeaturedProject,
  toggleProjectStatus,
}