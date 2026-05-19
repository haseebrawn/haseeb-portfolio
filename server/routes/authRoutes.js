const express = require('express')
const {
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
} = require('../controllers/authController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login', loginAdmin)
router.get('/me', protectAdmin, getAdminProfile)
router.post('/logout', protectAdmin, logoutAdmin)

module.exports = router