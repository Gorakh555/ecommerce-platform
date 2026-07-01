import { useState }          from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth }           from '../context/AuthContext.jsx'
import { useToast }          from '../context/ToastContext.jsx'
import Spinner               from '../components/ui/Spinner.jsx'

/**
 * RegisterPage
 *
 * IMPORTANT: UserService.register() does NOT set a default role.
 * The Users entity has a `role` field that must be provided.
 * We send it in the request body — user picks CUSTOMER or SELLER.
 *
 * Backend returns the saved Users object including the role,
 * which we store in localStorage for future role-based UI decisions
 * (since the JWT does not carry the role).
 */
export default function RegisterPage() {
  const [form, setForm]    = useState({ username: '', password: '', confirm: '', role: 'CUSTOMER' })
  const [localError, setLE] = useState('')
  const { register, loading, error, clearError } = useAuth()
  const { showToast }      = useToast()
  const navigate           = useNavigate()

  const set = (k) => (e) => { clearError(); setLE(''); setForm(f => ({ ...f, [k]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) { setLE('Passwords do not match.'); return }
    if (form.password.length < 4)       { setLE('Password must be at least 4 characters.'); return }
    try {
      await register({ username: form.username, password: form.password, role: form.role })
      showToast('Account created! Welcome to Nexora 🎉', 'success')
      navigate(form.role === 'SELLER' ? '/seller' : '/products')
    } catch { /* shown via context.error */ }
  }

  const displayError = localError || error
  const inputCls = "w-full px-4 py-3 border-[1.5px] border-bdr rounded-xl text-sm bg-canvas focus:outline-none focus:border-accent transition-colors"

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-3xl text-ink inline-block">Nexo<span className="text-accent">ra</span></Link>
          <p className="text-ink-soft text-sm mt-2">Create your free account</p>
        </div>

        <div className="bg-white border border-bdr rounded-3xl p-8 shadow-sm">
          <h1 className="font-serif text-2xl text-ink mb-6">Create account</h1>

          {displayError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 leading-relaxed">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wide block mb-1.5">Username</label>
              <input value={form.username} onChange={set('username')} required autoComplete="username"
                placeholder="Choose a username" className={inputCls} />
            </div>
            <div>
              <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wide block mb-1.5">Password</label>
              <input type="password" value={form.password} onChange={set('password')} required autoComplete="new-password"
                placeholder="Min 4 characters" className={inputCls} />
            </div>
            <div>
              <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wide block mb-1.5">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={set('confirm')} required autoComplete="new-password"
                placeholder="Repeat password" className={inputCls} />
            </div>

            {/* Role picker — CUSTOMER or SELLER */}
            <div>
              <label className="text-[11px] font-bold text-ink-soft uppercase tracking-wide block mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'CUSTOMER', emoji: '🛍️', label: 'Customer', desc: 'Browse & buy products' },
                  { value: 'SELLER',   emoji: '🏪', label: 'Seller',   desc: 'List & manage products' },
                ].map(opt => (
                  <label key={opt.value}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-[1.5px] cursor-pointer transition-all ${
                      form.role === opt.value
                        ? opt.value === 'SELLER'
                          ? 'border-seller bg-seller-light'
                          : 'border-accent bg-accent-light'
                        : 'border-bdr hover:border-ink-faint'
                    }`}>
                    <input type="radio" name="role" value={opt.value} checked={form.role === opt.value}
                      onChange={set('role')} className="sr-only" />
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className={`text-xs font-bold ${form.role === opt.value && opt.value === 'SELLER' ? 'text-seller' : form.role === opt.value ? 'text-accent' : 'text-ink'}`}>
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-ink-faint text-center leading-tight">{opt.desc}</span>
                  </label>
                ))}
              </div>
              {form.role === 'SELLER' && (
                <p className="text-[11px] text-seller mt-2 bg-seller-light px-3 py-2 rounded-lg">
                  Seller role grants CREATE, UPDATE, DELETE access on products (hasRole("SELLER") in SecurityConfig).
                </p>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-accent text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 mt-1">
              {loading && <Spinner size="sm" />}
              {loading ? 'Creating account…' : 'Create account →'}
            </button>
          </form>

          <p className="text-center text-sm text-ink-soft mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
