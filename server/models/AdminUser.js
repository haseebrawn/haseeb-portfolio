const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Admin name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Admin email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Admin password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false,
        },
        role: {
            type: String,
            default: 'admin',
            enum: ['admin'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

adminUserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

adminUserSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('AdminUser', adminUserSchema)