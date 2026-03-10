export default function ButtonLink({ href, children, variant = 'primary', className = '' }) {
  const baseClassName =
    'inline-flex items-center justify-center border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition duration-200 hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

  const variantClassName =
    variant === 'secondary'
      ? 'border-transparent border-l-[1px] border-l-[var(--border-strong)] bg-transparent text-[var(--text-primary)] hover:text-accent'
      : 'border-accent bg-accent text-white hover:bg-[var(--text-primary)] hover:border-[var(--text-primary)]';

  return (
    <a href={href} className={`${baseClassName} ${variantClassName} ${className}`.trim()}>
      {children}
    </a>
  );
}
