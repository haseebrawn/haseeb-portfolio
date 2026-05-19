import { useEffect, useMemo, useState } from 'react'
import {
  FiCode,
  FiEdit,
  FiPlus,
  FiRefreshCcw,
  FiTrash2,
} from 'react-icons/fi'
import { getSkillIcon } from '../../utils/iconMap'
import { adminSkillService } from '../../services/adminSkillService'
import SkillForm from '../../components/admin/skills/SkillForm'
import { useToast } from '../../context/ToastContext'
import { useConfirm } from '../../context/ConfirmContext'

const statusClass = {
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-red-50 text-red-700',
}

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Deployment']

const SkillsManager = () => {
  const [skills, setSkills] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState('')
  const [error, setError] = useState('')
  const { showToast } = useToast()
  const { showConfirm } = useConfirm()

  const loadSkills = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await adminSkillService.getSkills()
      setSkills(data)
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to load skills. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSkills()
  }, [])

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills

    return skills.filter((skill) => skill.category === activeCategory)
  }, [activeCategory, skills])

  const handleAddClick = () => {
    setEditingSkill(null)
    setShowForm(true)
    setError('')
  }

  const handleEditClick = (skill) => {
    setEditingSkill(skill)
    setShowForm(true)
    setError('')
  }

  const handleCancelForm = () => {
    setEditingSkill(null)
    setShowForm(false)
  }

  const handleSubmitSkill = async (payload) => {
    setFormLoading(true)

    try {
      if (editingSkill) {
        const response = await adminSkillService.updateSkill(editingSkill._id, payload)

        setSkills((prev) =>
          prev.map((item) =>
            item._id === editingSkill._id ? response.data : item
          )
        )

        showToast({
          type: 'success',
          message: 'Skill updated and saved in MongoDB.',
        })
      } else {
        const response = await adminSkillService.createSkill(payload)

        setSkills((prev) => [response.data, ...prev])

        showToast({
          type: 'success',
          message: 'Skill created and saved in MongoDB.',
        })
      }

      setEditingSkill(null)
      setShowForm(false)
    } finally {
      setFormLoading(false)
    }
  }

  const handleToggleStatus = async (skill) => {
    try {
      setActionLoading(skill._id)
      const response = await adminSkillService.toggleStatus(skill._id)

      setSkills((prev) =>
        prev.map((item) => (item._id === skill._id ? response.data : item))
      )

      showToast({
        type: 'success',
        message: response.data.isActive
          ? 'Skill activated successfully.'
          : 'Skill deactivated successfully.',
      })
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Unable to update skill status. Please try again.'
      )
    } finally {
      setActionLoading('')
    }
  }

  const handleDelete = async (skill) => {
    confirm({
      title: 'Delete Skill?',
      message: `Are you sure you want to delete "${skill.name}"? This skill will be removed from MongoDB.`,
      confirmText: 'Delete Skill',
      danger: true,
      onConfirm: async () => {
        try {
          setActionLoading(skill._id)

          await adminSkillService.deleteSkill(skill._id)

          setSkills((prev) => prev.filter((item) => item._id !== skill._id))

          showToast({
            type: 'success',
            message: 'Skill deleted successfully.',
          })
        } catch (error) {
          setError(
            error.response?.data?.message ||
            'Unable to delete skill. Please try again.'
          )

          showToast({
            type: 'error',
            message: 'Unable to delete skill.',
          })
        } finally {
          setActionLoading('')
        }
      },
    })
  }

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-bold text-primary">Skills Manager</p>
          <h1 className="text-3xl font-black text-dark">Skills</h1>
          <p className="mt-2 text-muted">
            Add, edit, delete, activate, and organize technical skills.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={loadSkills}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-5 py-3 text-sm font-bold text-primary transition hover:border-primary hover:bg-soft disabled:opacity-60"
          >
            <FiRefreshCcw className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleAddClick}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-primary-dark"
          >
            <FiPlus />
            Add Skill
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-8">
          <SkillForm
            initialData={editingSkill}
            onSubmit={handleSubmitSkill}
            onCancel={handleCancelForm}
            submitLabel={editingSkill ? 'Update Skill' : 'Create Skill'}
            loading={formLoading}
          />
        </div>
      )}

      <div className="mb-8 flex flex-wrap gap-3 rounded-3xl border border-border bg-white p-3 shadow-sm">
        {categories.map((category) => {
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${isActive
                ? 'bg-primary text-white shadow-lg shadow-blue-500/20'
                : 'text-muted hover:bg-soft hover:text-primary'
                }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="card-soft overflow-hidden">
        {loading ? (
          <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-56 animate-pulse rounded-2xl bg-soft" />
            ))}
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map((skill) => {
              const Icon = getSkillIcon(skill.icon)

              return (
                <div
                  key={skill._id}
                  className="rounded-3xl border border-border bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-soft">
                      <Icon className={`text-4xl ${skill.color}`} />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${skill.isActive
                        ? statusClass.active
                        : statusClass.inactive
                        }`}
                    >
                      {skill.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-dark">
                        {skill.name}
                      </h2>

                      <span className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
                        {skill.level}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-primary">
                      {skill.category}
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
                      {skill.description}
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-muted">
                        Skill Level
                      </span>
                      <span className="text-xs font-bold text-primary">
                        {skill.percentage}%
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-border">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(skill)}
                      disabled={actionLoading === skill._id}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-muted transition hover:border-primary hover:text-primary disabled:opacity-60"
                    >
                      {skill.isActive ? 'Deactivate' : 'Activate'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEditClick(skill)}
                      className="inline-flex items-center gap-2 rounded-xl bg-soft px-4 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                    >
                      <FiEdit />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(skill)}
                      disabled={actionLoading === skill._id}
                      className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-60"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FiCode className="mx-auto text-primary" size={44} />
            <h2 className="mt-5 text-2xl font-black text-dark">
              No skills found
            </h2>
            <p className="mt-2 text-muted">
              Add your first skill or change the selected category filter.
            </p>

            <button
              type="button"
              onClick={handleAddClick}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white"
            >
              <FiPlus />
              Add Skill
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsManager