const fs = require('fs')
const path = require('path')

const ensureUploadFolders = () => {
  const folders = [
    path.join(__dirname, '..', 'uploads'),
    path.join(__dirname, '..', 'uploads', 'avatars'),
    path.join(__dirname, '..', 'uploads', 'projects'),
    path.join(__dirname, '..', 'uploads', 'general'),
  ]

  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
    }
  })
}

module.exports = ensureUploadFolders
