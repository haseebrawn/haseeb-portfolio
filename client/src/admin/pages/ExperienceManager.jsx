import { useEffect, useMemo, useState } from 'react'
import {
    FiBriefcase,
    FiEdit,
    FiPlus,
    FiRefreshCcw,
    FiTrash2,
} from 'react-icons/fi'
import ExperienceForm from '../../components/admin/experience/ExperienceForm'
import { adminExperienceService } from '../../services/adminExperienceService'
import { useToast } from '../../context/ToastContext'
import { useConfirm } from '../../context/ConfirmContext'

const statusOptions = ['All', 'Active', 'Inactive']

const statusClass = {
    active: 'bg-green-50 text-green-700',
    inactive: 'bg-red-50 text-red-700',
}

const formatDate = (date) => {
    if (!date) return 'Present'

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        year: 'numeric',
    }).format(new Date(date))
}

const ExperienceManager = () => {
    const { showToast } = useToast()
    const { confirm } = useConfirm()

    const [experiences, setExperiences] = useState([])
    const [activeStatus, setActiveStatus] = useState('All')
    const [showForm, setShowForm] = useState(false)
    const [editingExperience, setEditingExperience] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formLoading, setFormLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState('')
    const [error, setError] = useState('')

    const loadExperiences = async () => {
        try {
            setLoading(true)
            setError('')

            const data = await adminExperienceService.getExperiences()
            setExperiences(data)
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Unable to load experiences. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadExperiences()
    }, [])

    const filteredExperiences = useMemo(() => {
        if (activeStatus === 'All') return experiences

        if (activeStatus === 'Active') {
            return experiences.filter((item) => item.isActive)
        }

        return experiences.filter((item) => !item.isActive)
    }, [experiences, activeStatus])

    const handleAddClick = () => {
        setEditingExperience(null)
        setShowForm(true)
        setError('')
    }

    const handleEditClick = (experience) => {
        setEditingExperience(experience)
        setShowForm(true)
        setError('')
    }

    const handleCancelForm = () => {
        setEditingExperience(null)
        setShowForm(false)
    }

    const handleSubmitExperience = async (payload) => {
        setFormLoading(true)

        try {
            if (editingExperience) {
                const response = await adminExperienceService.updateExperience(
                    editingExperience._id,
                    payload
                )

                setExperiences((prev) =>
                    prev.map((item) =>
                        item._id === editingExperience._id ? response.data : item
                    )
                )

                showToast({
                    type: 'success',
                    message: 'Experience updated and saved in MongoDB.',
                })
            } else {
                const response = await adminExperienceService.createExperience(payload)

                setExperiences((prev) => [response.data, ...prev])

                showToast({
                    type: 'success',
                    message: 'Experience created and saved in MongoDB.',
                })
            }

            setEditingExperience(null)
            setShowForm(false)
        } finally {
            setFormLoading(false)
        }
    }

    const handleToggleStatus = async (experience) => {
        try {
            setActionLoading(experience._id)

            const response = await adminExperienceService.toggleStatus(experience._id)

            setExperiences((prev) =>
                prev.map((item) =>
                    item._id === experience._id ? response.data : item
                )
            )

            showToast({
                type: 'success',
                message: response.data.isActive
                    ? 'Experience activated successfully.'
                    : 'Experience deactivated successfully.',
            })
        } catch (error) {
            setError(
                error.response?.data?.message ||
                'Unable to update experience status. Please try again.'
            )

            showToast({
                type: 'error',
                message: 'Unable to update experience status.',
            })
        } finally {
            setActionLoading('')
        }
    }

    const handleDelete = async (experience) => {
        confirm({
            title: 'Delete Experience?',
            message: `Are you sure you want to delete "${experience.title}" at "${experience.company}"? This experience will be removed from MongoDB.`,
            confirmText: 'Delete Experience',
            danger: true,
            onConfirm: async () => {
                try {
                    setActionLoading(experience._id)

                    await adminExperienceService.deleteExperience(experience._id)

                    setExperiences((prev) =>
                        prev.filter((item) => item._id !== experience._id)
                    )

                    showToast({
                        type: 'success',
                        message: 'Experience deleted successfully.',
                    })
                } catch (error) {
                    setError(
                        error.response?.data?.message ||
                        'Unable to delete experience. Please try again.'
                    )

                    showToast({
                        type: 'error',
                        message: 'Unable to delete experience.',
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
                    <p className="mb-2 text-sm font-bold text-primary">
                        Experience Manager
                    </p>

                    <h1 className="text-3xl font-black text-dark">Experience</h1>

                    <p className="mt-2 text-muted">
                        Add, edit, delete, activate, and organize your professional work experience.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={loadExperiences}
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
                        Add Experience
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
                    <ExperienceForm
                        initialData={editingExperience}
                        onSubmit={handleSubmitExperience}
                        onCancel={handleCancelForm}
                        submitLabel={
                            editingExperience ? 'Update Experience' : 'Create Experience'
                        }
                        loading={formLoading}
                    />
                </div>
            )}

            <div className="mb-8 flex flex-wrap gap-3 rounded-3xl border border-border bg-white p-3 shadow-sm">
                {statusOptions.map((status) => {
                    const isActive = activeStatus === status

                    return (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setActiveStatus(status)}
                            className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-blue-500/20'
                                    : 'text-muted hover:bg-soft hover:text-primary'
                                }`}
                        >
                            {status}
                        </button>
                    )
                })}
            </div>

            <div className="card-soft overflow-hidden">
                {loading ? (
                    <div className="space-y-4 p-6">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-40 animate-pulse rounded-2xl bg-soft"
                            />
                        ))}
                    </div>
                ) : filteredExperiences.length > 0 ? (
                    <div className="divide-y divide-border">
                        {filteredExperiences.map((experience) => (
                            <div
                                key={experience._id}
                                className="grid gap-5 p-6 lg:grid-cols-[1fr_auto] lg:items-center"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary">
                                        <FiBriefcase size={24} />
                                    </div>

                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="text-xl font-black text-dark">
                                                {experience.title}
                                            </h2>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-bold ${experience.isCurrent
                                                        ? 'bg-green-50 text-green-700'
                                                        : 'bg-blue-50 text-primary'
                                                    }`}
                                            >
                                                {experience.isCurrent ? 'Current Role' : 'Previous Role'}
                                            </span>

                                            {experience.isCurrent && (
                                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-primary">
                                                    Current
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 text-sm font-semibold text-primary">
                                            {experience.company} • {experience.employmentType}
                                        </p>

                                        <p className="mt-2 text-sm font-semibold text-muted">
                                            {formatDate(experience.startDate)} -{' '}
                                            {experience.isCurrent
                                                ? 'Present'
                                                : formatDate(experience.endDate)}
                                            {experience.location ? ` • ${experience.location}` : ''}
                                        </p>

                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                                            {experience.description}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {experience.techStack?.slice(0, 5).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-primary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 lg:justify-end">

                                    <button
                                        type="button"
                                        onClick={() => handleEditClick(experience)}
                                        className="inline-flex items-center gap-2 rounded-xl bg-soft px-4 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                                    >
                                        <FiEdit />
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(experience)}
                                        disabled={actionLoading === experience._id}
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
                        <FiBriefcase className="mx-auto text-primary" size={44} />

                        <h2 className="mt-5 text-2xl font-black text-dark">
                            No experience found
                        </h2>

                        <p className="mt-2 text-muted">
                            Add your first professional experience from this manager.
                        </p>

                        <button
                            type="button"
                            onClick={handleAddClick}
                            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white"
                        >
                            <FiPlus />
                            Add Experience
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExperienceManager