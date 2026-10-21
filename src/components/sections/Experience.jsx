import { Award, BriefcaseBusiness, Target } from 'lucide-react'
import { certifications, currentFocus, experience } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { Icon } from '../ui/icons'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32" aria-labelledby="experience-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,rgba(239,246,255,0.8)_20%,rgba(239,246,255,0.8)_80%,transparent)]" />
      <div className="container-x">
        <SectionHeading
          index="07"
          label="Experience & Certifications"
          title={<span id="experience-title">Experience.</span>}
          lead="Where my practical skills come from."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {experience.map((x) => (
            <RevealItem key={x.role} className="card relative overflow-hidden p-7 sm:p-9 lg:col-span-8 lg:row-span-2">
              <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(54,181,197,0.14),transparent_65%)]" />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#3764D8,#36B5C5)] text-white shadow-[0_12px_28px_-12px_rgba(55,100,216,0.8)]">
                    <BriefcaseBusiness className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[22px] font-semibold leading-tight sm:text-[26px]">{x.role}</h3>
                    <p className="mt-1 text-[15px] font-medium italic text-cyan">{x.org}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 font-mono text-[12px] text-ink">
                  {x.current && <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />}
                  {x.period}
                </span>
              </div>
              <ul className="relative mt-8 space-y-3">
                {x.points.map((p, i) => (
                  <li key={p} className="flex items-start gap-4 rounded-2xl border border-line bg-canvas/60 px-4 py-3.5 text-[15.5px] text-ink">
                    <span className="mt-0.5 font-mono text-[12px] text-primary">{String(i + 1).padStart(2, '0')}</span>
                    {p}
                  </li>
                ))}
              </ul>
              <ul className="relative mt-6 flex flex-wrap gap-1.5" aria-label="Tools used">
                {x.tech.map((t) => (
                  <li key={t} className="rounded-lg border border-line bg-white px-2.5 py-1 font-mono text-[12px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}

          {/* Certifications */}
          <RevealItem id="certifications" className="card card-hover p-7 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-lavender-50 text-[#6E69D6]">
                <Award className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold">Certifications</h3>
            </div>
            <ul className="mt-5 space-y-2.5">
              {certifications.map((c) => (
                <li key={c.title} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink">
                  <Icon name={c.icon} className="size-5 text-primary" />
                  {c.title}
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Current focus */}
          <RevealItem className="card card-hover p-7 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-cyan-50 text-cyan">
                <Target className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-semibold">Current focus</h3>
            </div>
            <ul className="mt-5 space-y-2">
              {currentFocus.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[15px] text-ink">
                  <span className="size-1.5 rounded-full bg-cyan" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
