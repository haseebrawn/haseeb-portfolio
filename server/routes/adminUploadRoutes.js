const express = require('express')
const upload = require('../middleware/uploadMiddleware')
const { protectAdmin } = require('../middleware/authMiddleware')
const {
  uploadSingleImage,
  uploadMultipleImages,
} = require('../controllers/uploadController')

const router = express.Router()

router.use(protectAdmin)

router.post('/single', upload.single('image'), uploadSingleImage)
router.post('/multiple', upload.array('images', 10), uploadMultipleImages)

module.exports = router