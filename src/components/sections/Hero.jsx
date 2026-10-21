import { lazy } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowRight, Atom, CodeXml, Download, Mail, MapPin, Router, ShieldCheck, SquareTerminal } from 'lucide-react'
import { hero, site } from '../../data/portfolio'
import Button from '../ui/Button'
import TypedText from '../ui/TypedText'
import { GitHubIcon, LinkedInIcon } from '../ui/icons'
import Lazy3D from '../three/Lazy3D'
import { useFinePointer } from '../../hooks/useMediaQuery'

const HeroScene = lazy(() => import('../three/HeroScene'))

const EASE = [0.2, 0.8, 0.2, 1]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36" aria-label="Introduction">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        {/* ---------- Copy ---------- */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.p
            {...fadeUp(0.05)}
            className="glass inline-flex max-w-full items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-ink shadow-[0_6px_24px_-12px_rgba(55,100,216,0.4)]"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white">
              <ShieldCheck className="size-4" aria-hidden="true" />
            </span>
            <span className="truncate sm:whitespace-normal">{hero.badge}</span>
          </motion.p>

          <motion.h1
            {...fadeUp(0.12)}
            className="mt-7 text-[clamp(2.75rem,8.4vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
          >
            <span className="block text-ink/90">{hero.greeting}</span>
            <span className="text-gradient block pb-2">{site.name}.</span>
          </motion.h1>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-5 inline-flex min-h-[44px] max-w-full items-center gap-2 rounded-xl border border-line bg-white/80 px-3.5 py-2 font-mono text-[13px] text-ink shadow-sm sm:text-[15px]"
          >
            <span className="text-cyan" aria-hidden="true">
              ~$
            </span>
            <TypedText words={hero.titles} />
          </motion.div>

          <motion.p
            {...fadeUp(0.28)}
            className="mx-auto mt-6 max-w-[580px] text-[16.5px] leading-relaxed text-muted lg:mx-0 lg:text-[17.5px]"
          >
            {hero.intro}
          </motion.p>

          <motion.div {...fadeUp(0.36)} className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button href="#projects">
              Explore My Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button href={site.cvFile} download={site.cvDownloadName} variant="secondary">
              <Download className="size-4" aria-hidden="true" /> Download CV
            </Button>
            <Button href="#contact" variant="secondary">
              <Mail className="size-4" aria-hidden="true" /> Contact Me
            </Button>
          </motion.div>

          <motion.div {...fadeUp(0.44)} className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              <GitHubIcon size={19} />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid size-11 place-items-center rounded-full border border-line bg-white text-[#0A66C2] transition hover:-translate-y-0.5 hover:border-primary/30"
            >
              <LinkedInIcon size={18} />
            </a>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4 text-primary" aria-hidden="true" /> {site.location}
            </span>
          </motion.div>
        </div>

        {/* ---------- Portrait stage ---------- */}
        <PortraitStage />
      </div>

      <TechMarquee />
    </section>
  )
}

const badgeIcons = { Cybersecurity: ShieldCheck, Linux: SquareTerminal, Cisco: Router, React: Atom, Python: CodeXml }
/* position + parallax depth for each floating badge */
const badgeLayout = [
  { cls: 'block left-[-6%] top-[9%] sm:left-[-12%]', depth: 26, delay: 0 },
  { cls: 'block right-[-5%] top-[22%] sm:right-[-14%]', depth: 34, delay: 1.2 },
  { cls: 'hidden sm:block left-[-16%] top-[56%]', depth: 40, delay: 0.6 },
  { cls: 'block right-[-4%] bottom-[26%] sm:right-[-10%]', depth: 22, delay: 1.8 },
  { cls: 'hidden sm:block left-[4%] bottom-[-3%]', depth: 30, delay: 2.4 },
]

function PortraitStage() {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const enabled = fine && !reduce

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 90, damping: 18 })
  const sy = useSpring(my, { stiffness: 90, damping: 18 })
  const rotY = useTransform(sx, [-1, 1], [-7, 7])
  const rotX = useTransform(sy, [-1, 1], [6, -6])

  function onMove(e) {
    if (!enabled) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[420px]"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ perspective: 1400 }}
    >
      {/* 3D network globe behind the portrait */}
      <Lazy3D
        scene={HeroScene}
        rootMargin="0px"
        className="pointer-events-none absolute -inset-x-[42%] -inset-y-[24%]"
        fallback={<GlobeFallback />}
      />

      <motion.div style={enabled ? { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' } : undefined} className="relative">
        {/* Portrait card */}
        <div className="ring-gradient glass relative rounded-[2.1rem] p-2.5 shadow-[0_40px_80px_-40px_rgba(36,50,75,0.55)]">
          <div className="relative overflow-hidden rounded-[1.7rem] bg-mist">
            <picture>
              <source type="image/webp" srcSet={site.portrait.srcSet} sizes="(max-width: 640px) 300px, 420px" />
              <img
                src={site.portrait.fallback}
                alt={site.portrait.alt}
                width={site.portrait.width}
                height={site.portrait.height}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-[50%_18%]"
              />
            </picture>
            {/* soft brand tint at the base for legibility of the status chip */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#24324B]/45 to-transparent" />
            {/* viewfinder corners */}
            {['left-3 top-3 border-l-2 border-t-2', 'right-3 top-3 border-r-2 border-t-2', 'left-3 bottom-3 border-l-2 border-b-2', 'right-3 bottom-3 border-r-2 border-b-2'].map((c) => (
              <span key={c} aria-hidden="true" className={`absolute size-5 rounded-[3px] border-white/80 ${c}`} />
            ))}
          </div>

          {/* status chip */}
          <div
            className="absolute inset-x-8 bottom-10 flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 text-[12px] sm:text-[13px] font-medium text-ink shadow-lg backdrop-blur"
            style={enabled ? { transform: 'translateZ(40px)' } : undefined}
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 animate-ping-soft" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            {hero.status}
          </div>
        </div>

        {/* Floating technology badges */}
        {hero.floatingBadges.map((label, i) => {
          const Ico = badgeIcons[label] || ShieldCheck
          const l = badgeLayout[i % badgeLayout.length]
          return (
            <div
              key={label}
              className={`absolute z-10 ${l.cls}`}
              style={enabled ? { transform: `translateZ(${l.depth * 2}px)` } : undefined}
            >
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: EASE }}
              >
                <span
                  className="glass flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-3.5 text-[12.5px] font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(55,100,216,0.45)] animate-float"
                  style={{ animationDelay: `${l.delay}s` }}
                >
                  <span className={`grid size-7 place-items-center rounded-full ${i % 3 === 0 ? 'bg-primary-50 text-primary' : i % 3 === 1 ? 'bg-cyan-50 text-cyan' : 'bg-lavender-50 text-[#6E69D6]'}`}>
                    <Ico className="size-4" aria-hidden="true" />
                  </span>
                  {label}
                </span>
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

function GlobeFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
      <div className="aspect-square w-[78%] rounded-full border border-dashed border-primary/25 bg-[radial-gradient(circle,rgba(55,100,216,0.08),transparent_65%)]" />
      <div className="absolute aspect-square w-[92%] rotate-12 rounded-full border border-lavender/50" />
    </div>
  )
}

function TechMarquee() {
  const items = [...hero.marquee, ...hero.marquee]
  return (
    <div className="mask-fade-x relative mt-20 overflow-hidden border-y border-line/80 bg-white/50 py-4 backdrop-blur-sm sm:mt-24" aria-label="Focus areas and technologies">
      <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <li key={i} aria-hidden={i >= hero.marquee.length ? 'true' : undefined} className="flex items-center gap-3 whitespace-nowrap font-mono text-[13px] text-muted">
            <span className={`size-1.5 rounded-full ${i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-cyan' : 'bg-lavender'}`} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
