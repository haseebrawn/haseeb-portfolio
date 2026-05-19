const fs = require('fs')
const path = require('path')
const multer = require('multer')

const uploadRoot = path.join(__dirname, '..', 'uploads')

const sanitizeFolderName = (folder = 'general') => {
  return folder
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '')
    .slice(0, 40) || 'general'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = sanitizeFolderName(req.query.folder || 'general')
    const folderPath = path.join(uploadRoot, folder)

    fs.mkdirSync(folderPath, { recursive: true })

    cb(null, folderPath)
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${extension}`

    cb(null, uniqueName)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ]

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

module.exports = upload