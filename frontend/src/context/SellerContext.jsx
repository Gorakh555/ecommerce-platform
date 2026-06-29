
import { createContext, useContext, useState, useCallback } from 'react'
import { createProduct, updateProduct, deleteProduct } from '../services/api.js'
import { useToast }          from './ToastContext.jsx'
import { useProductContext } from './ProductContext.jsx'

const SellerContext = createContext(null)

export function SellerProvider({ children }) {
  const { showToast }      = useToast()
  const { refreshProducts } = useProductContext()

  const [view,        setView]        = useState('list')   
  const [editTarget,  setEditTarget]  = useState(null)     
  const [deleteId,    setDeleteId]    = useState(null)     
  const [formLoading, setFormLoading] = useState(false)   
  const [sellerSearch,setSellerSearch]= useState('')      

  
  const startCreate  = useCallback(() => { setEditTarget(null); setView('create') }, [])
  const startEdit    = useCallback((product) => { setEditTarget(product); setView('edit') }, [])
  const cancelForm   = useCallback(() => { setView('list'); setEditTarget(null) }, [])
  const requestDelete = useCallback((id) => setDeleteId(id), [])
  const cancelDelete  = useCallback(() => setDeleteId(null), [])

  
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
      
      view,
      editTarget,
      deleteId,
      formLoading,
      sellerSearch,
      setSellerSearch,
      
      startCreate,
      startEdit,
      cancelForm,
      requestDelete,
      cancelDelete,
     
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
