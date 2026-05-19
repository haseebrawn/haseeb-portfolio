const express = require('express')
const {
  adminGetProjects,
  adminGetProjectById,
  createProject,
  updateProject,
  deleteProject,
  toggleFeaturedProject,
  toggleProjectStatus,
} = require('../controllers/projectController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(protectAdmin)

router.get('/', adminGetProjects)
router.get('/:id', adminGetProjectById)
router.post('/', createProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)
router.patch('/:id/featured', toggleFeaturedProject)
router.patch('/:id/status', toggleProjectStatus)

module.exports = router