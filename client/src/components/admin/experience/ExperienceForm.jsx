import { useEffect, useState } from 'react'
import { FiSave, FiX } from 'react-icons/fi'

const initialForm = {
    title: 'Software Engineer',
    company: 'Provelopers',
    companyUrl: 'https://provelopers.net/',
    employmentType: 'Full-time',
    location: 'Pakistan / Remote',
    startDate: '2024-01',
    endDate: '',
    isCurrent: true,
    description:
        'Working as a Software Engineer focused on MERN Stack development, React.js interfaces, Node.js and Express APIs, MongoDB database structures, admin dashboards, authentication systems, and full-stack web application development.',
    responsibilities:
        'Develop responsive frontend interfaces using React.js and Tailwind CSS.\nBuild backend APIs using Node.js, Express.js, and MongoDB.\nCreate admin dashboards, CRUD modules, authentication flows, and database-driven features.\nWork on clean code structure, reusable components, API integration, and UI polish.',
    techStack:
        'React.js\nNode.js\nExpress.js\nMongoDB\nTailwind CSS\nJavaScript\nREST APIs\nGit',
    achievements:
        'Built reusable MERN Stack modules for portfolio and dashboard projects.\nImproved practical experience in full-stack application development.\nWorked with real-world frontend, backend, database, and admin dashboard requirements.',
    displayOrder: 0,
    isActive: true,
}

const formatMonthInput = (date) => {
    if (!date) return ''

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) return ''

    return parsedDate.toISOString().slice(0, 7)
}

const linesToArray = (value) => {
    return value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
}

const arrayToLines = (array = []) => {
    return array.join('\n')
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

const ExperienceForm = ({
    initialData,
    onSubmit,
    onCancel,
    submitLabel = 'Save Experience',
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
            title: initialData.title || '',
            company: initialData.company || '',
            companyUrl: initialData.companyUrl || '#',
            employmentType: initialData.employmentType || 'Full-time',
            location: initialData.location || '',
            startDate: formatMonthInput(initialData.startDate),
            endDate: formatMonthInput(initialData.endDate),
            isCurrent: Boolean(initialData.isCurrent),
            description: initialData.description || '',
            responsibilities: arrayToLines(initialData.responsibilities),
            techStack: arrayToLines(initialData.techStack),
            achievements: arrayToLines(initialData.achievements),
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

        if (!formData.title.trim()) {
            newErrors.title = 'Job title is required'
        }

        if (!formData.company.trim()) {
            newErrors.company = 'Company name is required'
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required'
        }

        if (!formData.isCurrent && !formData.endDate) {
            newErrors.endDate = 'End date is required when role is not current'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        if (!isValidUrlOrHash(formData.companyUrl)) {
            newErrors.companyUrl = 'Company URL must be a valid URL or #'
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        const payload = {
            title: formData.title,
            company: formData.company,
            companyUrl: formData.companyUrl || '#',
            employmentType: formData.employmentType,
            location: formData.location,
            startDate: formData.startDate,
            endDate: formData.isCurrent ? '' : formData.endDate,
            isCurrent: formData.isCurrent,
            description: formData.description,
            responsibilities: linesToArray(formData.responsibilities),
            techStack: linesToArray(formData.techStack),
            achievements: linesToArray(formData.achievements),
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
                    'Unable to save experience. Please try again.',
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
                        {initialData ? 'Edit Experience' : 'Add New Experience'}
                    </h2>

                    <p className="mt-1 text-sm text-muted">
                        Add your role, company, work details, technologies, and achievements.
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
                    <label className={labelClass}>Job Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Software Engineer"
                    />
                    {errors.title && <p className={errorClass}>{errors.title}</p>}
                </div>

                <div>
                    <label className={labelClass}>Company</label>
                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Provelopers"
                    />
                    {errors.company && <p className={errorClass}>{errors.company}</p>}
                </div>

                <div>
                    <label className={labelClass}>Company URL</label>
                    <input
                        name="companyUrl"
                        value={formData.companyUrl}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="https://provelopers.net/"
                    />
                    {errors.companyUrl && (
                        <p className={errorClass}>{errors.companyUrl}</p>
                    )}
                </div>

                <div>
                    <label className={labelClass}>Employment Type</label>
                    <select
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                        <option>Freelance</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Location</label>
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Pakistan / Remote"
                    />
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
                    <label className={labelClass}>Start Date</label>
                    <input
                        type="month"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={inputClass}
                    />
                    {errors.startDate && (
                        <p className={errorClass}>{errors.startDate}</p>
                    )}
                </div>

                <div>
                    <label className={labelClass}>End Date</label>
                    <input
                        type="month"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        disabled={formData.isCurrent}
                        className={`${inputClass} disabled:cursor-not-allowed disabled:bg-soft`}
                    />
                    {errors.endDate && <p className={errorClass}>{errors.endDate}</p>}
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-5">
                <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-sm font-bold text-dark">
                    <input
                        type="checkbox"
                        name="isCurrent"
                        checked={formData.isCurrent}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />
                    Current Role
                    <span className="text-xs font-semibold text-muted">
                        Shows in top highlighted section
                    </span>
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-5 py-4 text-sm font-bold text-dark">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="h-4 w-4"
                    />
                    Active on Website
                    <span className="text-xs font-semibold text-muted">
                        Show or hide from public page
                    </span>
                </label>
            </div>

            <div className="mt-6">
                <label className={labelClass}>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`${inputClass} min-h-32 resize-none`}
                    placeholder="Describe your role and work..."
                />
                {errors.description && (
                    <p className={errorClass}>{errors.description}</p>
                )}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-3">
                <div>
                    <label className={labelClass}>Responsibilities</label>
                    <textarea
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleChange}
                        className={`${inputClass} min-h-48 resize-none`}
                        placeholder="One responsibility per line"
                    />
                    <p className="mt-2 text-xs text-muted">Write one item per line.</p>
                </div>

                <div>
                    <label className={labelClass}>Tech Stack</label>
                    <textarea
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                        className={`${inputClass} min-h-48 resize-none`}
                        placeholder="React.js"
                    />
                    <p className="mt-2 text-xs text-muted">Write one technology per line.</p>
                </div>

                <div>
                    <label className={labelClass}>Achievements</label>
                    <textarea
                        name="achievements"
                        value={formData.achievements}
                        onChange={handleChange}
                        className={`${inputClass} min-h-48 resize-none`}
                        placeholder="One achievement per line"
                    />
                    <p className="mt-2 text-xs text-muted">Write one item per line.</p>
                </div>
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

export default ExperienceForm