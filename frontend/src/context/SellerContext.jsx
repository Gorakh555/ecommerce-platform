/**
 * SellerContext
 *
 * Owns ALL seller CRUD view state and mutation logic:
 *  - view: 'list' | 'create' | 'edit'
 *  - editTarget: the product currently being edited
 *  - deleteId:   the product id pending deletion (shows confirm modal)
 *  - formLoading: true while create/update API call is in flight
 *  - sellerSearch: search query within the seller dashboard
 *
 * Exposes actions:
 *  - startCreate()        → switch to create form
 *  - startEdit(product)   → switch to edit form with that product
 *  - requestDelete(id)    → open confirm modal for that id
 *  - cancelDelete()       → close confirm modal
 *  - cancelForm()         → go back to list view
 *  - handleCreate(dto)    → POST /products/product then refresh
 *  - handleUpdate(dto)    → PUT /products/{id}  then refresh
 *  - handleDelete()       → DELETE /products/{id} then refresh
 *
 * ProductCard and ProductForm read from this context directly
 * instead of receiving callbacks via props.
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { createProduct, updateProduct, deleteProduct } from '../services/api.js'
import { useToast }          from './ToastContext.jsx'
import { useProductContext } from './ProductContext.jsx'

const SellerContext = createContext(null)

export function SellerProvider({ children }) {
  const { showToast }      = useToast()
  const { refreshProducts } = useProductContext()

  const [view,        setView]        = useState('list')   // 'list' | 'create' | 'edit'
  const [editTarget,  setEditTarget]  = useState(null)     // Product being edited
  const [deleteId,    setDeleteId]    = useState(null)     // Product id awaiting delete confirm
  const [formLoading, setFormLoading] = useState(false)    // API call in flight
  const [sellerSearch,setSellerSearch]= useState('')       // Dashboard search input

  /* ── Navigation actions ──────────────────── */
  const startCreate  = useCallback(() => { setEditTarget(null); setView('create') }, [])
  const startEdit    = useCallback((product) => { setEditTarget(product); setView('edit') }, [])
  const cancelForm   = useCallback(() => { setView('list'); setEditTarget(null) }, [])
  const requestDelete = useCallback((id) => setDeleteId(id), [])
  const cancelDelete  = useCallback(() => setDeleteId(null), [])

  /* ── CREATE — POST /products/product ─────── */
  const handleCreate = useCallback(async (dto) => {
    setFormLoading(true)
    try {
      await createProduct(dto)
      showToast('Product created successfully! ✅', 'success')
      refreshProducts()
      setView('list')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setFormLoading(false)
    }
  }, [showToast, refreshProducts])

  /* ── UPDATE — PUT /products/{id} ─────────── */
  const handleUpdate = useCallback(async (dto) => {
    setFormLoading(true)
    try {
      await updateProduct(editTarget.id, dto)
      showToast('Product updated successfully! ✅', 'success')
      refreshProducts()
      setView('list')
      setEditTarget(null)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setFormLoading(false)
    }
  }, [editTarget, showToast, refreshProducts])

  /* ── DELETE — DELETE /products/{id} ──────── */
  const handleDelete = useCallback(async () => {
    const id = deleteId
    setDeleteId(null)
    try {
      await deleteProduct(id)
      showToast('Product deleted.', 'info')
      refreshProducts()
    } catch (err) {
      showToast(err.message, 'error')
    }
  }, [deleteId, showToast, refreshProducts])

  return (
    <SellerContext.Provider value={{
      /* view state */
      view,
      editTarget,
      deleteId,
      formLoading,
      sellerSearch,
      setSellerSearch,
      /* navigation */
      startCreate,
      startEdit,
      cancelForm,
      requestDelete,
      cancelDelete,
      /* mutations */
      handleCreate,
      handleUpdate,
      handleDelete,
    }}>
      {children}
    </SellerContext.Provider>
  )
}

export function useSellerContext() {
  const ctx = useContext(SellerContext)
  if (!ctx) throw new Error('useSellerContext must be inside <SellerProvider>')
  return ctx
}
