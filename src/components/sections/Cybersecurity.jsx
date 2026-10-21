import { lazy, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { Hand, MousePointer2 } from 'lucide-react'
import { securityAreas, terminalSnippets } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'
import { Icon } from '../ui/icons'
import Lazy3D from '../three/Lazy3D'
import { useFinePointer } from '../../hooks/useMediaQuery'

const VlanScene = lazy(() => import('../three/VlanScene'))

/* Mirrors VLANS in VlanScene (kept here so the legend doesn't pull three.js into the main bundle) */
const VLAN_LEGEND = [
  { id: 10, color: '#3764D8' },
  { id: 20, color: '#9A95E6' },
  { id: 30, color: '#36B5C5' },
]

const accents = [
  'bg-primary-50 text-primary',
  'bg-cyan-50 text-cyan',
  'bg-lavender-50 text-[#6E69D6]',
  'bg-primary-50 text-primary',
  'bg-cyan-50 text-cyan',
]
const spans = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3']

export default function Cybersecurity() {
  const [vlan, setVlan] = useState(null)
  const fine = useFinePointer()

  return (
    <section id="cybersecurity" className="relative py-24 sm:py-32" aria-labelledby="cyber-title">
      {/* section tint */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,rgba(239,246,255,0.85)_18%,rgba(239,246,255,0.85)_82%,transparent)]" />
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Cybersecurity & Networking"
          title={<span id="cyber-title">Where I'm focusing now.</span>}
          lead="Network security and application security are my primary direction. These are the areas I'm building knowledge in — through Cisco Packet Tracer labs, the Linux command line and my own development work."
        />

        <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {/* 3D VLAN model */}
          <Reveal className="card relative overflow-hidden lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4 p-6 pb-0 sm:p-7 sm:pb-0">
              <div>
                <p className="kicker">Interactive model</p>
                <h3 className="mt-2 text-xl font-semibold sm:text-2xl">Segmenting a network with VLANs</h3>
              </div>
              <div role="group" aria-label="Highlight a VLAN" className="flex flex-wrap gap-1.5 rounded-full border border-line bg-canvas p-1">
                <VlanButton active={vlan === null} onClick={() => setVlan(null)}>
                  All
                </VlanButton>
                {VLAN_LEGEND.map((v) => (
                  <VlanButton key={v.id} active={vlan === v.id} onClick={() => setVlan(v.id)}>
                    <span className="size-2 rounded-full" style={{ background: v.color }} aria-hidden="true" />
                    VLAN {v.id}
                  </VlanButton>
                ))}
              </div>
            </div>

            <Lazy3D
              scene={VlanScene}
              sceneProps={{ selected: vlan, interactive: fine }}
              className="relative h-[340px] sm:h-[400px]"
              fallback={<div className="absolute inset-0 grid place-items-center text-sm text-muted">Interactive 3D model unavailable on this device.</div>}
            />

            <div className="flex flex-col gap-2 border-t border-line bg-canvas/60 px-6 py-4 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <p>
                Same-VLAN traffic crosses the trunk between switches; inter-VLAN traffic is routed through R1.
              </p>
              <p className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary">
                {fine ? <MousePointer2 className="size-3.5" aria-hidden="true" /> : <Hand className="size-3.5" aria-hidden="true" />}
                {fine ? 'Drag to rotate' : 'Tap a VLAN'}
              </p>
            </div>
          </Reveal>

          {/* Terminal */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <Terminal />
          </Reveal>
        </div>

        {/* Knowledge areas */}
        <RevealGroup className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          {securityAreas.map((area, i) => (
            <RevealItem key={area.key} className={`${spans[i]} ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
              <TiltCard max={6} className="card card-hover overflow-hidden p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <div className={`grid size-12 place-items-center rounded-2xl ${accents[i]} transition-transform duration-500 group-hover/tilt:rotate-[-8deg] group-hover/tilt:scale-110`}>
                    <Icon name={area.icon} className="size-[22px]" />
                  </div>
                  <span className="rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Learning area
                  </span>
                </div>
                <h3 className="mt-5 text-[21px] font-semibold">{area.title}</h3>
                <p className="mt-1.5 text-[14.5px] text-muted">{area.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {area.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-[14.5px] text-ink">
                      <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-cyan" aria-hidden="true">
                        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
                {/* decorative circuit line */}
                <svg aria-hidden="true" className="pointer-events-none absolute -bottom-2 -right-2 h-24 w-40 text-primary/10 transition-colors duration-500 group-hover/tilt:text-primary/25" viewBox="0 0 160 96" fill="none">
                  <path d="M0 80h50l20-20h40l20-20h30M60 96V70l12-12M110 40V10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="110" cy="10" r="4" fill="currentColor" />
                  <circle cx="50" cy="80" r="4" fill="currentColor" />
                </svg>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function VlanButton({ active, children, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 font-mono text-[11.5px] font-medium transition ${
        active ? 'bg-white text-ink shadow-sm ring-1 ring-line' : 'text-muted hover:text-ink'
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

/* Tabbed terminal that "types" practice snippets when visible */
function Terminal() {
  const [tab, setTab] = useState('ios')
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.4 })
  const reduce = useReducedMotion()
  const snippet = terminalSnippets[tab]
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (reduce) {
      setShown(snippet.lines.length)
      return
    }
    if (!inView) return
    setShown(0)
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(i)
      if (i >= snippet.lines.length) clearInterval(id)
    }, 280)
    return () => clearInterval(id)
  }, [tab, inView, reduce, snippet.lines.length])

  return (
    <div ref={ref} className="card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#F4A3A3]" />
          <span className="size-2.5 rounded-full bg-[#F5D08A]" />
          <span className="size-2.5 rounded-full bg-[#9ED9B6]" />
        </div>
        <div role="tablist" aria-label="Terminal snippets" className="flex gap-1 rounded-full bg-canvas p-1">
          {Object.entries(terminalSnippets).map(([key, s]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`h-7 rounded-full px-3 font-mono text-[11.5px] transition ${
                tab === key ? 'bg-white text-primary shadow-sm ring-1 ring-line' : 'text-muted hover:text-ink'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 bg-[linear-gradient(180deg,#FBFCFE,#F3F7FE)] p-5 font-mono text-[12.5px] leading-[1.9] sm:text-[13px]" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {snippet.lines.slice(0, shown).map((l, i) => (
              <div key={i} className="flex min-w-0 gap-2 whitespace-pre-wrap break-all">
                {l.o ? (
                  <span className="text-muted">{l.o}</span>
                ) : (
                  <>
                    <span className="shrink-0 text-cyan">{l.p}</span>
                    <span className="text-ink">{l.c}</span>
                  </>
                )}
              </div>
            ))}
            <span className="inline-block h-4 w-2 translate-y-0.5 bg-primary/70 animate-blink" aria-hidden="true" />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="border-t border-line px-5 py-3 font-mono text-[11px] text-muted">{snippet.caption}</p>
    </div>
  )
}
