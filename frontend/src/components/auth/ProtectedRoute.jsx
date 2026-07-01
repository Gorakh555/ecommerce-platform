import { Navigate, useLocation } from 'react-router-dom'
import { useAuth }               from '../../context/AuthContext.jsx'
import Spinner                   from '../ui/Spinner.jsx'

/**
 * ProtectedRoute — mirrors the authorization rules in SecurityConfig.java
 *
 * Props:
 *   sellerOnly — gate for SELLER role (matches hasRole("SELLER") in SecurityConfig)
 *   guestOnly  — redirect away if already logged in (for /login, /register)
 */
export default function ProtectedRoute({ children, sellerOnly = false, guestOnly = false }) {
  const { isAuthenticated, isSeller, loading } = useAuth()
  const location = useLocation()

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )

  if (guestOnly && isAuthenticated) {
    return <Navigate to={isSeller ? '/seller' : '/products'} replace />
  }
  if (!guestOnly && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (sellerOnly && !isSeller) {
    return <Navigate to="/products" replace />
  }

  return children
}
