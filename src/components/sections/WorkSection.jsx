import { Eye, ArrowUpRight } from 'lucide-react';

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
              Visual identity, social media design, and video production
              formulated for modern brand communication.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <article key={project.title} className="portfolio-card">
                <div className="portfolio-media">
                  {project.media ? (
                    <img src={project.media.src} alt={project.media.alt} className="h-full w-full object-cover" />
                  ) : (
                    <div className="portfolio-placeholder">
                      <Eye size={20} />
                      <span>[ Add project visual ]</span>
                    </div>
                  )}
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
