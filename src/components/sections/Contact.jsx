import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, CircleAlert, Copy, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { site } from '../../data/portfolio'
import Reveal from '../ui/Reveal'
import { GitHubIcon, LinkedInIcon } from '../ui/icons'

const EMPTY = { name: '', email: '', subject: '', message: '', company: '' } // `company` = honeypot
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.subject.trim().length < 3) e.subject = 'Please add a short subject.'
  if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.'
  return e
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [copied, setCopied] = useState(false)

  const set = (k) => (ev) => {
    setValues((v) => ({ ...v, [k]: ev.target.value }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (values.company) return // bot
    const e = validate(values)
    setErrors(e)
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0]
      document.getElementById(`cf-${first}`)?.focus()
      return
    }

    // 1) Optional free form backend (Formspree / Web3Forms etc.) via VITE_FORM_ENDPOINT
    if (site.formEndpoint) {
      try {
        setStatus('sending')
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
          }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setStatus('sent')
        setValues(EMPTY)
      } catch {
        setStatus('error')
      }
      return
    }

    // 2) Default: open the visitor's email app with everything pre-filled
    const body = `${values.message}\n\n— ${values.name}\n${values.email}`
    const href = `mailto:${site.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setStatus('mailto')
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32" aria-labelledby="contact-title">
      <div className="container-x">
        <Reveal className="card relative overflow-hidden p-2 sm:p-3">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_60%_at_0%_0%,rgba(55,100,216,0.10),transparent_60%),radial-gradient(60%_60%_at_100%_100%,rgba(165,161,235,0.16),transparent_60%)]" />
          <div className="relative grid gap-2 lg:grid-cols-[0.95fr_1.05fr]">
            {/* Info */}
            <div className="flex flex-col p-6 sm:p-9">
              <p className="kicker flex items-center gap-3">
                <span className="text-muted">[ 08 ]</span> Contact
              </p>
              <h2 id="contact-title" className="mt-4 text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.05]">
                Let's Connect &amp; Build <span className="text-gradient">Something Secure.</span>
              </h2>
              <p className="mt-4 max-w-md text-[16.5px] leading-relaxed text-muted">
                Interested in cybersecurity, technology, collaboration, or development opportunities? Let's connect.
              </p>

              <ul className="mt-9 space-y-3">
                <li className="flex items-center gap-3 rounded-2xl border border-line bg-white/85 p-3 pr-2">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <a href={`mailto:${site.email}`} className="min-w-0 flex-1 truncate text-[15px] font-medium text-ink hover:text-primary">
                    {site.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="grid size-10 shrink-0 place-items-center rounded-xl text-muted transition hover:bg-primary-50 hover:text-primary"
                    aria-label={copied ? 'Email copied' : 'Copy email address'}
                  >
                    {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                  </button>
                </li>
                <ContactLink href={site.socials.linkedin} icon={<LinkedInIcon size={19} />} tone="text-[#0A66C2] bg-[#EAF2FB]" label="LinkedIn" value={site.socials.linkedinLabel} />
                <ContactLink href={site.socials.github} icon={<GitHubIcon size={19} />} tone="text-ink bg-canvas" label="GitHub" value={site.socials.githubLabel} />
                <li className="flex items-center gap-3 rounded-2xl border border-line bg-white/85 p-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] font-medium text-ink">{site.location}</span>
                </li>
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} noValidate className="rounded-[1.4rem] border border-line bg-white/90 p-6 shadow-[var(--shadow-soft)] sm:p-9" aria-describedby="cf-note">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name}>
                  <input id="cf-name" name="name" autoComplete="name" className="field" placeholder="Your name" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input id="cf-email" name="email" type="email" inputMode="email" autoComplete="email" className="field" placeholder="you@example.com" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
                </Field>
              </div>
              <div className="mt-4">
                <Field id="subject" label="Subject" error={errors.subject}>
                  <input id="cf-subject" name="subject" className="field" placeholder="Internship, collaboration, project…" value={values.subject} onChange={set('subject')} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'cf-subject-err' : undefined} />
                </Field>
              </div>
              <div className="mt-4">
                <Field id="message" label="Message" error={errors.message}>
                  <textarea id="cf-message" name="message" rows={5} className="field resize-y" placeholder="Tell me a little about what you have in mind." value={values.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
                </Field>
              </div>
              {/* honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Company <input tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#3764D8,#4A7BE0_55%,#3E9FCF)] text-[15px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(55,100,216,0.65)] transition hover:-translate-y-0.5 disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </>
                )}
              </button>

              <div aria-live="polite" className="min-h-0">
                <AnimatePresence>
                  {status !== 'idle' && status !== 'sending' && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-[14px] ${
                        status === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-cyan-50 text-[#1C6F7A]'
                      }`}
                    >
                      {status === 'error' ? <CircleAlert className="mt-0.5 size-4 shrink-0" /> : <Check className="mt-0.5 size-4 shrink-0" />}
                      {status === 'sent' && 'Thanks — your message has been sent. I’ll get back to you soon.'}
                      {status === 'mailto' && `Your email app should now open with the message ready to send. If it didn't, email me directly at ${site.email}.`}
                      {status === 'error' && `Something went wrong sending your message. Please email me directly at ${site.email}.`}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <p id="cf-note" className="mt-4 text-center text-[12.5px] text-muted">
                {site.formEndpoint ? 'Your message is delivered straight to my inbox.' : 'Sending opens your email app with your message pre-filled.'}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={`cf-${id}`} className="mb-1.5 block text-[13px] font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`cf-${id}-err`} className="mt-1.5 text-[12.5px] text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}

function ContactLink({ href, icon, tone, label, value }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-2xl border border-line bg-white/85 p-3 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
      >
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone}`}>{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[12px] text-muted">{label}</span>
          <span className="block truncate text-[14.5px] font-medium text-ink">{value}</span>
        </span>
        <ArrowUpRight className="mr-1 size-4 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
      </a>
    </li>
  )
}
