import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-primary text-white shadow-lg shadow-blue-500/20 hover:bg-primary-dark',
  secondary:
    'bg-white text-primary border border-border hover:border-primary hover:bg-soft',
  outline:
    'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white',
  ghost:
    'bg-transparent text-dark hover:bg-soft hover:text-primary',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
}

const Button = ({
  children,
  to,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {icon}
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
        {icon}
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {icon}
      {children}
    </button>
  )
}

export default Button