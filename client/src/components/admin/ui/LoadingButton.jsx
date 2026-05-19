const LoadingButton = ({
  type = 'button',
  loading = false,
  disabled = false,
  children,
  icon,
  className = '',
  variant = 'primary',
  ...props
}) => {
  const baseClass =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary:
      'bg-primary text-white shadow-lg shadow-blue-500/20 hover:bg-primary-dark',
    secondary:
      'border border-border bg-white text-primary hover:border-primary hover:bg-soft',
    danger: 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white',
  }

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon
      )}

      {loading ? 'Please wait...' : children}
    </button>
  )
}

export default LoadingButton