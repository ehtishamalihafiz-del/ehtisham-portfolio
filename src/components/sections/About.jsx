import { BookOpen, Briefcase, Handshake, Languages, MapPin, Sparkles, Users } from 'lucide-react'
import { about, site } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'

const openIcons = [Briefcase, Users, BookOpen]
const tones = {
  primary: { plate: 'from-[#5B85E6] to-[#3764D8]', dot: 'bg-primary' },
  lavender: { plate: 'from-[#C3C0F4] to-[#A5A1EB]', dot: 'bg-lavender' },
  cyan: { plate: 'from-[#6CCFDB] to-[#36B5C5]', dot: 'bg-cyan' },
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-labelledby="about-title">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="About"
          title={<span id="about-title">About Me</span>}
          lead="A Computer Science student moving deliberately from building web applications toward securing them."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-12">
          {/* Story */}
          <RevealItem className="card p-7 sm:p-9 lg:col-span-7">
            <p className="font-display text-[22px] font-medium leading-snug text-ink sm:text-[26px]">
              {about.lead.split('cybersecurity')[0]}
              <span className="text-gradient">cybersecurity</span>
              {about.lead.split('cybersecurity')[1]}
            </p>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mt-5 text-[16px] leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <div className="mt-8 border-t border-line pt-6">
              <p className="kicker mb-4 flex items-center gap-2">
                <Sparkles className="size-3.5" aria-hidden="true" /> Actively learning &amp; practising
              </p>
              <ul className="flex flex-wrap gap-2">
                {about.learning.map((l) => (
                  <li key={l} className="chip">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>

          {/* Layers diagram */}
          <RevealItem className="card group flex flex-col overflow-hidden p-7 sm:p-9 lg:col-span-5">
            <p className="kicker">How I look at systems</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight">Three layers, one picture.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Development taught me the application and data layers; networking teaches me what sits underneath.
              Security lives in how they interact.
            </p>
            <LayerStack />
          </RevealItem>

          {/* Open to */}
          <RevealItem className="card card-hover p-7 lg:col-span-4">
            <div className="grid size-11 place-items-center rounded-2xl bg-primary-50 text-primary">
              <Handshake className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">Open to</h3>
            <ul className="mt-4 space-y-2.5">
              {about.openTo.map((o, i) => {
                const I = openIcons[i] || Briefcase
                return (
                  <li key={o} className="flex items-center gap-3 text-[15px] text-ink">
                    <I className="size-4 text-cyan" aria-hidden="true" /> {o}
                  </li>
                )
              })}
            </ul>
          </RevealItem>

          {/* Location & languages */}
          <RevealItem className="card card-hover p-7 lg:col-span-4">
            <div className="grid size-11 place-items-center rounded-2xl bg-cyan-50 text-cyan">
              <Languages className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">Languages &amp; base</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {about.languages.map((l) => (
                <span key={l} className="chip">
                  {l}
                </span>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-[15px] text-muted">
              <MapPin className="size-4 text-primary" aria-hidden="true" /> {site.location}
            </p>
          </RevealItem>

          {/* Soft skills */}
          <RevealItem className="card card-hover p-7 lg:col-span-4">
            <div className="grid size-11 place-items-center rounded-2xl bg-lavender-50 text-[#6E69D6]">
              <Users className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">How I work</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[14px] text-ink">
              {about.softSkills.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-lavender" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}

/* Isometric stack: Application / Data / Network — plates separate on hover */
function LayerStack() {
  return (
    <ul className="mt-8 flex flex-1 flex-col justify-center gap-0 pb-2" aria-label="Application, data and network layers">
      {about.layers.map((layer, i) => (
        <li key={layer.label} className="relative flex items-center gap-4" style={{ zIndex: 10 - i, marginTop: i ? -22 : 0 }}>
          <div className="relative h-[96px] w-[150px] shrink-0 sm:w-[170px]" aria-hidden="true">
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out group-hover:[translate:0_var(--lift)]"
              style={{ '--lift': `${(i - 1) * 12}px` }}
            >
              <div
                className={`absolute inset-x-2 inset-y-4 rounded-[18px] border border-white/60 bg-gradient-to-br ${tones[layer.tone].plate} shadow-[0_18px_30px_-16px_rgba(36,50,75,0.55)]`}
                style={{ transform: 'rotateX(58deg) rotateZ(-40deg)' }}
              >
                <div className="absolute inset-3 rounded-[12px] border border-white/40 bg-white/15" />
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[15px] font-semibold text-ink">
              <span className={`size-1.5 rounded-full ${tones[layer.tone].dot}`} aria-hidden="true" />
              {layer.label}
            </p>
            <p className="mt-0.5 font-mono text-[11.5px] leading-relaxed text-muted">{layer.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
