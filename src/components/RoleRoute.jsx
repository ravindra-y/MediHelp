import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const RoleRoute = ({ role: requiredRole, children }) => {
  const { role, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="auth-shell">
        <div className="auth-loader">Checking access...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RoleRoute
