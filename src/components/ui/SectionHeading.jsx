import Reveal from './Reveal'

/**
 * Section header: mono kicker ("[ 02 ] ABOUT"), display title, optional lead.
 */
export default function SectionHeading({ index, label, title, lead, align = 'left', className = '' }) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <p className={`kicker flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="text-muted">[ {index} ]</span>
        <span>{label}</span>
        <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-primary/60 to-transparent" />
      </p>
      <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.05]">{title}</h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  )
}
