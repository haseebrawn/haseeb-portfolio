import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const GuestRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft px-4">
        <div className="card-soft max-w-md p-8 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
          <h1 className="mt-6 text-2xl font-black text-dark">
            Loading
          </h1>
          <p className="mt-2 text-sm text-muted">Please wait...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default GuestRoute