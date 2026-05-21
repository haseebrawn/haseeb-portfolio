const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./config/db')
const createApp = require('./app')

dotenv.config({ path: path.join(__dirname, '.env') })

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  const app = createApp()

  if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '..', 'client', 'dist')

    app.use(require('express').static(clientDistPath))

    app.get(/^(?!\/api|\/uploads).*/, (req, res) => {
      res.sendFile(path.join(clientDistPath, 'index.html'))
    })
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
