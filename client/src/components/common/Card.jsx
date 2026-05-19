const Card = ({ children, className = '', hover = false }) => {
  return (
    <div className={`card-soft ${hover ? 'card-hover' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default Card