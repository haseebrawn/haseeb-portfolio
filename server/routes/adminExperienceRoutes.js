const express = require('express')
const { protectAdmin } = require('../middleware/authMiddleware')
const {
  getAdminExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  toggleExperienceStatus,
} = require('../controllers/experienceController')

const router = express.Router()

router.use(protectAdmin)

router.get('/', getAdminExperiences)
router.get('/:id', getExperienceById)
router.post('/', createExperience)
router.put('/:id', updateExperience)
router.delete('/:id', deleteExperience)
router.patch('/:id/status', toggleExperienceStatus)

module.exports = router