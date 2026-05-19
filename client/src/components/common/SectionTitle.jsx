import Badge from './Badge'

const SectionTitle = ({
  badge,
  title,
  description,
  align = 'left',
  action,
  className = '',
}) => {
  const isCenter = align === 'center'

  return (
    <div
      className={`mb-12 flex flex-col gap-5 ${
        isCenter ? 'items-center text-center' : 'items-start'
      } ${className}`}
    >
      {badge && <Badge>{badge}</Badge>}

      <div className={isCenter ? 'mx-auto max-w-3xl' : 'max-w-3xl'}>
        <h2 className="text-3xl font-black tracking-tight text-dark md:text-5xl">
          {title}
        </h2>

        {description && (
          <p className="mt-4 text-base leading-8 text-muted md:text-lg">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  )
}

export default SectionTitle