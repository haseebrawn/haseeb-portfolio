import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft px-4">
        <div className="card-soft max-w-md p-8 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
          <h1 className="mt-6 text-2xl font-black text-dark">
            Checking Admin Session
          </h1>
          <p className="mt-2 text-sm text-muted">Please wait...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute