const FormMessage = ({ type = 'error', children }) => {
  if (!children) return null

  const className =
    type === 'success'
      ? 'border-green-200 bg-green-50 text-green-700'
      : 'border-red-200 bg-red-50 text-red-700'

  return (
    <div className={`rounded-2xl border px-5 py-4 text-sm font-semibold ${className}`}>
      {children}
    </div>
  )
}

export default FormMessage