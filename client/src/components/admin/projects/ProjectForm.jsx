import { useEffect, useState } from 'react'
import { FiSave, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ImageUpload from '../uploads/ImageUpload'

const defaultProcess = `01|Planning|Requirement analysis, feature planning, and project structure.
02|UI Design|Clean responsive interface design based on user flow.
03|Development|Frontend, backend, APIs, database, and feature implementation.
04|Testing|Bug fixing, responsive testing, API testing, and UI polish.
05|Delivery|Final deployment-ready structure and clean source code.`

const initialForm = {
  title: '',
  slug: '',
  category: 'Web App',
  subtitle: '',
  shortDescription: '',
  fullDescription: '',
  problemStatement: '',
  solution: '',
  techStack: '',
  features: '',
  results: '',
  gallery: '',
  thumbnail: '',
  images: '',
  process: defaultProcess,
  timeline: '',
  role: 'Full Stack Developer',
  team: 'Solo Project',
  preview: 'dashboard',
  liveUrl: '#',
  githubUrl: '#',
  displayOrder: 0,
  featured: false,
  isActive: true,
}

const createSlug = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const isValidUrlOrHash = (value) => {
  if (!value || value === '#') return true

  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

const arrayToComma = (array = []) => array.join(', ')

const arrayToLines = (array = []) => array.join('\n')

const resultsToLines = (results = []) => {
  return results.map((item) => `${item.value}|${item.label}`).join('\n')
}

const processToLines = (process = []) => {
  return process
    .map((item) => `${item.step}|${item.title}|${item.description}`)
    .join('\n')
}

const commaToArray = (value) => {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

const linesToArray = (value) => {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

const parseResults = (value) => {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [resultValue, label] = line.split('|')

      return {
        value: resultValue?.trim() || '',
        label: label?.trim() || '',
      }
    })
    .filter((item) => item.value && item.label)
}

const parseProcess = (value) => {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [step, title, description] = line.split('|')

      return {
        step: step?.trim() || '',
        title: title?.trim() || '',
        description: description?.trim() || '',
      }
    })
    .filter((item) => item.step && item.title && item.description)
}

const ProjectForm = ({ initialData, onSubmit, submitLabel = 'Save Project', loading }) => {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!initialData) return

    setFormData({
      title: initialData.title || '',
      slug: initialData.slug || '',
      category: initialData.category || 'Web App',
      subtitle: initialData.subtitle || '',
      shortDescription: initialData.shortDescription || '',
      fullDescription: initialData.fullDescription || '',
      problemStatement: initialData.problemStatement || '',
      solution: initialData.solution || '',
      techStack: arrayToComma(initialData.techStack),
      features: arrayToLines(initialData.features),
      results: resultsToLines(initialData.results),
      gallery: arrayToComma(initialData.gallery),
      thumbnail: initialData.thumbnail || '',
      images: arrayToLines(initialData.images),
      process: initialData.process?.length ? processToLines(initialData.process) : defaultProcess,
      timeline: initialData.timeline || '',
      role: initialData.role || 'Full Stack Developer',
      team: initialData.team || 'Solo Project',
      preview: initialData.preview || 'dashboard',
      liveUrl: initialData.liveUrl || '#',
      githubUrl: initialData.githubUrl || '#',
      displayOrder: initialData.displayOrder || 0,
      featured: Boolean(initialData.featured),
      isActive: Boolean(initialData.isActive),
    })
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }

      if (name === 'title' && !prev.slug) {
        updated.slug = createSlug(value)
      }

      return updated
    })

    setErrors((prev) => ({
      ...prev,
      [name]: '',
      api: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required'
    }

    if (!isValidUrlOrHash(formData.liveUrl)) {
      newErrors.liveUrl = 'Live URL must be a valid URL or #'
    }

    if (!isValidUrlOrHash(formData.githubUrl)) {
      newErrors.githubUrl = 'GitHub URL must be a valid URL or #'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const payload = {
      title: formData.title,
      slug: formData.slug || createSlug(formData.title),
      category: formData.category,
      subtitle: formData.subtitle,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      problemStatement: formData.problemStatement,
      solution: formData.solution,
      techStack: commaToArray(formData.techStack),
      features: linesToArray(formData.features),
      results: parseResults(formData.results),
      gallery: commaToArray(formData.gallery),
      thumbnail: formData.thumbnail,
      images: linesToArray(formData.images),
      process: parseProcess(formData.process),
      timeline: formData.timeline,
      role: formData.role,
      team: formData.team,
      preview: formData.preview,
      liveUrl: formData.liveUrl || '#',
      githubUrl: formData.githubUrl || '#',
      displayOrder: Number(formData.displayOrder) || 0,
      featured: formData.featured,
      isActive: formData.isActive,
    }

    try {
      await onSubmit(payload)
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.api && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {errors.api}
        </div>
      )}

      <div className="card-soft p-6">
        <h2 className="mb-6 text-xl font-black text-dark">Basic Information</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Project Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              placeholder="DevConnect"
            />
            {errors.title && <p className={errorClass}>{errors.title}</p>}
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className={inputClass}
              placeholder="devconnect"
            />
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Web App</option>
              <option>Dashboard</option>
              <option>Ecommerce</option>
              <option>Learning Platform</option>
              <option>API</option>
            </select>
            {errors.category && <p className={errorClass}>{errors.category}</p>}
          </div>

          <div>
            <label className={labelClass}>Preview Type</label>
            <select
              name="preview"
              value={formData.preview}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="social">Social</option>
              <option value="ecommerce">Ecommerce</option>
              <option value="dashboard">Dashboard</option>
              <option value="hiring">Hiring</option>
              <option value="learning">Learning</option>
              <option value="analytics">Analytics</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Subtitle</label>
            <input
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className={inputClass}
              placeholder="Connect. Collaborate. Grow."
            />
          </div>

          <div>
            <label className={labelClass}>Timeline</label>
            <input
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={inputClass}
              placeholder="6 Weeks"
            />
          </div>

          <div>
            <label className={labelClass}>Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputClass}
              placeholder="Full Stack Developer"
            />
          </div>

          <div>
            <label className={labelClass}>Team</label>
            <input
              name="team"
              value={formData.team}
              onChange={handleChange}
              className={inputClass}
              placeholder="Solo Project"
            />
          </div>
        </div>
      </div>

      <div className="card-soft p-6">
        <h2 className="mb-6 text-xl font-black text-dark">Descriptions</h2>

        <div className="space-y-5">
          <div>
            <label className={labelClass}>Short Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className={`${inputClass} min-h-28 resize-none`}
              placeholder="Short summary for project cards"
            />
            {errors.shortDescription && (
              <p className={errorClass}>{errors.shortDescription}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Full Description</label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              className={`${inputClass} min-h-32 resize-none`}
              placeholder="Full case study overview"
            />
          </div>

          <div>
            <label className={labelClass}>Problem Statement</label>
            <textarea
              name="problemStatement"
              value={formData.problemStatement}
              onChange={handleChange}
              className={`${inputClass} min-h-28 resize-none`}
              placeholder="What problem does this project solve?"
            />
          </div>

          <div>
            <label className={labelClass}>Solution</label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              className={`${inputClass} min-h-28 resize-none`}
              placeholder="How does the project solve the problem?"
            />
          </div>
        </div>
      </div>

      <div className="card-soft p-6">
        <h2 className="mb-6 text-xl font-black text-dark">Project Details</h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Tech Stack</label>
            <textarea
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className={`${inputClass} min-h-28 resize-none`}
              placeholder="MERN, Socket.io, Tailwind CSS"
            />
            <p className="mt-2 text-xs text-muted">Use comma separated values.</p>
          </div>

          <div>
            <label className={labelClass}>Gallery</label>
            <textarea
              name="gallery"
              value={formData.gallery}
              onChange={handleChange}
              className={`${inputClass} min-h-28 resize-none`}
              placeholder="Home Feed, Dashboard, Reports"
            />
            <p className="mt-2 text-xs text-muted">Use comma separated values.</p>
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Features</label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            className={`${inputClass} min-h-40 resize-none`}
            placeholder="Write one feature per line"
          />
          <p className="mt-2 text-xs text-muted">Write one feature per line.</p>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Results</label>
          <textarea
            name="results"
            value={formData.results}
            onChange={handleChange}
            className={`${inputClass} min-h-32 resize-none`}
            placeholder={`500+|Demo Users\n95%|Positive Feedback`}
          />
          <p className="mt-2 text-xs text-muted">
            Format: value|label. Write one result per line.
          </p>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Development Process</label>
          <textarea
            name="process"
            value={formData.process}
            onChange={handleChange}
            className={`${inputClass} min-h-48 resize-none`}
          />
          <p className="mt-2 text-xs text-muted">
            Format: step|title|description. Write one process step per line.
          </p>
        </div>
      </div>

      <div className="card-soft p-6">
        <h2 className="mb-6 text-xl font-black text-dark">Project Images</h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <ImageUpload
            label="Project Thumbnail"
            folder="projects"
            value={formData.thumbnail}
            onUpload={(url) =>
              setFormData((prev) => ({
                ...prev,
                thumbnail: url,
              }))
            }
            onRemove={() =>
              setFormData((prev) => ({
                ...prev,
                thumbnail: '',
              }))
            }
          />

          <ImageUpload
            label="Project Gallery Images"
            folder="projects"
            multiple
            values={linesToArray(formData.images)}
            onUploadMultiple={(urls) =>
              setFormData((prev) => {
                const currentImages = linesToArray(prev.images)
                const updatedImages = [...currentImages, ...urls]

                return {
                  ...prev,
                  images: updatedImages.join('\n'),
                }
              })
            }
            onRemoveItem={(url) =>
              setFormData((prev) => ({
                ...prev,
                images: linesToArray(prev.images)
                  .filter((item) => item !== url)
                  .join('\n'),
              }))
            }
          />
        </div>

        <div className="mt-6">
          <label className={labelClass}>Gallery Image URLs</label>

          <textarea
            name="images"
            value={formData.images}
            onChange={handleChange}
            className={`${inputClass} min-h-32 resize-none`}
            placeholder="Uploaded image URLs will appear here automatically"
          />

          <p className="mt-2 text-xs text-muted">
            Each image URL is saved in MongoDB after clicking Save Project.
          </p>
        </div>
      </div>

      <div className="card-soft p-6">
        <h2 className="mb-6 text-xl font-black text-dark">Links & Status</h2>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={labelClass}>Live URL</label>
            <input
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="#"
            />
            {errors.liveUrl && <p className={errorClass}>{errors.liveUrl}</p>}
          </div>

          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="#"
            />
            {errors.githubUrl && <p className={errorClass}>{errors.githubUrl}</p>}
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
        </div>

        <div className="mt-6 flex flex-wrap gap-5">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-sm font-bold text-dark">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Featured Project
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-sm font-bold text-dark">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Active Project
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiSave />
          {loading ? 'Saving...' : submitLabel}
        </button>

        <Link
          to="/admin/projects"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-6 py-4 text-sm font-bold text-muted transition hover:border-primary hover:text-primary"
        >
          <FiX />
          Cancel
        </Link>
      </div>
    </form>
  )
}

export default ProjectForm