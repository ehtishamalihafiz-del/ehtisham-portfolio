import { expertise } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { Icon } from '../ui/icons'

export default function Expertise() {
  return (
    <section id="expertise" className="relative py-24 sm:py-28" aria-labelledby="expertise-title">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Areas of Expertise"
          title={<span id="expertise-title">What I bring to a team.</span>}
          lead="Hands-on where I've shipped real work, and learning areas where I'm actively building depth."
        />
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {expertise.map((e, i) => {
            const hands = e.kind === 'Hands-on'
            return (
              <RevealItem key={e.title} className="card card-hover group relative overflow-hidden p-6">
                <span aria-hidden="true" className="absolute right-5 top-5 font-mono text-[11px] text-muted/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className={`grid size-11 place-items-center rounded-2xl transition-all duration-500 group-hover:-translate-y-0.5 ${
                    hands ? 'bg-primary text-white' : 'bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}
                >
                  <Icon name={e.icon} className="size-5" />
                </div>
                <h3 className="mt-5 text-[18px] font-semibold leading-snug">{e.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{e.text}</p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider ${
                    hands ? 'bg-cyan-50 text-[#1F8A98]' : 'bg-lavender-50 text-[#6E69D6]'
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${hands ? 'bg-cyan' : 'bg-lavender'}`} aria-hidden="true" />
                  {e.kind}
                </span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#3764D8,#36B5C5,#A5A1EB)] transition-transform duration-500 group-hover:scale-x-100" />
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
