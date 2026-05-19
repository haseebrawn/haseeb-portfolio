import { useEffect, useState } from 'react'
import { FiSave, FiX } from 'react-icons/fi'

const initialForm = {
  name: '',
  category: 'Frontend',
  level: 'Intermediate',
  percentage: 70,
  icon: 'FiCode',
  color: 'text-primary',
  description: '',
  displayOrder: 0,
  isActive: true,
}

const iconOptions = [
  'SiReact',
  'SiJavascript',
  'SiTailwindcss',
  'SiNodedotjs',
  'SiExpress',
  'SiMongodb',
  'SiGit',
  'SiGithub',
  'SiPostman',
  'SiVercel',
  'SiNetlify',
  'SiNpm',
  'FiCode',
  'FiDatabase',
  'FiServer',
]

const colorOptions = [
  'text-primary',
  'text-cyan-500',
  'text-yellow-500',
  'text-green-600',
  'text-orange-600',
  'text-orange-500',
  'text-red-600',
  'text-dark',
]

const SkillForm = ({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Save Skill',
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!initialData) {
      setFormData(initialForm)
      return
    }

    setFormData({
      name: initialData.name || '',
      category: initialData.category || 'Frontend',
      level: initialData.level || 'Intermediate',
      percentage: initialData.percentage || 70,
      icon: initialData.icon || 'FiCode',
      color: initialData.color || 'text-primary',
      description: initialData.description || '',
      displayOrder: initialData.displayOrder || 0,
      isActive: Boolean(initialData.isActive),
    })
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
      api: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Skill name is required'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    const percentage = Number(formData.percentage)

    if (Number.isNaN(percentage) || percentage < 0 || percentage > 100) {
      newErrors.percentage = 'Percentage must be between 0 and 100'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const payload = {
      name: formData.name,
      category: formData.category,
      level: formData.level,
      percentage: Number(formData.percentage),
      icon: formData.icon,
      color: formData.color,
      description: formData.description,
      displayOrder: Number(formData.displayOrder) || 0,
      isActive: formData.isActive,
    }

    try {
      await onSubmit(payload)
      setFormData(initialForm)
    } catch (error) {
      setErrors({
        api:
          error.response?.data?.message ||
          'Something went wrong. Please try again.',
      })
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-border bg-white px-4 py-4 text-sm text-dark outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-blue-500/10'

  const labelClass = 'mb-2 block text-sm font-bold text-dark'
  const errorClass = 'mt-2 text-sm font-semibold text-red-500'

  return (
    <form onSubmit={handleSubmit} className="card-soft p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-dark">
            {initialData ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          <p className="mt-1 text-sm text-muted">
            Manage skill name, category, icon, level, and display status.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft text-muted transition hover:bg-red-50 hover:text-red-600"
        >
          <FiX />
        </button>
      </div>

      {errors.api && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {errors.api}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass}>Skill Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="React.js"
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>Tools</option>
            <option>Deployment</option>
          </select>
          {errors.category && <p className={errorClass}>{errors.category}</p>}
        </div>

        <div>
          <label className={labelClass}>Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Basic</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Percentage</label>
          <input
            type="number"
            name="percentage"
            min="0"
            max="100"
            value={formData.percentage}
            onChange={handleChange}
            className={inputClass}
            placeholder="88"
          />
          {errors.percentage && (
            <p className={errorClass}>{errors.percentage}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Icon</label>
          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className={inputClass}
          >
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Color Class</label>
          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className={inputClass}
          >
            {colorOptions.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Display Order</label>
          <input
            type="number"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-sm font-bold text-dark">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Active Skill
          </label>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`${inputClass} min-h-28 resize-none`}
          placeholder="Building modern, reusable, and responsive user interfaces."
        />
        {errors.description && (
          <p className={errorClass}>{errors.description}</p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiSave />
          {loading ? 'Saving...' : submitLabel}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-6 py-4 text-sm font-bold text-muted transition hover:border-primary hover:text-primary"
        >
          <FiX />
          Cancel
        </button>
      </div>
    </form>
  )
}

export default SkillForm