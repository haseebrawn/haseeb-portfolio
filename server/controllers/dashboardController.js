const Project = require('../models/Project')
const Skill = require('../models/Skill')
const ContactMessage = require('../models/ContactMessage')
const Experience = require('../models/Experience')
const asyncHandler = require('../utils/asyncHandler')

const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    activeProjects,
    featuredProjects,
    inactiveProjects,
    totalSkills,
    activeSkills,
    totalExperience,
    activeExperience,
    currentExperience,
    totalMessages,
    unreadMessages,
    readMessages,
    repliedMessages,
    recentMessages,
    recentProjects,
    currentRole,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ isActive: true }),
    Project.countDocuments({ featured: true }),
    Project.countDocuments({ isActive: false }),

    Skill.countDocuments(),
    Skill.countDocuments({ isActive: true }),

    Experience.countDocuments(),
    Experience.countDocuments({ isCurrent: true }),
    Experience.countDocuments({ isCurrent: true }),

    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ status: 'unread' }),
    ContactMessage.countDocuments({ status: 'read' }),
    ContactMessage.countDocuments({ status: 'replied' }),

    ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject message status createdAt'),

    Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title slug category featured isActive createdAt'),

    Experience.findOne({ isCurrent: true })
      .sort({ displayOrder: 1, startDate: -1 })
      .select('title company employmentType startDate isCurrent'),
  ])

  res.json({
    success: true,
    data: {
      stats: {
        totalProjects,
        activeProjects,
        featuredProjects,
        inactiveProjects,
        totalSkills,
        activeSkills,
        totalExperience,
        activeExperience,
        currentExperience,
        totalMessages,
        unreadMessages,
        readMessages,
        repliedMessages,
        totalExperiences: totalExperience,
        activeExperiences: activeExperience,
      },
      recentMessages,
      recentProjects,
      currentRole,
    },
  })
})

module.exports = {
  getDashboardStats,
}
