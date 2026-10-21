import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)

  useEffect(() => {
    if (!window.matchMedia) return
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [query])

  return matches
}

/** True on mouse/trackpad devices (hover + fine pointer). */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

/** True below the Tailwind `md` breakpoint. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')

/** Rough low-power heuristic used to scale down 3D work. */
export function isLowPowerDevice() {
  if (typeof navigator === 'undefined') return false
  const cores = navigator.hardwareConcurrency || 4
  const mem = navigator.deviceMemory || 4
  const small = typeof window !== 'undefined' && window.innerWidth < 768
  return cores <= 4 || mem <= 2 || small
}
