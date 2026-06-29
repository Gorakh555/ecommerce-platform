/**
 * ProductContext
 * 
 * Owns:
 *  - products list fetched from GET /products/
 *  - loading / error state
 *  - refresh trigger (increment to re-fetch after mutations)
 *  - client-side filter: search, category, sortBy
 *  - derived: filteredProducts, categories (unique from live data)
 *
 * This removes all product-related props and local state from
 * ProductsPage and SellerPage — they just call useProducts().
 */
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { getProducts } from '../services/api.js'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  /* ── Raw data from backend ─────────────────── */
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [refresh,  setRefresh]  = useState(0)

  /* ── Filter / sort state ───────────────────── */
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy,   setSortBy]   = useState('default')

  /* ── Fetch on mount + whenever refresh bumps ─ */
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getProducts()
      .then(data => { if (!cancelled) setProducts(Array.isArray(data) ? data : []) })
      .catch(err  => { if (!cancelled) setError(err.message) })
      .finally(()  => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [refresh])

  /* ── Trigger a re-fetch (call after create/update/delete) ── */
  const refreshProducts = useCallback(() => setRefresh(r => r + 1), [])

  /* ── Unique category list derived from live data ── */
  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean)
    return ['All', ...new Set(cats)]
  }, [products])

  /* ── Filtered + sorted view ───────────────── */
  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (category !== 'All') {
      list = list.filter(p => p.category === category)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }
    if (sortBy === 'price_asc')  list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'name')       list.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    if (sortBy === 'qty_desc')   list.sort((a, b) => b.quantity - a.quantity)

    return list
  }, [products, category, search, sortBy])

  return (
    <ProductContext.Provider value={{
      /* data */
      products,
      filteredProducts,
      loading,
      error,
      /* filter controls */
      search,   setSearch,
      category, setCategory,
      sortBy,   setSortBy,
      categories,
      /* actions */
      refreshProducts,
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProductContext must be inside <ProductProvider>')
  return ctx
}
