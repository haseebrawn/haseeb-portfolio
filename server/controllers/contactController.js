const ContactMessage = require('../models/ContactMessage')
const asyncHandler = require('../utils/asyncHandler')

const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    res.status(400)
    throw new Error('All fields are required')
  }

  const contactMessage = await ContactMessage.create({
    name,
    email,
    subject,
    message,
  })

  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: contactMessage,
  })
})

const adminGetMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 })

  res.json({
    success: true,
    count: messages.length,
    data: messages,
  })
})

const adminGetMessageById = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id)

  if (!message) {
    res.status(404)
    throw new Error('Message not found')
  }

  res.json({
    success: true,
    data: message,
  })
})

const updateMessageStatus = asyncHandler(async (req, res) => {
  const { status } = req.body

  if (!['unread', 'read', 'replied'].includes(status)) {
    res.status(400)
    throw new Error('Invalid message status')
  }

  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  )

  if (!message) {
    res.status(404)
    throw new Error('Message not found')
  }

  res.json({
    success: true,
    message: 'Message status updated',
    data: message,
  })
})

const deleteMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id)

  if (!message) {
    res.status(404)
    throw new Error('Message not found')
  }

  await message.deleteOne()

  res.json({
    success: true,
    message: 'Message deleted successfully',
  })
})

module.exports = {
  createContactMessage,
  adminGetMessages,
  adminGetMessageById,
  updateMessageStatus,
  deleteMessage,
}