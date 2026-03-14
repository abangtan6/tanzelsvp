export default function AboutSection({ person, stats }) {
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
      <div className="section-wrap section-pad grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="max-w-[42rem]">
          <h2 className="editorial-title">Background Profile</h2>
          <div className="mt-8 space-y-6 max-w-2xl text-[14px] leading-8 text-[var(--text-secondary)]">
            {person.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="about-arsenal-panel">
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
    </section>
  );
}
