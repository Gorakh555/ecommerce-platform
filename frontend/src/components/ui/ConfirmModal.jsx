import { useSellerContext } from '../../context/SellerContext.jsx'

/**
 * ConfirmModal — zero props.
 *
 * Reads deleteId, handleDelete, cancelDelete from SellerContext.
 * Renders only when deleteId is set.
 */
export default function ConfirmModal() {
  const { deleteId, handleDelete, cancelDelete } = useSellerContext()

  if (!deleteId) return null

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/50 fade-in px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full">
        <h3 className="font-serif text-xl text-ink mb-2">Delete product?</h3>
        <p className="text-sm text-ink-soft mb-7 leading-relaxed">
          This will permanently remove the product from the database. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={cancelDelete}
            className="flex-1 py-2.5 rounded-xl border border-bdr text-sm font-semibold text-ink-soft hover:bg-canvas transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  )
}
