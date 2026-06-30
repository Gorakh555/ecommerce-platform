import { useEffect }  from 'react'
import { useCart }    from '../../context/CartContext.jsx'
import { useAuth }    from '../../context/AuthContext.jsx'
import CartItem       from './CartItem.jsx'

export default function CartDrawer() {
  const { items, open, closeCart, totalPrice } = useCart()
  const { isSeller } = useAuth()

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])

  // Sellers don't have a cart
  if (isSeller) return null

  return (
    <>
      <div onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-[200] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      <div className={`fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-white z-[201] flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-bdr">
          <h2 className="font-serif text-2xl text-ink">Cart</h2>
          <button onClick={closeCart} className="w-8 h-8 rounded-full bg-canvas hover:bg-bdr flex items-center justify-center text-sm transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16">
              <span className="text-5xl">🛒</span>
              <p className="font-semibold text-ink">Your cart is empty</p>
              <p className="text-sm text-ink-soft">Browse products and add something!</p>
              <button onClick={closeCart} className="mt-2 bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-bdr">{items.map(i => <CartItem key={i.id} item={i} />)}</div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-bdr space-y-3">
            {totalPrice < 999 && (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-3 rounded-xl">
                Add ₹{(999 - totalPrice).toLocaleString('en-IN')} more for free delivery 🚚
              </div>
            )}
            <div className="flex justify-between font-semibold text-ink text-base">
              <span>Subtotal</span>
              <span className="font-mono">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-ink-faint">Taxes &amp; shipping at checkout</p>
            <button className="w-full py-3.5 bg-accent text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  )
}
