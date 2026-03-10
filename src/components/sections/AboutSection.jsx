export default function AboutSection({ person, stats, experienceItems = [] }) {
  const uniqueStats = Object.values(
    stats.reduce((accumulator, stat) => {
      const key = stat.value.trim().toLowerCase();
      const existing = accumulator[key];

      if (!existing || ((stat.palette || []).length > (existing.palette || []).length)) {
        accumulator[key] = stat;
      }

      return accumulator;
    }, {}),
  );

  return (
    <section id="about" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="section-wrap section-pad grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
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
              {uniqueStats.map((stat) => (
                <span key={`${stat.label}-${stat.value}`} className="chip-tag chip-tag-palette">
                  <span className="chip-tag-label">{stat.value}</span>
                  <span className="chip-tag-colors" aria-hidden="true">
                    {(stat.palette || []).map((color) => (
                      <span key={`${stat.value}-${color}`} className="chip-color-dot" style={{ background: color }} />
                    ))}
                  </span>
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
