import { useState, useEffect } from 'react'

export function useCountdown(endMs) {
  const [left, setLeft] = useState(() => Math.max(0, endMs - Date.now()))
  useEffect(() => {
    const id = setInterval(() => setLeft(p => Math.max(0, p - 1000)), 1000)
    return () => clearInterval(id)
  }, [])
  return {
    hours:   String(Math.floor(left / 3600000)).padStart(2, '0'),
    minutes: String(Math.floor((left % 3600000) / 60000)).padStart(2, '0'),
    seconds: String(Math.floor((left % 60000) / 1000)).padStart(2, '0'),
  }
}
