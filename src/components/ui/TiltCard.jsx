import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useFinePointer } from '../../hooks/useMediaQuery'

/**
 * Card that tilts in 3D toward the pointer, with a soft light glare.
 * Automatically disabled on touch devices and for reduced-motion users.
 */
export default function TiltCard({
  children,
  className = '',
  max = 8,
  glare = true,
  as = 'div',
  style,
  ...rest
}) {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const enabled = fine && !reduce

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18, mass: 0.6 }
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(255,255,255,0.55), rgba(255,255,255,0) 45%)`

  function onMove(e) {
    if (!enabled) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  function onLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  const Cmp = motion[as] || motion.div
  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <Cmp
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={enabled ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', ...style } : style}
        className={`group/tilt relative h-full ${className}`}
        {...rest}
      >
        {children}
        {enabled && glare && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </Cmp>
    </div>
  )
}
