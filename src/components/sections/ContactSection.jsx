import { useState } from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Instagram, Linkedin } from 'lucide-react';
import ButtonLink from '../layout/ButtonLink';

function BehanceIcon({ size = 14, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" className={className}>
      <path
        d="M2.5 8.5h5.2c2 0 3.3 1 3.3 2.8 0 1.2-.6 2-1.5 2.3 1.2.3 2 1.3 2 2.9 0 2.2-1.7 3.5-4.1 3.5H2.5V8.5Zm4.7 4.7c1 0 1.6-.5 1.6-1.4s-.6-1.3-1.6-1.3H5v2.7h2.2Zm.2 4.8c1.2 0 1.9-.5 1.9-1.6 0-1-.7-1.5-1.9-1.5H5V18h2.4ZM13.8 9.3h6.8v1.4h-6.8V9.3Zm3.5 3.1c2.5 0 4 1.5 4.1 4.3v.6h-5.8c.1 1.2.9 1.9 2.1 1.9.9 0 1.5-.3 1.9-1h1.7c-.5 1.7-1.8 2.8-3.8 2.8-2.6 0-4.2-1.8-4.2-4.3 0-2.6 1.6-4.3 4-4.3Zm-1.6 3.5h4c-.2-1.1-.9-1.7-1.9-1.7-1.1 0-1.8.6-2.1 1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ContactSection({ person, socials }) {
  const emailLabel = person.email.replace('mailto:', '');
  const [copied, setCopied] = useState(false);
  const contactLinks = socials.filter((social) => social.label !== 'Email');
  const iconByLabel = {
    LinkedIn: Linkedin,
    Instagram: Instagram,
    Behance: BehanceIcon,
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailLabel);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section-frame section-light contact-section">
      <div className="section-wrap section-pad contact-wrap">
        <div className="contact-strip">
          <div>
            <p className="section-eyebrow">Contact</p>
            <h2 className="contact-title">Need a visual diagnosis that converts?</h2>
            <p className="contact-note">
              Best for in-house roles, brand teams, and creative environments that need clarity, consistency, and strong execution, get prescribed now.
            </p>
          </div>

          <div className="contact-meta">
            <button type="button" onClick={handleCopyEmail} className="contact-row contact-copy-btn">
              <Mail size={15} />
              <span>{copied ? 'Copied email' : emailLabel}</span>
            </button>
            <div className="contact-row">
              <MapPin size={15} />
              <span>{person.location}</span>
            </div>
            <div className="contact-actions">
              <ButtonLink href={person.email}>
                Email Tanzel
                <ArrowRight size={14} className="ml-2" />
              </ButtonLink>
              {contactLinks.map((social) => {
                const Icon = iconByLabel[social.label] || Linkedin;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="contact-inline-link contact-inline-icon"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <Icon size={14} />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
