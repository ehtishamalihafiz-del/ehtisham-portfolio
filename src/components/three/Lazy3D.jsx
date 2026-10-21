import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/* Detects WebGL support once. */
let webglSupport
function hasWebGL() {
  if (webglSupport !== undefined) return webglSupport
  try {
    const c = document.createElement('canvas')
    webglSupport = !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    webglSupport = false
  }
  return webglSupport
}

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err) {
    if (import.meta.env.DEV) console.warn('[3D] scene disabled:', err)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/**
 * Mounts a lazily-imported three.js scene only when it scrolls near the viewport,
 * pauses rendering while off-screen, and falls back gracefully when WebGL
 * is unavailable or the scene errors.
 *
 * `scene` is a React.lazy component that receives { active, reduced, ...sceneProps }.
 */
export default function Lazy3D({ scene: Scene, fallback = null, className = '', sceneProps = {}, rootMargin = '200px' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [supported] = useState(() => (typeof window === 'undefined' ? false : hasWebGL()))

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setMounted(true)
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  // Pause when the tab is hidden
  const [tabVisible, setTabVisible] = useState(true)
  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <div ref={ref} className={className}>
      {!supported
        ? fallback
        : mounted && (
            <SceneErrorBoundary fallback={fallback}>
              <Suspense fallback={fallback}>
                <Scene active={visible && tabVisible} reduced={!!reduced} {...sceneProps} />
              </Suspense>
            </SceneErrorBoundary>
          )}
    </div>
  )
}
