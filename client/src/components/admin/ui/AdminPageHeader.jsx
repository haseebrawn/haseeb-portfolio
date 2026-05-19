const AdminPageHeader = ({
  eyebrow,
  title,
  description,
  actions,
}) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        {eyebrow && (
          <p className="mb-2 text-sm font-bold text-primary">{eyebrow}</p>
        )}

        <h1 className="text-3xl font-black text-dark">{title}</h1>

        {description && <p className="mt-2 text-muted">{description}</p>}
      </div>

      {actions && <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>}
    </div>
  )
}

export default AdminPageHeader