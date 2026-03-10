import { Moon, Sun, Plus } from 'lucide-react';
import ButtonLink from './ButtonLink';

export default function Navbar({ links, theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--surface-overlay)]">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-4 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3 text-[11px] font-medium tracking-[0.08em] text-[var(--text-primary)]">
          <Plus size={12} className="text-accent" />
          <span>Tanzel&apos;s Visual Pharmacy</span>
        </a>

        <nav className="hidden items-center gap-8 xl:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--text-secondary)] transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-8 w-8 items-center justify-center text-[var(--text-primary)] transition hover:text-accent"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <ButtonLink href="#contact" className="px-4 py-2 text-[9px] tracking-[0.18em]">
            Contact Form
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
