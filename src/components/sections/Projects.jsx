import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Calendar, FlaskConical, LockKeyhole } from 'lucide-react'
import { projects } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'
import BrowserMockup from '../ui/BrowserMockup'
import Button from '../ui/Button'
import { GitHubIcon } from '../ui/icons'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Development' },
  { id: 'security', label: 'Security labs' },
]

export default function Projects() {
  const hasSecurity = projects.some((p) => p.category === 'security')
  const [filter, setFilter] = useState('all')
  const list = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)), [filter])

  return (
    <section id="projects" className="relative py-24 sm:py-32" aria-labelledby="projects-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="05"
            label="Featured Projects"
            title={<span id="projects-title">Things I've built.</span>}
            lead="Real products from my full-stack work. Building authentication, payments and data flows first-hand is the foundation I bring to application security."
          />
          {hasSecurity && (
            <div role="tablist" aria-label="Filter projects" className="flex w-fit gap-1 rounded-full border border-line bg-white p-1">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`h-9 rounded-full px-4 text-sm font-medium transition ${filter === f.id ? 'bg-primary text-white' : 'text-muted hover:text-ink'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-14 space-y-6 sm:space-y-8">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProjectCard project={p} flip={i % 2 === 1} />
              </motion.div>
            ))}
          </AnimatePresence>

          {!hasSecurity && (
            <Reveal className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-primary/30 bg-white/50 p-6 sm:flex-row sm:items-center sm:p-7">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lavender-50 text-[#6E69D6]">
                <FlaskConical className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Security labs &amp; write-ups</h3>
                <p className="mt-1 text-[15px] text-muted">
                  This space is reserved for upcoming cybersecurity and networking labs as I document them.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p, flip }) {
  return (
    <Reveal amount={0.15}>
      <article className="card overflow-hidden p-3 sm:p-4">
        <div className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-10 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          {/* Visual */}
          <TiltCard max={7} className="rounded-[1.4rem]">
            <div className="relative overflow-hidden rounded-[1.4rem] bg-[linear-gradient(140deg,#EFF6FF,#F1F0FD_55%,#E8F7F9)] p-5 sm:p-8">
              <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-50" />
              <div aria-hidden="true" className="absolute -right-10 -top-10 size-40 rounded-full bg-cyan/20 blur-3xl" />
              <div aria-hidden="true" className="absolute -bottom-12 -left-8 size-44 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative" style={{ transform: 'translateZ(30px)' }}>
                <BrowserMockup domain={p.domain || p.name} image={p.image} alt={`${p.name} screenshot`} preview={p.preview} />
              </div>
            </div>
          </TiltCard>

          {/* Content */}
          <div className="px-3 pb-4 sm:px-4 lg:py-6 lg:pr-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[11px] text-muted">
                <Calendar className="size-3.5" aria-hidden="true" /> {p.year}
              </span>
              <span className="rounded-full bg-primary-50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-primary">
                {p.category === 'security' ? 'Security lab' : 'Full-stack project'}
              </span>
            </div>
            <h3 className="mt-4 text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-tight">{p.name}</h3>
            <p className="mt-1 text-[16px] font-medium italic text-cyan">{p.subtitle}</p>

            <ul className="mt-5 space-y-2.5">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>

            {p.securityAngle && (
              <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-mist px-4 py-3 text-[14px] text-ink">
                <LockKeyhole className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="font-semibold">Security lens: </span>
                  {p.securityAngle}
                </span>
              </p>
            )}

            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
              {p.tech.map((t) => (
                <li key={t} className="rounded-lg border border-line bg-white px-2.5 py-1 font-mono text-[12px] text-ink">
                  {t}
                </li>
              ))}
            </ul>

            {(p.url || p.repo) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {p.url && (
                  <Button href={p.url} external size="sm" aria-label={`View ${p.name} (opens in a new tab)`}>
                    View Project
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Button>
                )}
                {p.repo && (
                  <Button href={p.repo} external size="sm" variant="secondary" aria-label={`${p.name} source on GitHub (opens in a new tab)`}>
                    <GitHubIcon size={16} /> GitHub
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
