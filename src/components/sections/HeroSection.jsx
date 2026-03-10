export default function HeroSection({ person }) {
  return (
    <section className="section-frame border-b border-[var(--border-soft)] hero-surface">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-4 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20 lg:pb-28 lg:pt-28">
        <div className="max-w-4xl">
          <p className="section-eyebrow flex items-center gap-2">+
            <span>{person.introLabel}</span>
          </p>

          <div className="mt-8">
            <h1 className="hero-title-main">{person.heroLead}</h1>
            <h1 className="hero-title-accent">{person.heroAccent}</h1>
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
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
            <img
              src={person.portrait.src}
              alt={person.portrait.alt}
              className="portrait-image"
            />
            <div className="portrait-caption">
              <span className="portrait-name">{person.name}</span>
              <span className="portrait-role">Chief Designer / Multimedia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
