/**
 * Fixed, GPU-cheap ambient backdrop: slowly drifting gradient blobs
 * plus a faint dotted "network fabric". Pure CSS, no JS per frame.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F8FAFC_0%,#F3F7FE_45%,#F8FAFC_100%)]" />
      <div className="absolute -left-[12%] -top-[18%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(55,100,216,0.13),transparent_62%)] blur-2xl animate-drift-a" />
      <div className="absolute -right-[16%] top-[8%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(165,161,235,0.18),transparent_62%)] blur-2xl animate-drift-b" />
      <div className="absolute bottom-[-25%] left-[20%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(54,181,197,0.12),transparent_62%)] blur-2xl animate-drift-a [animation-delay:-9s]" />
      <div className="bg-dots mask-fade absolute inset-0 opacity-60" />
    </div>
  )
}
