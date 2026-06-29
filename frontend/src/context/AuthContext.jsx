/**
 * AuthContext
 *
 * Role strategy explained:
 * - JWTService.generateToken() stores ONLY {sub, iat, exp} — NO role claim
 * - So we persist role in localStorage alongside the token
 * - On register: backend returns Users{role} → we save it
 * - On login: we restore from localStorage (same browser) or default CUSTOMER
 * - isSeller = role === "SELLER" (matches SecurityConfig hasRole("SELLER"))
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import {
  loginUser, registerUser, clearSession,
  getToken, getUserInfo, saveUserInfo, isTokenValid, parseJwt,
} from '../services/api.js'

const AuthContext = createContext(null)

function buildUserState() {
  if (!isTokenValid()) { clearSession(); return null }
  const info = getUserInfo()
  if (!info) return null
  return { username: info.username, role: info.role, id: info.id }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => buildUserState())
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // Re-sync on focus (handles tab switching after token expiry)
  useEffect(() => {
    function sync() { setUser(buildUserState()) }
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [])

  const login = useCallback(async (credentials) => {
    setLoading(true); setError(null)
    try {
      await loginUser(credentials)
      setUser(buildUserState())
    } catch (err) { setError(err.message); throw err }
    finally { setLoading(false) }
  }, [])

  const register = useCallback(async (credentials) => {
    setLoading(true); setError(null)
    try {
      await registerUser(credentials)
      // Auto-login after registration
      await loginUser({ username: credentials.username, password: credentials.password })
      setUser(buildUserState())
    } catch (err) { setError(err.message); throw err }
    finally { setLoading(false) }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  // Matches SecurityConfig: hasRole("SELLER")
  const isSeller = user?.role === 'SELLER'
  const isCustomer = user?.role === 'CUSTOMER'

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      isAuthenticated: !!user,
      isSeller,
      isCustomer,
      login,
      register,
      logout,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>')
  return ctx
}
