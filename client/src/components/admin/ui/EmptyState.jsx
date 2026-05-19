const EmptyState = ({
  icon: Icon,
  title = 'No data found',
  description = 'There is nothing to show right now.',
  action,
}) => {
  return (
    <div className="p-12 text-center">
      {Icon && <Icon className="mx-auto text-primary" size={44} />}

      <h2 className="mt-5 text-2xl font-black text-dark">{title}</h2>

      <p className="mx-auto mt-2 max-w-md text-muted">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export default EmptyState