export default function Badge({ count }) {
  if (!count) return null
  return (
    <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
      {count > 99 ? '99+' : count}
    </span>
  )
}
