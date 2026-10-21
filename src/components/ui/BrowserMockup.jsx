import { Lock } from 'lucide-react'

/**
 * Browser-window frame. Shows `image` if provided (a real screenshot placed in
 * /public/projects), otherwise an abstract, clearly-illustrative UI preview.
 */
export default function BrowserMockup({ domain, image, alt, preview = 'dashboard', className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_60px_-30px_rgba(36,50,75,0.35)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-canvas/80 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#F4A3A3]" />
          <span className="size-2.5 rounded-full bg-[#F5D08A]" />
          <span className="size-2.5 rounded-full bg-[#9ED9B6]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 font-mono text-[11px] text-muted">
          <Lock className="size-3 shrink-0 text-cyan" aria-hidden="true" />
          <span className="truncate">{domain}</span>
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-gradient-to-br from-mist to-white">
        {image ? (
          <img src={image} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover object-top" />
        ) : preview === 'store' ? (
          <StorePreview />
        ) : (
          <DashboardPreview />
        )}
      </div>
    </div>
  )
}

/* Abstract analytics dashboard (illustration, not a screenshot) */
function DashboardPreview() {
  const bars = [38, 62, 48, 80, 56, 92, 70, 84]
  return (
    <div className="absolute inset-0 flex gap-3 p-3 sm:p-4" role="img" aria-label="Illustrative dashboard preview">
      <div className="hidden w-[22%] flex-col gap-2 rounded-xl bg-white/80 p-2.5 sm:flex">
        <div className="h-2.5 w-3/4 rounded bg-primary/70" />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`h-2 rounded ${i === 1 ? 'w-full bg-primary/20' : 'w-4/5 bg-line'}`} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-white/90 p-2">
          <div className="h-2 flex-1 rounded bg-line" />
          <div className="h-5 w-14 rounded-md bg-primary/80" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['bg-primary/15', 'bg-cyan/20', 'bg-lavender/25'].map((c, i) => (
            <div key={i} className="rounded-xl bg-white/90 p-2">
              <div className={`mb-1.5 h-1.5 w-1/2 rounded ${c}`} />
              <div className="h-3 w-3/4 rounded bg-ink/15" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-[6%] rounded-xl bg-white/90 p-3">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-primary/70 to-cyan/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* Abstract storefront (illustration, not a screenshot) */
function StorePreview() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-3 sm:p-4" role="img" aria-label="Illustrative storefront preview">
      <div className="flex items-center justify-between rounded-xl bg-white/90 px-3 py-2">
        <div className="h-2.5 w-16 rounded bg-ink/70" />
        <div className="flex gap-2">
          <div className="h-2 w-8 rounded bg-line" />
          <div className="h-2 w-8 rounded bg-line" />
          <div className="size-4 rounded-full bg-primary/70" />
        </div>
      </div>
      <div className="flex gap-1.5">
        {['w-10 bg-primary/80', 'w-12 bg-line', 'w-9 bg-line', 'w-11 bg-line'].map((c, i) => (
          <div key={i} className={`h-4 rounded-full ${c}`} />
        ))}
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center justify-between rounded-xl bg-white/90 p-2">
            <div className="relative mt-1 grid aspect-square w-[62%] place-items-center rounded-full border-[3px] border-ink/15 bg-gradient-to-br from-mist to-white">
              <div className="absolute h-[34%] w-[3px] origin-bottom -translate-y-1/2 rounded bg-ink/40" style={{ rotate: `${i * 50 - 30}deg` }} />
              <div className="absolute h-[26%] w-[3px] origin-bottom -translate-y-1/2 rounded bg-primary/60" style={{ rotate: `${i * 70 + 80}deg` }} />
            </div>
            <div className="w-full space-y-1">
              <div className="h-1.5 w-3/4 rounded bg-ink/20" />
              <div className="flex items-center justify-between">
                <div className="h-2 w-1/3 rounded bg-cyan/50" />
                <div className="h-3.5 w-6 rounded bg-primary/70" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
