import { createContext, useContext, useMemo, useState } from 'react'
import { FiCheckCircle, FiInfo, FiX, FiXCircle } from 'react-icons/fi'

const ToastContext = createContext(null)

const toastStyles = {
  success: {
    icon: FiCheckCircle,
    className: 'border-green-200 bg-green-50 text-green-700',
  },
  error: {
    icon: FiXCircle,
    className: 'border-red-200 bg-red-50 text-red-700',
  },
  info: {
    icon: FiInfo,
    className: 'border-blue-200 bg-blue-50 text-primary',
  },
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const showToast = ({ type = 'success', message }) => {
    const id = Date.now()

    setToasts((prev) => [
      ...prev,
      {
        id,
        type,
        message,
      },
    ])

    setTimeout(() => {
      removeToast(id)
    }, 3500)
  }

  const value = useMemo(
    () => ({
      showToast,
      removeToast,
    }),
    []
  )

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed right-5 top-5 z-[9999] grid w-[calc(100%-40px)] max-w-sm gap-3">
        {toasts.map((toast) => {
          const style = toastStyles[toast.type] || toastStyles.info
          const Icon = style.icon

          return (
            <div
              key={toast.id}
              className={`flex items-start gap-3 rounded-2xl border px-5 py-4 text-sm font-semibold shadow-lg ${style.className}`}
            >
              <Icon className="mt-0.5 shrink-0" size={18} />

              <p className="flex-1 leading-6">{toast.message}</p>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="shrink-0 opacity-70 transition hover:opacity-100"
              >
                <FiX />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}