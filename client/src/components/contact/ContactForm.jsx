import { useState } from 'react'
import { FiLock, FiMail, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi'
import Card from '../common/Card'
import { contactService } from '../../services/contactService'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const ContactForm = () => {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))

    setSuccess(false)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      await contactService.sendMessage(formData)

      setSuccess(true)
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

  const errorClass = 'mt-2 text-sm font-semibold text-red-500'

  return (
    <Card className="p-6 md:p-8">
      <div className="mb-8">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary">
          <FiMessageSquare size={24} />
        </div>

        <h2 className="text-3xl font-black text-dark">Send Me a Message</h2>

        <p className="mt-3 text-sm leading-7 text-muted">
          Fill out the form below and I’ll get back to you as soon as possible.
        </p>
      </div>

      {success && (
        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
          Message submitted successfully. I’ll get back to you soon.
        </div>
      )}

      {errors.api && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {errors.api}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-dark">
              Your Name
            </label>

            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`${inputClass} pl-12`}
              />
            </div>

            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-dark">
              Your Email
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`${inputClass} pl-12`}
              />
            </div>

            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-dark">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this regarding?"
            className={inputClass}
          />

          {errors.subject && <p className={errorClass}>{errors.subject}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-dark">
            Message
          </label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project or idea..."
            rows="7"
            className={`${inputClass} resize-none`}
          />

          {errors.message && <p className={errorClass}>{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-primary-dark"
        >
          <FiSend />
          Send Message
        </button>

        <p className="flex items-center gap-2 text-sm text-muted">
          <FiLock className="text-primary" />
          Your information is secure and will never be shared.
        </p>
      </form>
    </Card>
  )
}

export default ContactForm