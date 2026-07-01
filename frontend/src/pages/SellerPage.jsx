import { useAuth }           from '../context/AuthContext.jsx'
import { useProductContext } from '../context/ProductContext.jsx'
import { useSellerContext }  from '../context/SellerContext.jsx'
import ProductCard           from '../components/product/ProductCard.jsx'
import ProductForm           from '../components/product/ProductForm.jsx'
import ConfirmModal          from '../components/ui/ConfirmModal.jsx'
import Spinner               from '../components/ui/Spinner.jsx'

/**
 * SellerPage — reads all state from context, passes zero props to children.
 *
 * ProductContext  → products list, loading, error
 * SellerContext   → view state, CRUD actions
 * ProductCard     → reads edit/delete from SellerContext internally
 * ProductForm     → reads form state and handlers from SellerContext internally
 * ConfirmModal    → reads deleteId and handlers from SellerContext internally
 */
export default function SellerPage() {
  const { user }                   = useAuth()
  const { products, loading, error } = useProductContext()
  const {
    view,
    editTarget,
    sellerSearch, setSellerSearch,
    startCreate,
  } = useSellerContext()

  /* Stats derived from context products */
  const totalValue = products.reduce((s, p) => s + (Number(p.price)    || 0), 0)
  const totalStock = products.reduce((s, p) => s + (Number(p.quantity) || 0), 0)
  const lowStock   = products.filter(p => p.quantity != null && p.quantity > 0 && p.quantity <= 5).length
  const outOfStock = products.filter(p => p.quantity != null && p.quantity <= 0).length

  const visibleProducts = sellerSearch.trim()
    ? products.filter(p =>
        p.name?.toLowerCase().includes(sellerSearch.toLowerCase()) ||
        p.brand?.toLowerCase().includes(sellerSearch.toLowerCase()) ||
        p.category?.toLowerCase().includes(sellerSearch.toLowerCase())
      )
    : products

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-serif text-4xl text-ink tracking-tight">Seller Dashboard</h1>
            <span className="bg-seller text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
              SELLER
            </span>
          </div>
          <p className="text-sm text-ink-soft">
            Logged in as <strong className="text-ink">{user?.username}</strong>
          </p>
        </div>

        {view === 'list' && (
          <button
            onClick={startCreate}
            className="bg-seller text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 flex-shrink-0"
          >
            + New Product
          </button>
        )}
      </div>

      {/* Stats — only shown in list view */}
      {view === 'list' && !loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: '📦', label: 'Total Products',  value: products.length,                         color: 'text-ink'        },
            { icon: '💰', label: 'Catalog Value',   value: `₹${totalValue.toLocaleString('en-IN')}`,color: 'text-accent'     },
            { icon: '📊', label: 'Total Stock',     value: totalStock,                              color: 'text-ink'        },
            { icon: '⚠️', label: 'Low / No Stock', value: `${lowStock} low · ${outOfStock} out`,   color: 'text-orange-500' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-bdr rounded-2xl p-5 flex items-center gap-3">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className={`font-mono text-base font-semibold ${s.color}`}>{s.value}</p>
                <p className="text-[11px] text-ink-faint mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit form — ProductForm reads everything from SellerContext */}
      {(view === 'create' || view === 'edit') && (
        <div className="max-w-lg mb-10">
          <div className="bg-white border border-bdr rounded-3xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-ink mb-1">
              {view === 'create' ? 'New Product' : `Edit: ${editTarget?.name}`}
            </h2>
            <p className="text-xs text-ink-faint mb-6">
              {view === 'create' ? 'POST → /products/product' : `PUT → /products/${editTarget?.id}`}
            </p>
            {/* No props — ProductForm pulls from SellerContext */}
            <ProductForm />
          </div>
        </div>
      )}

      {/* Product list */}
      {view === 'list' && (
        <>
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Spinner size="lg" />
              <p className="text-sm text-ink-soft">Fetching from GET /products/…</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-5 mb-6">
              <p className="text-red-600 font-semibold text-sm mb-1">Backend error</p>
              <p className="text-red-500 text-xs">{error}</p>
              <p className="text-xs text-ink-faint mt-1">Ensure Spring Boot is running on port 8080.</p>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-24">
              <span className="text-5xl block mb-4">📦</span>
              <p className="font-semibold text-ink text-lg mb-2">No products yet</p>
              <p className="text-sm text-ink-soft mb-6">Create your first product to start selling.</p>
              <button
                onClick={startCreate}
                className="bg-seller text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                + Create First Product
              </button>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              <div className="relative w-full sm:w-72 mb-6">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint text-sm">🔍</span>
                <input
                  value={sellerSearch}
                  onChange={e => setSellerSearch(e.target.value)}
                  placeholder="Filter your products…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-full border-[1.5px] border-bdr bg-white text-sm focus:outline-none focus:border-seller transition-colors"
                />
              </div>

              {/* ProductCard receives only `product` — no onEdit/onDelete props */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {visibleProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {visibleProducts.length === 0 && sellerSearch && (
                <p className="text-sm text-ink-soft text-center py-10">
                  No products match "{sellerSearch}"
                </p>
              )}
            </>
          )}
        </>
      )}

      {/* ConfirmModal reads deleteId/handlers from SellerContext — no props */}
      <ConfirmModal />
    </div>
  )
}
