import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectForm from '../../components/admin/projects/ProjectForm'
import { adminProjectService } from '../../services/adminProjectService'
import {useToast} from '../../context/ToastContext'

const AddProject = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const handleCreateProject = async (payload) => {
    setLoading(true)

    try {
      await adminProjectService.createProject(payload)
    
      showToast({
        type: 'success',
        message: 'Project created successfully.',
      })

      navigate('/admin/projects')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold text-primary">Create Project</p>
        <h1 className="text-3xl font-black text-dark">Add New Project</h1>
        <p className="mt-2 text-muted">
          Add a new portfolio project and case study details.
        </p>
      </div>

      <ProjectForm
        onSubmit={handleCreateProject}
        submitLabel="Create Project"
        loading={loading}
      />
    </div>
  )
}

export default AddProject