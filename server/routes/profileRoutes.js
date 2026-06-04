const express = require('express')
const {
  getProfile,
  downloadResume,
  updateProfile,
} = require('../controllers/profileController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/resume', downloadResume)
router.get('/', getProfile)
router.put('/', protectAdmin, updateProfile)

module.exports = router
