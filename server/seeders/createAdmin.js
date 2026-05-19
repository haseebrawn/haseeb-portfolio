const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const AdminUser = require('../models/AdminUser')

dotenv.config()

const createAdmin = async () => {
  try {
    console.log('Seeder started...')

    await connectDB()

    if (!process.env.ADMIN_NAME || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.error('ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD missing in .env')
      process.exit(1)
    }

    const existingAdmin = await AdminUser.findOne({
      email: process.env.ADMIN_EMAIL,
    })

    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email)
      await mongoose.connection.close()
      process.exit(0)
    }

    const admin = await AdminUser.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    })

    console.log('Admin created successfully:', admin.email)

    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error('Seeder error:', error.message)
    process.exit(1)
  }
}

createAdmin()