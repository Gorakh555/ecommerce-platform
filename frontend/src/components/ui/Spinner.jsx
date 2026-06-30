export default function Spinner({ size = 'md', className = '' }) {
  const s = { sm: 'w-4 h-4 border-[2px]', md: 'w-7 h-7 border-2', lg: 'w-12 h-12 border-[3px]' }[size]
  return <div className={`${s} rounded-full border-bdr border-t-accent spin ${className}`} role="status" aria-label="Loading" />
}
