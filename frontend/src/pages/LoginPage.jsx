import { useState }                           from 'react'
import { Link, useNavigate, useLocation }     from 'react-router-dom'
import { useAuth }                            from '../context/AuthContext.jsx'
import { useToast }                           from '../context/ToastContext.jsx'
import Spinner                                from '../components/ui/Spinner.jsx'

export default function LoginPage() {
  const [form, setForm]     = useState({ username: '', password: '' })
  const { login, loading, error, clearError, isSeller } = useAuth()
  const { showToast }       = useToast()
  const navigate            = useNavigate()
  const location            = useLocation()
  const from                = location.state?.from?.pathname || '/products'

  const set = (k) => (e) => { clearError(); setForm(f => ({ ...f, [k]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await login(form)
      showToast('Welcome back! 👋', 'success')
      // Sellers go to their dashboard, others go to products (or where they came from)
      const dest = from === '/login' || from === '/register' ? '/products' : from
      navigate(dest, { replace: true })
    } catch { /* error shown via context.error */ }
  }

  const inputCls = "w-full px-4 py-3 border-[1.5px] border-bdr rounded-xl text-sm bg-canvas focus:outline-none focus:border-accent transition-colors"

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-3xl text-ink inline-block">Nexo<span className="text-accent">ra</span></Link>
          <p className="text-ink-soft text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white border border-bdr rounded-3xl p-8 shadow-sm">
          <h1 className="font-serif text-2xl text-ink mb-6">Welcome back</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wide block mb-1.5">Username</label>
              <input value={form.username} onChange={set('username')} required autoComplete="username"
                placeholder="Your username" className={inputCls} />
            </div>
            <div>
              <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wide block mb-1.5">Password</label>
              <input type="password" value={form.password} onChange={set('password')} required autoComplete="current-password"
                placeholder="••••••••" className={inputCls} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-accent text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 mt-1">
              {loading && <Spinner size="sm" />}
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          <p className="text-center text-sm text-ink-soft mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-semibold hover:underline">Register</Link>
          </p>
        </div>

        <p className="text-center text-xs text-ink-faint mt-5">
          Secured by Spring Security + BCrypt + JWT
        </p>
      </div>
    </main>
  )
}
