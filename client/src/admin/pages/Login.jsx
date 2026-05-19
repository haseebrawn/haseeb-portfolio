import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  FiCheckCircle,
  FiCode,
  FiEye,
  FiEyeOff,
  FiLock,
  FiLogIn,
  FiMail,
  FiShield,
  FiZap,
} from 'react-icons/fi'
import { FaReact } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = location.state?.from?.pathname || '/admin'

  const [formData, setFormData] = useState({
    email: 'admin@muhammadhaseeb.dev',
    password: 'Admin@12345',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

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
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)
      await login(formData)
      navigate(from, { replace: true })
    } catch (error) {
      setErrors({
        api:
          error.response?.data?.message ||
          'Login failed. Please check your email and password.',
      })
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-blue-100 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'

  const featureItems = [
    {
      icon: FiShield,
      title: 'Secure Access',
      description: 'Protected admin authentication',
    },
    {
      icon: FiZap,
      title: 'Fast & Reliable',
      description: 'Built with MERN stack',
    },
    {
      icon: FiCode,
      title: 'Developer First',
      description: 'Clean, modern & easy to use',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-4 md:px-6 lg:px-8 flex items-center justify-center font-sans">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1440px] items-stretch gap-8 lg:grid-cols-2">
        {/* Left Side: Brand & Hero */}
        <div className="relative hidden overflow-hidden rounded-[40px] bg-blue-600 p-12 text-white shadow-2xl lg:flex lg:flex-col lg:max-h-[850px] my-auto">
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-blue-700/50 to-transparent" />
          
          <div className="absolute right-12 top-12 grid grid-cols-4 gap-3 opacity-20">
            {Array.from({ length: 24 }).map((_, index) => (
              <span key={index} className="h-1.5 w-1.5 rounded-full bg-white" />
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-blue-600 shadow-xl">
              MH
            </div>
            <div>
              <h2 className="text-lg font-black leading-tight">Muhammad Haseeb</h2>
              <p className="text-sm font-semibold opacity-80"> Admin Panel</p>
            </div>
          </div>

          <div className="relative z-10 mt-15 flex-1">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              Developer · Creator · Problem Solver
            </div>

            <h1 className="mt-6 text-3xl font-black leading-[1.1] tracking-tight 2xl:text-3xl">
              Welcome back, let’s build something{' '}
              <span className="text-blue-200">amazing.</span>
            </h1>

            {/* Icon Replacement as requested - Now with animation */}
            <div className="relative mt-12 flex h-64 w-full items-center justify-center">
              <div className="absolute h-48 w-48 animate-pulse rounded-full bg-blue-400/30 blur-3xl" />
              <FaReact size={180} className="relative z-10 text-blue-100 drop-shadow-2xl animate-[spin_10s_linear_infinite]" />
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
              {featureItems.map((item) => (
                <div key={item.title} className="group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white shadow-inner transition group-hover:bg-white group-hover:text-blue-600">
                    <item.icon size={20} />
                  </div>
                  <h3 className="mt-4 text-sm font-black">{item.title}</h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed opacity-70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex w-full items-center justify-center p-4">
          <div className="w-full max-w-[520px]">
            {/* Mobile Logo */}
            <div className="mb-10 flex items-center justify-center gap-4 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg">
                MH
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900">Muhammad Haseeb</h2>
                <p className="text-xs font-bold text-slate-500">Portfolio Admin Panel</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[40px] border border-slate-100 bg-white p-8 shadow-2xl shadow-blue-500/10 md:p-12">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                  <FiLock size={34} />
                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                  Admin Login
                </h1>
                <p className="mt-3 text-base font-medium text-slate-500">
                  Access your portfolio admin dashboard
                </p>
              </div>

              <div className="my-10 h-px bg-slate-100" />

              {errors.api && (
                <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-600">
                  {errors.api}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-black text-slate-900">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@example.com"
                      className={`${inputClass} pl-14`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm font-bold text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-slate-900">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter admin password"
                      className={`${inputClass} pl-14 pr-14`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm font-bold text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-slate-500">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-200 text-blue-600 focus:ring-blue-600"
                    />
                    Remember me
                  </label>
                  <button type="button" className="text-sm font-black text-blue-600 transition hover:text-blue-700">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-blue-600 py-4 text-base font-black text-white shadow-xl shadow-blue-500/30 transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <FiLogIn size={20} />
                  )}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-10 rounded-2xl bg-blue-50/50 p-4">
                <div className="flex items-center justify-center gap-3 text-xs font-bold text-blue-700">
                  <FiCheckCircle size={14} />
                  <span>Secure admin access. All activities are monitored.</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm font-bold text-slate-400">
              © {new Date().getFullYear()} Muhammad Haseeb. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login