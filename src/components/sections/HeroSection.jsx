import { Activity, HeartPulse } from 'lucide-react';

export default function HeroSection({ person }) {
  return (
    <section id="top" className="section-frame border-b border-[var(--border-soft)] hero-surface">
      <div className="section-wrap hero-section-pad grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
        <div className="max-w-4xl hero-content-stack">
          <div className="diagnostic-live" aria-label="Live diagnosis status">
            <span className="diagnostic-dot" />
            <Activity size={14} className="diagnostic-icon" />
            <span className="diagnostic-label">{person.introLabel}</span>
            <span className="diagnostic-wave" />
          </div>

          <div>
            <h1 className="hero-title-main">{person.heroLead}</h1>
            <p className="hero-title-accent cure-title">
              <span className="cure-line">{person.heroAccent}</span>
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href={person.primaryCta.href} className="cta-primary">
              {person.primaryCta.label}
            </a>
            <a href={person.secondaryCta.href} className="cta-secondary">
              {person.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="justify-self-start lg:justify-self-end">
          <div className="portrait-frame group">
            <div className="portrait-grid" />
            <img src={person.portrait.src} alt={person.portrait.alt} className="portrait-image" />
            <div className="portrait-caption">
              <span className="portrait-name">{person.name}</span>
              <span className="portrait-role">{person.title}</span>
            </div>
            <HeartPulse size={14} className="portrait-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

