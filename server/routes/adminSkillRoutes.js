const express = require('express')
const {
  adminGetSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  toggleSkillStatus,
} = require('../controllers/skillController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(protectAdmin)

router.get('/', adminGetSkills)
router.post('/', createSkill)
router.put('/:id', updateSkill)
router.delete('/:id', deleteSkill)
router.patch('/:id/status', toggleSkillStatus)

module.exports = router