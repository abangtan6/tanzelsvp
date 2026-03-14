import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanzel6/' },
  { label: 'Instagram', href: 'https://www.instagram.com/tanzel999/' },
  { label: 'Behance', href: 'https://www.behance.net/tanzel6' },
];

export default function Footer({ person, links, theme }) {
  const brandLogo =
    theme === 'dark'
      ? (person.subLogo?.dark || person.logo.dark)
      : (person.subLogo?.light || person.logo.light);
  return (
    <footer className="site-footer-shell">
      <div className="section-wrap">
        <div className="site-footer-card">
          <div className="site-footer-brand">
            <img src={brandLogo} alt={`${person.shortName}'s Visual Pharmacy`} className="site-footer-logo-img" />
          </div>

          <nav className="site-footer-nav" aria-label="Footer">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-footer-meta">
            <p>Copyright 2026 Visual Pharmacy</p>
            <div className="site-footer-socials" aria-label="Social links">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              ))}
            </div>
            <p>Prescribed by Tanzel&apos;s Visual Pharmacy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
