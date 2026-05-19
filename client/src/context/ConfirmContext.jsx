import { createContext, useContext, useMemo, useState } from 'react'
import { FiAlertTriangle, FiX } from 'react-icons/fi'

const ConfirmContext = createContext(null)

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    danger: true,
    onConfirm: null,
  })

  const confirm = ({
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    danger = true,
    onConfirm,
  }) => {
    setConfirmState({
      open: true,
      title,
      message,
      confirmText,
      cancelText,
      danger,
      onConfirm,
    })
  }

  const closeConfirm = () => {
    setConfirmState((prev) => ({
      ...prev,
      open: false,
      onConfirm: null,
    }))
  }

  const handleConfirm = async () => {
    if (confirmState.onConfirm) {
      await confirmState.onConfirm()
    }

    closeConfirm()
  }

  const value = useMemo(
    () => ({
      confirm,
      closeConfirm,
    }),
    []
  )

  return (
    <ConfirmContext.Provider value={value}>
      {children}

      {confirmState.open && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-dark/50 px-4">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    confirmState.danger
                      ? 'bg-red-50 text-red-600'
                      : 'bg-blue-50 text-primary'
                  }`}
                >
                  <FiAlertTriangle size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-dark">
                    {confirmState.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-muted">
                    {confirmState.message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeConfirm}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft text-muted transition hover:bg-red-50 hover:text-red-600"
              >
                <FiX />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeConfirm}
                className="inline-flex items-center justify-center rounded-2xl border border-border bg-white px-5 py-3 text-sm font-bold text-muted transition hover:border-primary hover:text-primary"
              >
                {confirmState.cancelText}
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold text-white transition ${
                  confirmState.danger
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {confirmState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => {
  const context = useContext(ConfirmContext)

  if (!context) {
    throw new Error('useConfirm must be used inside ConfirmProvider')
  }

  return context
}