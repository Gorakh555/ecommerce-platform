import { useCart } from '../../context/CartContext.jsx'

export default function CartItem({ item }) {
  const { setQty, removeItem } = useCart()
  return (
    <div className="flex gap-3.5 py-4">
      <div className="w-16 h-16 rounded-xl bg-warm flex items-center justify-center text-3xl flex-shrink-0 border border-bdr">
        {item.emoji || '📦'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink truncate">{item.name}</p>
        {item.brand && <p className="text-xs text-ink-faint">{item.brand}</p>}
        <p className="font-mono text-sm text-accent mt-0.5">₹{Number(item.price).toLocaleString('en-IN')}</p>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => setQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-md bg-canvas border border-bdr flex items-center justify-center font-bold text-sm hover:bg-bdr transition-colors">−</button>
          <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
          <button onClick={() => setQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-md bg-canvas border border-bdr flex items-center justify-center font-bold text-sm hover:bg-bdr transition-colors">+</button>
        </div>
      </div>
      <button onClick={() => removeItem(item.id)} className="self-start text-ink-faint hover:text-red-500 transition-colors text-sm p-1">✕</button>
    </div>
  )
}
