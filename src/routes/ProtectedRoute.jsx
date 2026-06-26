import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * @param {string} [requiredRole] - 'organizer' | 'student' | undefined (any logged-in user)
 */
function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth()

  // Belum login
  if (!user) {
    return <Navigate to='/login' replace />
  }

  // Sudah login tapi role tidak sesuai
  if (requiredRole && user.role !== requiredRole) {
    // Redirect ke halaman yang sesuai dengan role-nya
    const fallback = user.role === 'organizer' ? '/organizer' : '/dashboard'
    return <Navigate to={fallback} replace />
  }

  return children
}

export default ProtectedRoute
