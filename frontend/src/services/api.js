/**
 * API SERVICE — wired to actual Spring Boot source code
 *
 * EXACT ENDPOINTS:
 *   POST  /register           body:{username,password,role} → Users{id,username,password,role}
 *   POST  /login              body:{username,password}      → JWT string OR "fail" OR 401
 *   GET   /Users              requires auth                 → List<Users>
 *   GET   /products/          public, no auth needed        → List<Product>
 *   POST  /products/product   SELLER only                   → void
 *   PUT   /products/{id}      SELLER only                   → void
 *   DELETE /products/{id}     SELLER only                   → void
 */
const BASE = `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}`
console.log("BASE =", BASE);

export const saveToken     = (t)   => localStorage.setItem('jwt_token',  t)
export const getToken      = ()    => localStorage.getItem('jwt_token')
export const removeToken   = ()    => localStorage.removeItem('jwt_token')
export const saveUserInfo  = (obj) => localStorage.setItem('user_info',  JSON.stringify(obj))
export const getUserInfo   = ()    => { try { return JSON.parse(localStorage.getItem('user_info')) } catch { return null } }
export const removeUserInfo= ()    => localStorage.removeItem('user_info')
export const clearSession  = ()    => { removeToken(); removeUserInfo() }

export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')))
  } catch { return null }
}

export function isTokenValid() {
  const t = getToken()
  if (!t) return false
  const p = parseJwt(t)
  if (!p?.exp) return false
  return Date.now() / 1000 < p.exp
}

/**
 * Base fetch wrapper.
 *
 * @param {string}  path
 * @param {object}  opts
 * @param {boolean} isLoginRequest — when true, a 401 means wrong credentials,
 *                                   NOT an expired session. Skip the redirect.
 */
async function request(path, opts = {}, isLoginRequest = false) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opts.headers,
  }

  let res
  try {
    res = await fetch(`${BASE}${path}`, { ...opts, headers })
  } catch {
    throw new Error('Cannot reach backend. Is Spring Boot running on port 8080?')
  }

  if (res.status === 401) {
    if (isLoginRequest) {
      // Wrong username or password — show error on the login form, do NOT redirect
      throw new Error('Invalid username or password.')
    }
    // Expired / missing token on any other request — clear session and redirect
    clearSession()
    window.location.href = '/login'
    throw new Error('Session expired. Please log in again.')
  }

  if (res.status === 403) {
    throw new Error('Access denied — SELLER role required for this action.')
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `HTTP ${res.status}`)
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') return null
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

/* ── AUTH ─────────────────────────────────────────────────────── */

export async function registerUser({ username, password, role }) {
  const user = await request('/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, role }),
  })
  if (user?.role) saveUserInfo({ username: user.username, role: user.role, id: user.id })
  return user
}

export async function loginUser({ username, password }) {
  // Pass isLoginRequest=true so a 401 shows an error message instead of redirecting
  const result = await request(
    '/login',
    { method: 'POST', body: JSON.stringify({ username, password }) },
    true
  )

  // Spring Boot may also return plain string "fail" instead of 401
  if (!result || result === 'fail') throw new Error('Invalid username or password.')

  // Save token first so the next authenticated request carries the Bearer header
  saveToken(result)

  // JWT has NO role claim — fetch real role from GET /Users, find current user
  try {
    const users = await request('/Users')
    const me = Array.isArray(users) ? users.find(u => u.username === username) : null
    if (me?.role) {
      saveUserInfo({ username: me.username, role: me.role, id: me.id })
    } else {
      const payload = parseJwt(result)
      saveUserInfo({ username: payload?.sub || username, role: 'CUSTOMER' })
    }
  } catch {
    const existing = getUserInfo()
    if (!existing || existing.username !== username) {
      const payload = parseJwt(result)
      saveUserInfo({ username: payload?.sub || username, role: 'CUSTOMER' })
    }
  }

  return result
}

/* ── PRODUCTS ─────────────────────────────────────────────────── */
export const getProducts   = ()         => request('/products/')
export const createProduct = (body)     => request('/products/product', { method: 'POST', body: JSON.stringify(body) })
export const updateProduct = (id, body) => request(`/products/${id}`,   { method: 'PUT',  body: JSON.stringify(body) })
export const deleteProduct = (id)       => request(`/products/${id}`,   { method: 'DELETE' })
