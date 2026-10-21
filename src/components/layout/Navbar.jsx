import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, Menu, X } from 'lucide-react'
import { navLinks, site } from '../../data/portfolio'
import useActiveSection from '../../hooks/useActiveSection'
import { GitHubIcon, LinkedInIcon } from '../ui/icons'

const ids = navLinks.map((l) => l.id)

export default function Navbar() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const close = () => mql.matches && setOpen(false)
    mql.addEventListener?.('change', close)
    return () => mql.removeEventListener?.('change', close)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-[1200px] items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 sm:h-[60px] ${
          scrolled || open
            ? 'glass shadow-[0_10px_40px_-18px_rgba(36,50,75,0.35)]'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <a href="#home" className="font-display text-[22px] font-semibold tracking-tight text-ink" aria-label="Ehtisham Ali — home">
          {site.logo}
          <span className="text-cyan">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id} className="relative">
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative z-10 block rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-muted hover:text-ink'
                  }`}
                >
                  {l.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary-50 ring-1 ring-primary/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={site.cvFile}
            download={site.cvDownloadName}
            className="hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-white transition hover:bg-primary sm:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" /> CV
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink transition hover:bg-primary-50 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 -z-10 bg-ink/10 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="sheet"
              id="mobile-menu"
              className="glass mx-auto mt-2 max-w-[1200px] overflow-hidden rounded-3xl p-3 shadow-[0_24px_60px_-24px_rgba(36,50,75,0.4)] lg:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <ul className="grid grid-cols-2 gap-1.5">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition ${
                        active === l.id ? 'bg-primary text-white' : 'bg-white/80 text-ink active:bg-primary-50'
                      }`}
                    >
                      {l.label}
                      <span className={`font-mono text-[10px] ${active === l.id ? 'text-white/70' : 'text-muted'}`}>
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
                <a
                  href={site.cvFile}
                  download={site.cvDownloadName}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-white"
                >
                  <Download className="size-4" aria-hidden="true" /> Download CV
                </a>
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink">
                  <GitHubIcon size={18} />
                </a>
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full border border-line bg-white text-[#0A66C2]">
                  <LinkedInIcon size={18} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
