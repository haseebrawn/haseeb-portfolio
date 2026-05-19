import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiCode,
  FiFolder,
  FiMail,
  FiRefreshCcw,
  FiStar,
  FiEye,
  FiMessageCircle,
  FiArrowRight,
  FiBriefcase,
} from 'react-icons/fi'
import AdminStatCard from '../../components/admin/AdminStatCard'
import { useAuth } from '../../context/AuthContext'
import { adminDashboardService } from '../../services/adminDashboardService'

const defaultDashboardData = {
  stats: {
    totalProjects: 0,
    activeProjects: 0,
    featuredProjects: 0,
    inactiveProjects: 0,
    totalSkills: 0,
    activeSkills: 0,
    totalExperience: 0,
    activeExperience: 0,
    totalMessages: 0,
    unreadMessages: 0,
    readMessages: 0,
    repliedMessages: 0,
  },
  recentMessages: [],
  recentProjects: [],
}

const formatDate = (date) => {
  if (!date) return 'N/A'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const statusClass = {
  unread: 'bg-blue-50 text-primary',
  read: 'bg-yellow-50 text-yellow-700',
  replied: 'bg-green-50 text-green-700',
}

const Dashboard = () => {
  const { admin } = useAuth()

  const [dashboardData, setDashboardData] = useState(defaultDashboardData)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const loadDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      setError('')

      const data = await adminDashboardService.getStats()
      setDashboardData(data)
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to load dashboard data. Please try again.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const { stats, recentMessages, recentProjects } = dashboardData

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-bold text-primary">
            Welcome back, {admin?.name || 'Admin'}
          </p>

          <h1 className="text-3xl font-black text-dark">Admin Dashboard</h1>

          <p className="mt-2 text-muted">
            Manage portfolio projects, skills, profile data, and contact messages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadDashboard(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiRefreshCcw className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing...' : 'Refresh Dashboard'}
        </button>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={FiFolder}
          description={`${stats.activeProjects} active projects`}
          trend={`${stats.inactiveProjects} inactive`}
          loading={loading}
        />

        <AdminStatCard
          title="Total Skills"
          value={stats.totalSkills}
          icon={FiCode}
          description={`${stats.activeSkills} active skills`}
          trend="Skills database"
          loading={loading}
        />

        <AdminStatCard
          title="Experience"
          value={stats.totalExperience}
          icon={FiBriefcase}
          description={`${stats.activeExperience} active experience entries`}
          trend="Professional background"
          loading={loading}
        />

        <AdminStatCard
          title="Messages"
          value={stats.totalMessages}
          icon={FiMail}
          description={`${stats.unreadMessages} unread messages`}
          trend={`${stats.repliedMessages} replied`}
          loading={loading}
        />

        <AdminStatCard
          title="Featured"
          value={stats.featuredProjects}
          icon={FiStar}
          description="Featured portfolio projects"
          trend="Shown on homepage"
          loading={loading}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="card-soft p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-dark">Recent Projects</h2>
              <p className="mt-1 text-sm text-muted">
                Latest projects added to portfolio.
              </p>
            </div>

            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-soft px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-20 animate-pulse rounded-2xl bg-soft"
                />
              ))}
            </div>
          ) : recentProjects.length > 0 ? (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-soft p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary">
                      <FiFolder />
                    </div>

                    <div>
                      <h3 className="font-black text-dark">{project.title}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {project.category} • {formatDate(project.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {project.featured && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary">
                        Featured
                      </span>
                    )}

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${project.isActive
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                        }`}
                    >
                      {project.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-soft p-8 text-center">
              <FiFolder className="mx-auto text-primary" size={34} />
              <h3 className="mt-4 text-lg font-black text-dark">
                No projects yet
              </h3>
              <p className="mt-2 text-sm text-muted">
                Add your first project from the projects manager.
              </p>
            </div>
          )}
        </div>

        <div className="card-soft p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-dark">Recent Messages</h2>
              <p className="mt-1 text-sm text-muted">
                Latest contact form submissions.
              </p>
            </div>

            <Link
              to="/admin/messages"
              className="inline-flex items-center gap-2 rounded-xl bg-soft px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-2xl bg-soft"
                />
              ))}
            </div>
          ) : recentMessages.length > 0 ? (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message._id}
                  className="rounded-2xl border border-border bg-soft p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                        <FiMessageCircle />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-black text-dark">
                          {message.subject}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-primary">
                          {message.name}
                        </p>

                        <p className="mt-1 truncate text-sm text-muted">
                          {message.email}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${statusClass[message.status] || statusClass.unread
                        }`}
                    >
                      {message.status}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
                    {message.message}
                  </p>

                  <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-muted">
                    <FiEye />
                    {formatDate(message.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-soft p-8 text-center">
              <FiMail className="mx-auto text-primary" size={34} />
              <h3 className="mt-4 text-lg font-black text-dark">
                No messages yet
              </h3>
              <p className="mt-2 text-sm text-muted">
                Contact form messages will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard