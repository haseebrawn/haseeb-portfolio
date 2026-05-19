import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProjectForm from '../../components/admin/projects/ProjectForm'
import { adminProjectService } from '../../services/adminProjectService'
import {useToast} from '../../context/ToastContext'

const EditProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProject = async () => {
      try {
        setPageLoading(true)
        setError('')

        const data = await adminProjectService.getProjectById(id)
        setProject(data)
      } catch (error) {
        setError(
          error.response?.data?.message ||
            'Unable to load project. Please try again.'
        )
      } finally {
        setPageLoading(false)
      }
    }

    loadProject()
  }, [id])

  const handleUpdateProject = async (payload) => {
    setLoading(true)

    try {
      await adminProjectService.updateProject(id, payload)
      showToast({
        type: 'success',
        message: 'Project updated successfully.',
      })
      
      navigate('/admin/projects')
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="card-soft p-10 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
        <h1 className="mt-6 text-2xl font-black text-dark">
          Loading Project
        </h1>
        <p className="mt-2 text-sm text-muted">Please wait...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-soft p-10 text-center">
        <h1 className="text-2xl font-black text-dark">Unable to Load Project</h1>
        <p className="mt-3 text-sm text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold text-primary">Edit Project</p>
        <h1 className="text-3xl font-black text-dark">
          Edit {project?.title}
        </h1>
        <p className="mt-2 text-muted">
          Update project information, case study content, and display status.
        </p>
      </div>

      <ProjectForm
        initialData={project}
        onSubmit={handleUpdateProject}
        submitLabel="Update Project"
        loading={loading}
      />
    </div>
  )
}

export default EditProject