import { motion } from 'motion/react'

const EASE = [0.2, 0.8, 0.2, 1]

/** Fades/slides children in once when scrolled into view. */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  className = '',
  amount = 0.2,
  ...rest
}) {
  const Cmp = motion[as] || motion.div
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Cmp>
  )
}

/** Container that staggers its <RevealItem> children. */
export function RevealGroup({ children, className = '', stagger = 0.07, amount = 0.15, as = 'div', ...rest }) {
  const Cmp = motion[as] || motion.div
  return (
    <Cmp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </Cmp>
  )
}

export function RevealItem({ children, className = '', y = 20, as = 'div', ...rest }) {
  const Cmp = motion[as] || motion.div
  return (
    <Cmp
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Cmp>
  )
}
