import { motion } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { education } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32" aria-labelledby="education-title">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="06"
            label="Education"
            title={<span id="education-title">Academic path.</span>}
            lead="From pre-engineering to Computer Science — with cybersecurity as the direction I'm now building toward."
          />
        </div>

        <ol className="relative">
          {/* timeline rail */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-[19px] top-6 w-[2px] origin-top rounded-full bg-[linear-gradient(180deg,#3764D8,#36B5C5,#A5A1EB)] sm:left-[23px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          />
          {education.map((e, i) => (
            <Reveal as="li" key={e.degree} delay={i * 0.12} className="relative pb-6 pl-14 last:pb-0 sm:pl-16">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-5 grid size-10 place-items-center rounded-full border-4 border-canvas sm:size-12 ${
                  e.current ? 'bg-primary text-white shadow-[0_0_0_6px_rgba(55,100,216,0.12)]' : 'bg-white text-primary ring-1 ring-line'
                }`}
              >
                <GraduationCap className="size-4 sm:size-5" />
              </span>
              <div className="card card-hover p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[12px] text-muted">{e.period}</span>
                  {e.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-[#1F8A98]">
                      <span className="size-1.5 rounded-full bg-cyan" /> {e.note || 'Current'}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-[21px] font-semibold leading-snug sm:text-[23px]">{e.degree}</h3>
                {e.institution && <p className="mt-1.5 text-[15px] font-medium text-primary">{e.institution}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
