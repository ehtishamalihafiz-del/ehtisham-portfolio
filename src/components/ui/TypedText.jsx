import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Terminal-style typewriter that cycles through phrases.
 * Reduced-motion users see the phrases swap without typing.
 */
export default function TypedText({ words, typeSpeed = 55, deleteSpeed = 28, hold = 1800, className = '' }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(reduce ? words[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]

    if (reduce) {
      setText(word)
      const t = setTimeout(() => setIndex((i) => i + 1), hold + 1200)
      return () => clearTimeout(t)
    }

    let t
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words, reduce, typeSpeed, deleteSpeed, hold])

  return (
    <span className={className}>
      {/* Screen readers get the full, stable list instead of the animation */}
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.18em] rounded-[2px] bg-cyan animate-blink" />
      </span>
    </span>
  )
}
