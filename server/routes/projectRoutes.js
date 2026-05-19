const express = require('express')
const {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
} = require('../controllers/projectController')

const router = express.Router()

router.get('/', getProjects)
router.get('/featured', getFeaturedProjects)
router.get('/:slug', getProjectBySlug)

module.exports = router