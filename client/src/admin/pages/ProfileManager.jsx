import { useEffect, useState } from 'react'
import {
  FiBriefcase,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiTwitter,
  FiUser,
} from 'react-icons/fi'
import { adminProfileService } from '../../services/adminProfileService'
import ImageUpload from '../../components/admin/uploads/ImageUpload'
import {useToast} from '../../context/ToastContext'

const initialForm = {
  name: '',
  role: '',
  experience: '',
  location: '',
  email: '',
  phone: '',
  summary: '',
  aboutStory: '',
  resumeUrl: '',
  avatar: '',
  socials: {
    github: '',
    linkedin: '',
    twitter: '',
    email: '',
  },
}

const ProfileManager = () => {
  const [formData, setFormData] = useState(initialForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const { showToast } = useToast()

  const loadProfile = async () => {
    try {
      setLoading(true)
      setErrors({})
      setSuccess('')

      const data = await adminProfileService.getProfile()

      setFormData({
        name: data.name || '',
        role: data.role || '',
        experience: data.experience || '',
        location: data.location || '',
        email: data.email || '',
        phone: data.phone || '',
        summary: data.summary || '',
        aboutStory: data.aboutStory || '',
        resumeUrl: data.resumeUrl || '',
        avatar: data.avatar || '',
        socials: {
          github: data.socials?.github || '',
          linkedin: data.socials?.linkedin || '',
          twitter: data.socials?.twitter || '',
          email: data.socials?.email || '',
        },
      })
    } catch (error) {
      setErrors({
        api:
          error.response?.data?.message ||
          'Unable to load profile data. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
      api: '',
    }))

    setSuccess('')
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [name]: value,
      },
    }))

    setErrors((prev) => ({
      ...prev,
      [`socials.${name}`]: '',
      api: '',
    }))

    setSuccess('')
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required'
    }

    if (!formData.aboutStory.trim()) {
      newErrors.aboutStory = 'About story is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setSaving(true)
      setErrors({})
      setSuccess('')

      const payload = {
        name: formData.name,
        role: formData.role,
        experience: formData.experience,
        location: formData.location,
        email: formData.email,
        phone: formData.phone,
        summary: formData.summary,
        aboutStory: formData.aboutStory,
        resumeUrl: formData.resumeUrl,
        avatar: formData.avatar,
        socials: {
          github: formData.socials.github,
          linkedin: formData.socials.linkedin,
          twitter: formData.socials.twitter,
          email: formData.socials.email,
        },
      }

      const response = await adminProfileService.updateProfile(payload)

      setSuccess(response.message || 'Profile updated successfully.')

      showToast({
        type: 'success',
        message: 'Profile updated and saved in database successfully.',
      })
    } catch (error) {
      setErrors({
        api:
          error.response?.data?.message ||
          'Unable to update profile. Please try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-border bg-white px-4 py-4 text-sm text-dark outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-blue-500/10'

  const labelClass = 'mb-2 block text-sm font-bold text-dark'
  const errorClass = 'mt-2 text-sm font-semibold text-red-500'

  if (loading) {
    return (
      <div className="card-soft p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
          <FiLoader className="animate-spin" size={26} />
        </div>

        <h1 className="mt-6 text-2xl font-black text-dark">
          Loading Profile
        </h1>

        <p className="mt-2 text-sm text-muted">Please wait...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold text-primary">Profile Manager</p>

        <h1 className="text-3xl font-black text-dark">Profile Information</h1>

        <p className="mt-2 text-muted">
          Update your portfolio profile, contact details, resume link, and social links.
        </p>
      </div>

      {errors.api && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {errors.api}
        </div>
      )}

      {/* {success && (
        <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
          {success}
        </div>
      )} */}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="card-soft p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-primary">
              <FiUser size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-dark">Basic Details</h2>
              <p className="text-sm text-muted">
                Main profile information shown across your portfolio.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Full Name</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Muhammad Haseeb"
              />

              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            <div>
              <label className={labelClass}>Role / Title</label>

              <div className="relative">
                <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`${inputClass} pl-12`}
                  placeholder="MERN Stack Developer"
                />
              </div>

              {errors.role && <p className={errorClass}>{errors.role}</p>}
            </div>

            <div>
              <label className={labelClass}>Experience</label>

              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={inputClass}
                placeholder="2+ Years"
              />
            </div>

            <div>
              <label className={labelClass}>Location</label>

              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`${inputClass} pl-12`}
                  placeholder="Pakistan"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email</label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputClass} pl-12`}
                  placeholder="hello@muhammadhaseeb.dev"
                />
              </div>

              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div>
              <label className={labelClass}>Phone</label>

              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${inputClass} pl-12`}
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-soft p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-primary">
              <FiGlobe size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-dark">Portfolio Content</h2>
              <p className="text-sm text-muted">
                Update your short summary and about page story.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className={labelClass}>Short Summary</label>

              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className={`${inputClass} min-h-32 resize-none`}
                placeholder="I build modern, responsive, and scalable web applications using the MERN stack."
              />

              {errors.summary && <p className={errorClass}>{errors.summary}</p>}
            </div>

            <div>
              <label className={labelClass}>About Story</label>

              <textarea
                name="aboutStory"
                value={formData.aboutStory}
                onChange={handleChange}
                className={`${inputClass} min-h-40 resize-none`}
                placeholder="Write your professional about story here..."
              />

              {errors.aboutStory && (
                <p className={errorClass}>{errors.aboutStory}</p>
              )}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Resume URL</label>

                <input
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="# or resume file URL"
                />
              </div>

              <div>
                <label className={labelClass}>Avatar URL</label>

                <input
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Image URL"
                />
              </div>

              <div className="mt-5">
                <ImageUpload
                  label="Profile Avatar"
                  folder="avatars"
                  value={formData.avatar}
                  onUpload={(url) =>
                    setFormData((prev) => ({
                      ...prev,
                      avatar: url,
                    }))
                  }
                  onRemove={() =>
                    setFormData((prev) => ({
                      ...prev,
                      avatar: '',
                    }))
                  }
                />

                <p className="mt-2 text-xs text-muted">
                  Avatar URL saves in MongoDB after clicking Save Profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-soft p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-primary">
              <FiGithub size={22} />
            </div>

            <div>
              <h2 className="text-xl font-black text-dark">Social Links</h2>
              <p className="text-sm text-muted">
                Add GitHub, LinkedIn, Twitter, and social email link.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>GitHub URL</label>

              <div className="relative">
                <FiGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  name="github"
                  value={formData.socials.github}
                  onChange={handleSocialChange}
                  className={`${inputClass} pl-12`}
                  placeholder="https://github.com/username"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>LinkedIn URL</label>

              <div className="relative">
                <FiLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  name="linkedin"
                  value={formData.socials.linkedin}
                  onChange={handleSocialChange}
                  className={`${inputClass} pl-12`}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Twitter URL</label>

              <div className="relative">
                <FiTwitter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  name="twitter"
                  value={formData.socials.twitter}
                  onChange={handleSocialChange}
                  className={`${inputClass} pl-12`}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Social Email Link</label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

                <input
                  name="email"
                  value={formData.socials.email}
                  onChange={handleSocialChange}
                  className={`${inputClass} pl-12`}
                  placeholder="mailto:hello@muhammadhaseeb.dev"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-soft p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-black text-dark">Profile Preview</h2>

              <p className="mt-2 text-sm leading-7 text-muted">
                {formData.name || 'Muhammad Haseeb'} •{' '}
                {formData.role || 'MERN Stack Developer'} •{' '}
                {formData.experience || '2+ Years'}
              </p>

              <p className="mt-2 text-sm leading-7 text-muted">
                {formData.email || 'Email not added'} •{' '}
                {formData.location || 'Location not added'}
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave />
              {saving ? 'Saving Profile...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileManager