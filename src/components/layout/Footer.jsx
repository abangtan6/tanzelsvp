import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer({ person, links }) {
  return (
    <footer className="site-footer-shell">
      <div className="site-footer-card">
        <div className="site-footer-brand">
          <span className="site-footer-logo">+</span>
          <span>{person.shortName}&apos;s Visual Pharmacy</span>
        </div>

        <nav className="site-footer-nav" aria-label="Footer">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-footer-meta">
          <p>© 2026 Visual Pharmacy</p>
          <div className="site-footer-socials" aria-label="Social links">
            <a href="#" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          </div>
          <p>Designed by {person.shortName}</p>
        </div>
      </div>
    </footer>
  );
}
