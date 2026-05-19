const express = require('express')
const { getProfile, updateProfile } = require('../controllers/profileController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getProfile)
router.put('/', protectAdmin, updateProfile)

module.exports = router