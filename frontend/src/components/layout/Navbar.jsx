import { useState }                          from 'react'
import { Link, useNavigate, useLocation }    from 'react-router-dom'
import { useAuth }                           from '../../context/AuthContext.jsx'
import { useCart }                           from '../../context/CartContext.jsx'
import Badge                                 from '../ui/Badge.jsx'

export default function Navbar() {
  const { user, isSeller, isAuthenticated, logout } = useAuth()
  const { totalItems, toggleCart }                  = useCart()
  const [mobileOpen, setM]                          = useState(false)
  const navigate                                    = useNavigate()
  const { pathname }                                = useLocation()

  const handleLogout = () => { logout(); navigate('/') }
  const isActive = (p) => pathname === p

  const navLinkCls = (path) =>
    `text-sm font-medium transition-colors whitespace-nowrap ${
      isActive(path) ? 'text-ink' : 'text-ink-soft hover:text-ink'
    }`

  return (
    <nav className="bg-white border-b border-bdr sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Single flex row — everything vertically centred on one baseline */}
        <div className="flex items-center h-16">

          {/* ── Logo ── */}
          <Link to="/" className="font-serif text-[1.6rem] tracking-tight leading-none mr-8 flex-shrink-0">
            Nexo<span className="text-accent">ra</span>
          </Link>

          {/* ── Centre nav links ── */}
          <div className="hidden md:flex items-center gap-7">
            <Link to="/"         className={navLinkCls('/')}>Home</Link>
            <Link to="/products" className={navLinkCls('/products')}>Products</Link>
            {isSeller && (
              <Link to="/seller" className={`text-sm font-semibold whitespace-nowrap transition-opacity ${isActive('/seller') ? 'text-seller' : 'text-seller/70 hover:text-seller'}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* ── Spacer pushes right side all the way to the edge ── */}
          <div className="flex-1" />

          {/* ── Right-side actions — all on the same flex row ── */}
          <div className="flex items-center gap-3">

            {/* Cart icon (customers only) */}
            {isAuthenticated && !isSeller && (
              <button
                onClick={toggleCart}
                aria-label="Open cart"
                className="relative flex items-center justify-center w-9 h-9 rounded-full text-ink-soft hover:text-ink hover:bg-canvas transition-all text-lg"
              >
                🛒
                <Badge count={totalItems} />
              </button>
            )}

            {isAuthenticated ? (
              <>
                {/* User info */}
                <div className="hidden sm:flex flex-col items-end leading-none gap-0.5">
                  <span className="text-[13px] font-semibold text-ink leading-none">{user.username}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest leading-none ${isSeller ? 'text-seller' : 'text-ink-faint'}`}>
                    {isSeller ? 'Seller' : 'Customer'}
                  </span>
                </div>
                {/* Sign out */}
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-ink-soft hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 whitespace-nowrap"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="text-sm font-medium text-ink-soft hover:text-ink transition-colors whitespace-nowrap">
                  Sign in
                </Link>
                <Link to="/register"
                  className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                  Register
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setM(o => !o)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-canvas text-ink transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-bdr py-4 space-y-1 fade-in">
            {[
              { to:'/',         label:'Home'               },
              { to:'/products', label:'Products'           },
              ...(isSeller ? [{ to:'/seller', label:'Dashboard' }] : []),
            ].map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setM(false)}
                className="block text-sm font-medium text-ink-soft hover:text-ink py-2 px-1 transition-colors">
                {label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-3 pt-3 border-t border-bdr">
                <Link to="/login"    onClick={() => setM(false)} className="flex-1 text-center py-2 border border-bdr rounded-xl text-sm font-medium text-ink-soft">Sign in</Link>
                <Link to="/register" onClick={() => setM(false)} className="flex-1 text-center py-2 bg-accent text-white rounded-xl text-sm font-semibold">Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
