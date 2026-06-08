const AdminStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  loading = false,
}) => {
  return (
    <div className="card-soft flex min-h-[220px] p-6">
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col self-stretch">
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
            <p className="mt-auto inline-flex max-w-full rounded-full bg-soft px-4 py-2 text-xs font-bold leading-5 text-primary">
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
