import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiEdit,
  FiEye,
  FiFolder,
  FiPlus,
  FiRefreshCcw,
  FiStar,
  FiTrash2,
} from 'react-icons/fi'
import { adminProjectService } from '../../services/adminProjectService'
import { useToast } from '../../context/ToastContext'
import { useConfirm } from '../../context/ConfirmContext'

const statusClass = {
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-red-50 text-red-700',
}

const formatDate = (date) => {
  if (!date) return 'N/A'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

const ProjectsList = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [error, setError] = useState('')
  const { showToast } = useToast()
  const { confirm } = useConfirm()

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await adminProjectService.getProjects()
      setProjects(data)
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to load projects. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleDelete = async (project) => {
    confirm({
      title: 'Delete Project?',
      message: `Are you sure you want to delete "${project.title}"? This project will be removed from MongoDB.`,
      confirmText: 'Delete Project',
      danger: true,
      onConfirm: async () => {
        try {
          setActionLoading(project._id)

          await adminProjectService.deleteProject(project._id)

          setProjects((prev) => prev.filter((item) => item._id !== project._id))

          showToast({
            type: 'success',
            message: 'Project deleted successfully.',
          })
        } catch (error) {
          setError(
            error.response?.data?.message ||
            'Unable to delete project. Please try again.'
          )

          showToast({
            type: 'error',
            message: 'Unable to delete project.',
          })
        } finally {
          setActionLoading('')
        }
      },
    })
  }

  const handleToggleFeatured = async (project) => {
    try {
      setActionLoading(project._id)
      const response = await adminProjectService.toggleFeatured(project._id)

      setProjects((prev) =>
        prev.map((item) =>
          item._id === project._id ? response.data : item
        )
      )

      showToast({
        type: 'success',
        message: response.data.featured
          ? 'Project marked as featured.'
          : 'Project removed from featured list.',
      })
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to update featured status.'
      )
    } finally {
      setActionLoading('')
    }
  }

  const handleToggleStatus = async (project) => {
    try {
      setActionLoading(project._id)
      const response = await adminProjectService.toggleStatus(project._id)

      setProjects((prev) =>
        prev.map((item) =>
          item._id === project._id ? response.data : item
        )
      )

      showToast({
        type: 'success',
        message: response.data.isActive
          ? 'Project activated successfully.'
          : 'Project deactivated successfully.',
      })
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to update project status.'
      )
    } finally {
      setActionLoading('')
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-bold text-primary">Project Manager</p>
          <h1 className="text-3xl font-black text-dark">Projects</h1>
          <p className="mt-2 text-muted">
            Add, edit, delete, feature, and activate portfolio projects.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={loadProjects}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-soft disabled:opacity-60"
          >
            <FiRefreshCcw className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>

          <Link
            to="/admin/projects/create"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-primary-dark"
          >
            <FiPlus />
            Add Project
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="card-soft overflow-hidden">
        {loading ? (
          <div className="space-y-4 p-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-24 animate-pulse rounded-2xl bg-soft" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="divide-y divide-border">
            {projects.map((project) => (
              <div
                key={project._id}
                className="grid gap-5 p-6 lg:grid-cols-[1fr_auto] lg:items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary">
                    <FiFolder size={24} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-dark">
                        {project.title}
                      </h2>

                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary">
                          <FiStar />
                          Featured
                        </span>
                      )}

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${project.isActive
                          ? statusClass.active
                          : statusClass.inactive
                          }`}
                      >
                        {project.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-primary">
                      {project.category} • /projects/{project.slug}
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                      {project.shortDescription}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.techStack?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 text-xs font-semibold text-muted">
                      Created: {formatDate(project.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link
                    to={`/projects/${project.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-muted transition hover:border-primary hover:text-primary"
                  >
                    <FiEye />
                    View
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(project)}
                    disabled={actionLoading === project._id}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-muted transition hover:border-primary hover:text-primary disabled:opacity-60"
                  >
                    <FiStar />
                    {project.featured ? 'Unfeature' : 'Feature'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(project)}
                    disabled={actionLoading === project._id}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-muted transition hover:border-primary hover:text-primary disabled:opacity-60"
                  >
                    {project.isActive ? 'Deactivate' : 'Activate'}
                  </button>

                  <Link
                    to={`/admin/projects/edit/${project._id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-soft px-4 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                  >
                    <FiEdit />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(project)}
                    disabled={actionLoading === project._id}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FiFolder className="mx-auto text-primary" size={44} />
            <h2 className="mt-5 text-2xl font-black text-dark">
              No projects found
            </h2>
            <p className="mt-2 text-muted">
              Add your first portfolio project from the admin dashboard.
            </p>

            <Link
              to="/admin/projects/create"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white"
            >
              <FiPlus />
              Add Project
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsList