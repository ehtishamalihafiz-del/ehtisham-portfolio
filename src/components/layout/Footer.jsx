import { Mail } from 'lucide-react'
import { navLinks, site } from '../../data/portfolio'
import { GitHubIcon, LinkedInIcon } from '../ui/icons'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-10 border-t border-line/80 bg-white/60 backdrop-blur-sm">
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#home" className="font-display text-2xl font-semibold text-ink">
            {site.logo}
            <span className="text-cyan">.</span>
          </a>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Cybersecurity · Networking · Linux · Full Stack Development
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="transition hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-2">
          {[
            { href: `mailto:${site.email}`, label: 'Email', icon: <Mail className="size-[18px]" aria-hidden="true" /> },
            { href: site.socials.github, label: 'GitHub', icon: <GitHubIcon size={18} />, ext: true },
            { href: site.socials.linkedin, label: 'LinkedIn', icon: <LinkedInIcon size={18} />, ext: true },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              {...(s.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line/70">
        <div className="container-x flex flex-col gap-1 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="font-mono">Built with React · Three.js · Motion</p>
        </div>
      </div>
    </footer>
  )
}
