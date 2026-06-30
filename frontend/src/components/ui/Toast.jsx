import { useToast } from '../../context/ToastContext.jsx'
const ICON  = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' }
const RING  = { success:'border-green-500/30', error:'border-red-500/30', info:'border-accent/30', warning:'border-yellow-400/30' }
export default function Toast() {
  const { toasts, dismiss } = useToast()
  return (
    <div className="fixed bottom-6 right-6 z-[500] flex flex-col gap-2.5 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} onClick={() => dismiss(t.id)}
          className={`toast-in flex items-start gap-3 bg-[#0f0f0f] text-white px-4 py-3.5 rounded-2xl text-sm font-medium shadow-2xl pointer-events-auto cursor-pointer max-w-sm border ${RING[t.type] || RING.success}`}>
          <span className="text-base flex-shrink-0 mt-0.5">{ICON[t.type]}</span>
          <span className="leading-snug">{t.message}</span>
        </div>
      ))}
    </div>
  )
}
