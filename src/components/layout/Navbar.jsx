import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import ButtonLink from './ButtonLink';

export default function Navbar({ links, theme, onToggleTheme, person }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const brandLogo = theme === 'dark' ? person.logo.dark : person.logo.light;

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const pastThreshold = currentScrollY > 72;

      if (isMenuOpen) {
        setIsHeaderHidden(false);
      } else {
        setIsHeaderHidden(isScrollingDown && pastThreshold);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <header className={`site-header sticky top-0 z-50 border-b border-[var(--border-soft)] ${isHeaderHidden ? 'site-header-hidden' : ''}`}>
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-6 px-4 py-3 md:px-8">
        <a
          href="#top"
          onClick={handleCloseMenu}
          className="brand-lockup"
        >
          <img src={brandLogo} alt={`${person.shortName}'s Visual Pharmacy`} className="brand-lockup-logo" />
          <span className="sr-only">{person.shortName}&apos;s Visual Pharmacy</span>
        </a>

        <nav className="hidden items-center gap-8 xl:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center text-[var(--text-primary)] transition hover:text-accent"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <ButtonLink href="#contact" className="hidden px-4 py-2 text-[11px] tracking-[0.14em] sm:inline-flex">
            Contact Form
          </ButtonLink>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center text-[var(--text-primary)] transition hover:text-accent xl:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>
      {isMenuOpen ? (
        <nav id="mobile-nav" className="border-t border-[var(--border-soft)] px-4 py-4 md:px-8 xl:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleCloseMenu}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink href="#contact" className="mt-2 w-full justify-center" onClick={handleCloseMenu}>
              Contact Form
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
