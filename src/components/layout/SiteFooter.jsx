import { Instagram, Linkedin } from 'lucide-react';

function BehanceIcon({ size = 16, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" className={className}>
      <path
        d="M2.5 8.5h5.2c2 0 3.3 1 3.3 2.8 0 1.2-.6 2-1.5 2.3 1.2.3 2 1.3 2 2.9 0 2.2-1.7 3.5-4.1 3.5H2.5V8.5Zm4.7 4.7c1 0 1.6-.5 1.6-1.4s-.6-1.3-1.6-1.3H5v2.7h2.2Zm.2 4.8c1.2 0 1.9-.5 1.9-1.6 0-1-.7-1.5-1.9-1.5H5V18h2.4ZM13.8 9.3h6.8v1.4h-6.8V9.3Zm3.5 3.1c2.5 0 4 1.5 4.1 4.3v.6h-5.8c.1 1.2.9 1.9 2.1 1.9.9 0 1.5-.3 1.9-1h1.7c-.5 1.7-1.8 2.8-3.8 2.8-2.6 0-4.2-1.8-4.2-4.3 0-2.6 1.6-4.3 4-4.3Zm-1.6 3.5h4c-.2-1.1-.9-1.7-1.9-1.7-1.1 0-1.8.6-2.1 1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanzel6/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/tanzel999/', icon: Instagram },
  { label: 'Behance', href: 'https://www.behance.net/tanzel6', icon: BehanceIcon },
];

export default function SiteFooter({ person, theme }) {
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

          <div className="site-footer-meta">
            <p>Copyright 2026 Visual Pharmacy</p>
            <div className="site-footer-socials" aria-label="Social links">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
            <p>Prescribed by Tanzel&apos;s Visual Pharmacy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
