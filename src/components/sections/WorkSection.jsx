import { Eye, ArrowUpRight, Upload } from 'lucide-react';

export default function WorkSection({ projects }) {
  return (
    <section id="work" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="mx-auto max-w-[88rem] px-4 py-16 md:px-8 lg:py-24">
        <div className="portfolio-shell">
          <div className="portfolio-header">
            <div>
              <p className="section-eyebrow">Patient Records</p>
              <h2 className="portfolio-title">Clinical Interventions.</h2>
            </div>
            <p className="portfolio-note">
              Placeholder mode enabled. Upload finalized visuals to activate live project media.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <article key={project.title} className="portfolio-card">
                <div className="portfolio-media">
                  <div className="portfolio-placeholder">
                    <Upload size={18} />
                    <span>[ Upload clinical intervention media ]</span>
                  </div>
                </div>
                <div className="portfolio-copy">
                  <div>
                    <h3 className="portfolio-card-title">{project.title}</h3>
                    <p className="portfolio-card-category">{project.category}</p>
                  </div>
                  <a href={project.href} className="portfolio-link" aria-label={`View ${project.title}`}>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
