const AdminUser = require('../models/AdminUser')
const asyncHandler = require('../utils/asyncHandler')
const generateToken = require('../utils/generateToken')

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const admin = await AdminUser.findOne({ email }).select('+password')

  if (!admin || !admin.isActive) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  const isMatch = await admin.matchPassword(password)

  if (!isMatch) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  admin.lastLogin = new Date()
  await admin.save()

  const token = generateToken(admin._id)

  res.cookie('adminToken', token, cookieOptions)

  res.json({
    success: true,
    message: 'Admin login successful',
    token,
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  })
})

const getAdminProfile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.admin,
  })
})

const logoutAdmin = asyncHandler(async (req, res) => {
  res.clearCookie('adminToken')

  res.json({
    success: true,
    message: 'Admin logged out successfully',
  })
})

module.exports = {
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
}