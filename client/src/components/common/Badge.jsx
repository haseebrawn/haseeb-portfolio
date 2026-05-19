const Badge = ({ children, dot = true, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-soft px-4 py-2 text-sm font-semibold text-primary ${className}`}
    >
      {dot && <span className="h-2 w-2 rounded-full bg-success" />}
      {children}
    </span>
  )
}

export default Badge