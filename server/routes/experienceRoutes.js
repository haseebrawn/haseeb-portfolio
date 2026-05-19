const express = require('express')
const { getPublicExperiences } = require('../controllers/experienceController')

const router = express.Router()

router.get('/', getPublicExperiences)

module.exports = router