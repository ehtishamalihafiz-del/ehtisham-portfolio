const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 select-none disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]'

const sizes = {
  md: 'h-12 px-6 text-[15px]',
  sm: 'h-10 px-4 text-sm',
}

const variants = {
  primary:
    'text-white bg-[linear-gradient(135deg,#3764D8,#4A7BE0_55%,#3E9FCF)] shadow-[0_10px_30px_-10px_rgba(55,100,216,0.65)] hover:shadow-[0_16px_40px_-12px_rgba(55,100,216,0.75)] hover:-translate-y-0.5',
  secondary:
    'bg-white text-ink border border-line shadow-[0_1px_2px_rgba(36,50,75,0.05)] hover:border-primary/35 hover:text-primary hover:-translate-y-0.5',
  ghost: 'text-ink hover:text-primary hover:bg-primary-50',
}

/** Renders an <a> when `href` is set, otherwise a <button>. */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  external = false,
  ...rest
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={cls} {...ext} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
