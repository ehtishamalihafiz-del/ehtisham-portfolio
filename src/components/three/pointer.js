/* Shared, allocation-free window pointer tracker for 3D parallax.
   x / y are normalised to [-1, 1] relative to the viewport. */
export const pointer = { x: 0, y: 0 }

let attached = false
export function attachPointer() {
  if (attached || typeof window === 'undefined') return
  attached = true
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    },
    { passive: true },
  )
}
