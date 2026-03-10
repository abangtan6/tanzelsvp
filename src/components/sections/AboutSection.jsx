export default function AboutSection({ person, stats, experienceItems = [] }) {
  return (
    <section id="about" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-4 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
        <div>
          <h2 className="editorial-title">Background Profile</h2>
          <div className="mt-8 space-y-6 max-w-2xl text-[14px] leading-8 text-[var(--text-secondary)]">
            {person.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <p className="section-eyebrow">Software Arsenal</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {stats.map((stat) => (
                <span key={stat.label} className="chip-tag">
                  {stat.value}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {experienceItems.map((item) => (
            <article key={`${item.company}-${item.role}`} className="resume-panel">
              <p className="resume-period">{item.period}</p>
              <h3 className="resume-role">{item.role}</h3>
              <p className="resume-company">{item.company}</p>
              <p className="resume-summary">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
