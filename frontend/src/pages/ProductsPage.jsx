import { Link }               from 'react-router-dom'
import { useAuth }            from '../context/AuthContext.jsx'
import { useProductContext }  from '../context/ProductContext.jsx'
import ProductCard            from '../components/product/ProductCard.jsx'
import Spinner                from '../components/ui/Spinner.jsx'

/**
 * ProductsPage — reads everything from ProductContext.
 * No local state for products, filtering, or sorting.
 * No props passed to ProductCard.
 */
export default function ProductsPage() {
  const { isSeller } = useAuth()
  const {
    filteredProducts, products,
    loading, error,
    search,    setSearch,
    category,  setCategory,
    sortBy,    setSortBy,
    categories,
  } = useProductContext()

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-4xl text-ink tracking-tight">Products</h1>
          <p className="text-sm text-ink-faint mt-1">
            {loading
              ? 'Loading…'
              : `${filteredProducts.length} of ${products.length} products`}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint text-sm">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, brand…"
            className="w-full pl-9 pr-4 py-2.5 rounded-full border-[1.5px] border-bdr bg-white text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Category + sort bar */}
      {!loading && products.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5 mb-7">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full border-[1.5px] text-xs font-semibold transition-all ${
                category === cat
                  ? 'border-accent text-accent bg-accent-light'
                  : 'border-bdr text-ink-soft bg-white hover:border-ink-faint'
              }`}>
              {cat}
            </button>
          ))}
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border-[1.5px] border-bdr rounded-xl px-3 py-1.5 text-xs font-semibold bg-white text-ink-soft focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="name">Name: A → Z</option>
              <option value="qty_desc">Most in Stock</option>
            </select>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-28 gap-4">
          <Spinner size="lg" />
          <p className="text-sm text-ink-soft">Fetching products from Spring Boot…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-5 mb-8">
          <p className="text-red-600 font-semibold text-sm mb-1">Failed to load products</p>
          <p className="text-red-500 text-xs leading-relaxed">{error}</p>
          <p className="text-xs text-ink-faint mt-2">
            Endpoint: <code className="bg-red-100 px-1 rounded">GET /products/</code> — ensure Spring Boot is on port 8080.
          </p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-24">
          <span className="text-5xl block mb-4">{search ? '🔍' : '📦'}</span>
          <p className="font-semibold text-ink text-lg mb-2">
            {search ? 'No products match your search' : 'No products yet'}
          </p>
          <p className="text-sm text-ink-soft">
            {search
              ? 'Try a different keyword.'
              : isSeller
                ? 'Create your first product from the Seller Dashboard.'
                : 'Check back soon!'}
          </p>
          {isSeller && !search && (
            <Link to="/seller"
              className="inline-block mt-5 bg-seller text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              Go to Seller Dashboard
            </Link>
          )}
        </div>
      )}

      {/* Grid — ProductCard receives only the data item */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
