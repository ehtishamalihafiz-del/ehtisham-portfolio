import { ShieldCheck, Terminal } from 'lucide-react'
import { skillGroups } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { Icon } from '../ui/icons'

export default function Skills() {
  const { security, development } = skillGroups
  return (
    <section id="skills" className="relative py-24 sm:py-32" aria-labelledby="skills-title">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Technical Skills"
          title={<span id="skills-title">The toolkit.</span>}
          lead="Security and infrastructure first, backed by a software development stack I've used to ship real projects."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {/* Security & infrastructure */}
          <RevealItem className="card relative overflow-hidden p-7 sm:p-9 lg:col-span-5">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(55,100,216,0.10),transparent_60%),radial-gradient(90%_70%_at_100%_100%,rgba(54,181,197,0.12),transparent_60%)]" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary text-white shadow-[0_10px_24px_-10px_rgba(55,100,216,0.8)]">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-primary ring-1 ring-primary/15">
                  Primary focus
                </span>
              </div>
              <h3 className="mt-6 text-[26px] font-semibold leading-tight">{security.title}</h3>
              <p className="mt-2 text-[15px] text-muted">{security.subtitle}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {security.skills.map((s) => (
                  <li key={s} className="chip bg-white/90">
                    <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-2 rounded-2xl border border-dashed border-primary/25 bg-white/60 px-4 py-3 font-mono text-[12px] text-muted">
                <Terminal className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="truncate">learning --focus network-security application-security</span>
              </div>
            </div>
          </RevealItem>

          {/* Development */}
          <RevealItem className="card p-7 sm:p-9 lg:col-span-7">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 className="text-[26px] font-semibold leading-tight">{development.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{development.subtitle}</p>
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {development.clusters.map((c, i) => (
                <div
                  key={c.label}
                  className="group rounded-2xl border border-line bg-canvas/60 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white hover:shadow-[var(--shadow-soft)]"
                >
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                    <span
                      className={`grid size-7 place-items-center rounded-lg transition-transform group-hover:scale-110 ${
                        i % 3 === 0 ? 'bg-primary-50 text-primary' : i % 3 === 1 ? 'bg-cyan-50 text-cyan' : 'bg-lavender-50 text-[#6E69D6]'
                      }`}
                    >
                      <Icon name={c.icon} className="size-4" />
                    </span>
                    {c.label}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <li key={s} className="rounded-lg border border-line bg-white px-2.5 py-1 text-[13px] text-ink">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
