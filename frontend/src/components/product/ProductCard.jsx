import { useCart }           from '../../context/CartContext.jsx'
import { useAuth }           from '../../context/AuthContext.jsx'
import { useToast }          from '../../context/ToastContext.jsx'
import { useSellerContext }  from '../../context/SellerContext.jsx'

/**
 * ProductCard — zero props for callbacks.
 * 
 * - Cart action  → useCart() from CartContext
 * - Toast        → useToast() from ToastContext
 * - Role check   → useAuth() from AuthContext
 * - Edit/Delete  → useSellerContext() from SellerContext
 *                  (startEdit, requestDelete — no prop drilling)
 *
 * Only `product` is passed as a prop (the data item itself).
 * This is correct — it's a list item, not cross-tree shared state.
 */

const CATEGORY_EMOJI = {
  electronics: '📱', fashion: '👗', sports: '⚽', beauty: '💄',
  home: '🏠', food: '🍎', books: '📚', toys: '🧸',
}

function getEmoji(category) {
  if (!category) return '📦'
  const key = category.toLowerCase()
  return Object.entries(CATEGORY_EMOJI).find(([k]) => key.includes(k))?.[1] || '📦'
}

function formatDate(dateStr) {
  if (!dateStr) return null
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    })
  } catch { return null }
}

export default function ProductCard({ product }) {
  const { addItem, openCart }          = useCart()
  const { isSeller, isAuthenticated }  = useAuth()
  const { showToast }                  = useToast()
  // Only mounted when inside SellerProvider — safe optional chaining for customer pages
  const sellerCtx = (() => { try { return useSellerContext() } catch { return null } })()

  const emoji      = getEmoji(product.category)
  const isOutOfStock = product.quantity != null && product.quantity <= 0
  const expiry       = formatDate(product.dateOfExpiry)
  const isExpired    = product.dateOfExpiry && new Date(product.dateOfExpiry) < new Date()

  function handleAddToCart() {
    addItem({
      id:    product.id,
      name:  product.name,
      brand: product.brand,
      price: product.price,
      emoji,
    })
    showToast(`${product.name} added to cart!`, 'success')
    openCart()
  }

  return (
    <div className="bg-white border border-bdr rounded-2xl overflow-hidden group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 flex flex-col">

      {/* Image area */}
      <div className="bg-warm aspect-square flex items-center justify-center text-7xl relative overflow-hidden">
        <span className="transition-transform duration-300 group-hover:scale-110 select-none">
          {emoji}
        </span>

        {product.category && (
          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-ink text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-bdr">
            {product.category}
          </span>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full border border-red-200">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        {product.brand && (
          <p className="text-[10.5px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">
            {product.brand}
          </p>
        )}
        <h3 className="text-sm font-semibold text-ink leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-ink-soft leading-relaxed line-clamp-2 mb-2">
            {product.description}
          </p>
        )}

        <div className="flex items-end justify-between mt-auto mb-3">
          <div>
            <p className="font-mono text-base font-medium text-ink">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>
            {product.quantity != null && (
              <p className={`text-[11px] mt-0.5 ${product.quantity <= 5 && product.quantity > 0 ? 'text-orange-500 font-semibold' : 'text-ink-faint'}`}>
                {product.quantity <= 0
                  ? 'Out of stock'
                  : product.quantity <= 5
                    ? `Only ${product.quantity} left`
                    : `${product.quantity} in stock`}
              </p>
            )}
          </div>
          {expiry && (
            <p className={`text-[10px] font-medium ${isExpired ? 'text-red-500' : 'text-ink-faint'}`}>
              {isExpired ? 'Expired' : `Exp: ${expiry}`}
            </p>
          )}
        </div>

        {/* ── Action buttons — role-gated, no callback props ── */}
        {isSeller && sellerCtx ? (
          <div className="flex gap-2">
            <button
              onClick={() => sellerCtx.startEdit(product)}
              className="flex-1 py-2 rounded-xl border border-seller/40 text-seller text-xs font-bold hover:bg-seller-light transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => sellerCtx.requestDelete(product.id)}
              className="flex-1 py-2 rounded-xl border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        ) : isAuthenticated ? (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isExpired}
            className="w-full py-2.5 bg-accent text-white rounded-xl text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        ) : (
          <a href="/login"
            className="w-full py-2.5 border border-accent text-accent rounded-xl text-sm font-bold hover:bg-accent-light transition-colors text-center block"
          >
            Sign in to buy
          </a>
        )}
      </div>
    </div>
  )
}
