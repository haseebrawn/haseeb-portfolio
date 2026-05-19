const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const ensureUploadFolders = require('./utils/ensureUploadFolders')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config({ path: path.join(__dirname, '.env') })
ensureUploadFolders()

const app = express()

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }

    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true)
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  })
)

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Muhammad Haseeb Portfolio API is running',
    })
  })
}

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Muhammad Haseeb Portfolio API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/admin/auth', require('./routes/authRoutes'))
app.use('/api/admin/dashboard', require('./routes/dashboardRoutes'))
app.use('/api/admin/projects', require('./routes/adminProjectRoutes'))
app.use('/api/admin/skills', require('./routes/adminSkillRoutes'))
app.use('/api/admin/messages', require('./routes/adminContactRoutes'))
app.use('/api/admin/uploads', require('./routes/adminUploadRoutes'))
app.use('/api/admin/experiences', require('./routes/adminExperienceRoutes'))

app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/skills', require('./routes/skillRoutes'))
app.use('/api/contact', require('./routes/contactRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))
app.use('/api/experiences', require('./routes/experienceRoutes'))

if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '..', 'client', 'dist')

  app.use(express.static(clientDistPath))

  app.get(/^(?!\/api|\/uploads).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'))
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
