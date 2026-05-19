const AdminStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  loading = false,
}) => {
  return (
    <div className="card-soft p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">{title}</p>

          {loading ? (
            <div className="mt-3 h-9 w-20 animate-pulse rounded-xl bg-border" />
          ) : (
            <h3 className="mt-2 text-3xl font-black text-dark">{value}</h3>
          )}

          {description && (
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          )}

          {trend && (
            <p className="mt-3 inline-flex rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
              {trend}
            </p>
          )}
        </div>

        {Icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary">
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminStatCard