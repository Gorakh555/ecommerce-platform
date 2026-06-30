import { useState, useEffect } from 'react'
import { useSellerContext }    from '../../context/SellerContext.jsx'
import Spinner                 from '../ui/Spinner.jsx'

/**
 * ProductForm — zero props.
 *
 * Reads everything it needs from SellerContext:
 *   - editTarget   → pre-fills form fields when editing
 *   - formLoading  → disables submit button during API call
 *   - handleCreate → called on submit when creating
 *   - handleUpdate → called on submit when editing
 *   - cancelForm   → called on cancel button
 *   - view         → determines whether we're in 'create' or 'edit' mode
 *
 * Field names match Product.java exactly:
 *   name, price, quantity, description, brand, category,
 *   dateOfManufacturing, dateOfExpiry
 */
const CATEGORIES = ['Electronics', 'Fashion', 'Sports', 'Beauty', 'Home', 'Food', 'Books', 'Toys', 'Other']

const EMPTY_FORM = {
  name: '', price: '', quantity: '', description: '',
  brand: '', category: '', dateOfManufacturing: '', dateOfExpiry: '',
}

function toInputDate(val) {
  if (!val) return ''
  try { return new Date(val).toISOString().split('T')[0] } catch { return '' }
}

function buildFormFromProduct(p) {
  return {
    name:                p.name                || '',
    price:               p.price               ?? '',
    quantity:            p.quantity             ?? '',
    description:         p.description          || '',
    brand:               p.brand                || '',
    category:            p.category             || '',
    dateOfManufacturing: toInputDate(p.dateOfManufacturing),
    dateOfExpiry:        toInputDate(p.dateOfExpiry),
  }
}

export default function ProductForm() {
  const { view, editTarget, formLoading, handleCreate, handleUpdate, cancelForm } =
    useSellerContext()

  const isEditing = view === 'edit'

  const [form, setForm] = useState(() =>
    isEditing && editTarget ? buildFormFromProduct(editTarget) : EMPTY_FORM
  )

  // When editTarget changes (switching between edits), rebuild the form
  useEffect(() => {
    if (isEditing && editTarget) {
      setForm(buildFormFromProduct(editTarget))
    } else {
      setForm(EMPTY_FORM)
    }
  }, [editTarget?.id, isEditing])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    const dto = {
      name:                form.name,
      price:               parseFloat(form.price)   || 0,
      quantity:            parseInt(form.quantity)   || 0,
      description:         form.description          || null,
      brand:               form.brand                || null,
      category:            form.category             || null,
      dateOfManufacturing: form.dateOfManufacturing  || null,
      dateOfExpiry:        form.dateOfExpiry          || null,
    }
    isEditing ? handleUpdate(dto) : handleCreate(dto)
  }

  const inputCls = "w-full px-3.5 py-2.5 border-[1.5px] border-bdr rounded-xl text-sm bg-canvas focus:outline-none focus:border-accent transition-colors"
  const labelCls = "text-[11px] font-bold text-ink-soft uppercase tracking-wide block mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelCls}>Product Name *</label>
        <input value={form.name} onChange={set('name')} required
          placeholder="e.g. Wireless Headphones" className={inputCls} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Price (₹) *</label>
          <input type="number" value={form.price} onChange={set('price')} required
            min="0" step="0.01" placeholder="e.g. 1999.00" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Quantity *</label>
          <input type="number" value={form.quantity} onChange={set('quantity')} required
            min="0" placeholder="e.g. 50" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Brand</label>
          <input value={form.brand} onChange={set('brand')} placeholder="e.g. Sony" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Category</label>
          <select value={form.category} onChange={set('category')} className={inputCls}>
            <option value="">Select…</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Description</label>
        <textarea value={form.description} onChange={set('description')} rows={3}
          placeholder="Brief product description…" className={`${inputCls} resize-none`} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Manufactured</label>
          <input type="date" value={form.dateOfManufacturing}
            onChange={set('dateOfManufacturing')} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Expiry</label>
          <input type="date" value={form.dateOfExpiry}
            onChange={set('dateOfExpiry')} className={inputCls} />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={cancelForm}
          className="flex-1 py-2.5 rounded-xl border border-bdr text-sm font-semibold text-ink-soft hover:bg-canvas transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={formLoading}
          className="flex-1 py-2.5 rounded-xl bg-accent text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
          {formLoading && <Spinner size="sm" />}
          {isEditing ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}
