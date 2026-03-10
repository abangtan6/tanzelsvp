import { ArrowRight, Mail, MapPin } from 'lucide-react';
import ButtonLink from '../layout/ButtonLink';

export default function ContactSection({ person, socials }) {
  const emailLabel = person.email.replace('mailto:', '');

  return (
    <section id="contact" className="section-frame section-light">
      <div className="mx-auto max-w-[88rem] px-4 py-16 md:px-8 lg:py-20">
        <div className="contact-strip">
          <div>
            <p className="section-eyebrow">Contact</p>
            <h2 className="contact-title">Available for thoughtful visual work.</h2>
            <p className="contact-note">
              Best for in-house roles, brand teams, and creative environments that need clarity, consistency, and strong execution.
            </p>
          </div>

          <div className="contact-meta">
            <a href={person.email} className="contact-row">
              <Mail size={15} />
              <span>{emailLabel}</span>
            </a>
            <div className="contact-row">
              <MapPin size={15} />
              <span>{person.location}</span>
            </div>
            <div className="contact-actions">
              <ButtonLink href={person.email}>
                Email Tanzel
                <ArrowRight size={14} className="ml-2" />
              </ButtonLink>
              {socials.slice(1).map((social) => (
                <a key={social.label} href={social.href} className="contact-inline-link">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
