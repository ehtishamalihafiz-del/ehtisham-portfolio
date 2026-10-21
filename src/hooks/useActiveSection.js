import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently nearest the top of the viewport.
 * Uses a scroll listener (rAF-throttled) for stable results across section heights.
 */
export default function useActiveSection(ids, offset = 140) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0
    const compute = () => {
      frame = 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - offset <= 0) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids, offset])

  return active
}
