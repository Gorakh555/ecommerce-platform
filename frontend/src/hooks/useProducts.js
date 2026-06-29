/**
 * Fetches GET /products/ — public endpoint, no auth required.
 * Re-fetches whenever `refresh` changes (increment after mutations).
 */
import { useState, useEffect } from 'react'
import { getProducts } from '../services/api.js'

export function useProducts(refresh = 0) {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true); setError(null)
    getProducts()
      .then(data => { if (!cancelled) setProducts(Array.isArray(data) ? data : []) })
      .catch(err  => { if (!cancelled) setError(err.message) })
      .finally(()  => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [refresh])

  return { products, loading, error, setProducts }
}
