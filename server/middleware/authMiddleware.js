const jwt = require('jsonwebtoken')
const asyncHandler = require('../utils/asyncHandler')
const AdminUser = require('../models/AdminUser')

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token && req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, token missing')
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const admin = await AdminUser.findById(decoded.id).select('-password')

  if (!admin || !admin.isActive) {
    res.status(401)
    throw new Error('Not authorized, admin not found')
  }

  req.admin = admin

  next()
})

module.exports = {
  protectAdmin,
}