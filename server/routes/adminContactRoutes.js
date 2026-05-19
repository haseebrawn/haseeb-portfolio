const express = require('express')
const {
  adminGetMessages,
  adminGetMessageById,
  updateMessageStatus,
  deleteMessage,
} = require('../controllers/contactController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(protectAdmin)

router.get('/', adminGetMessages)
router.get('/:id', adminGetMessageById)
router.patch('/:id/status', updateMessageStatus)
router.delete('/:id', deleteMessage)

module.exports = router