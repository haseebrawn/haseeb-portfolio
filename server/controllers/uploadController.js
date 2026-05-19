const path = require('path')
const asyncHandler = require('../utils/asyncHandler')

const getFileUrl = (req, file) => {
  const baseUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`
  const folder = path.basename(file.destination)

  return `${baseUrl}/uploads/${folder}/${file.filename}`
}

const uploadSingleImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400)
    throw new Error('Please upload an image')
  }

  const fileUrl = getFileUrl(req, req.file)

  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully',
    file: {
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  })
})

const uploadMultipleImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400)
    throw new Error('Please upload at least one image')
  }

  const files = req.files.map((file) => ({
    url: getFileUrl(req, file),
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
  }))

  res.status(201).json({
    success: true,
    message: 'Images uploaded successfully',
    files,
  })
})

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
}