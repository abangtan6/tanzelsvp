import { ArrowUpRight, Clapperboard, FileBadge2, Image, LayoutGrid, Shirt, Smartphone, Upload } from 'lucide-react';

const deliverableIcon = {
  video: Clapperboard,
  print: Shirt,
  brochure: FileBadge2,
  brand: LayoutGrid,
  photo: Image,
  social: Smartphone,
  mockup: LayoutGrid,
};

export default function WorkSection({ projects }) {
  return (
    <section id="work" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="section-wrap section-pad">
        <div className="portfolio-shell">
          <div className="portfolio-header">
            <div>
              <p className="section-eyebrow">Brand Case Files</p>
              <h2 className="portfolio-title">Company Diagnosed.</h2>
            </div>
            <p className="portfolio-note">
              Placeholder mode enabled. Upload finalized visuals to activate live project media.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <article key={project.title} className="portfolio-card">
                <div className="portfolio-media portfolio-media-deliverables">
                  <div className="portfolio-deliverables-grid">
                    {(project.deliverables || []).map((item) => {
                      const Icon = deliverableIcon[item.type] || Upload;

                      return (
                        <div
                          key={`${project.title}-${item.label}`}
                          className={`portfolio-deliverable-tile ${item.primary ? 'portfolio-deliverable-primary' : ''}`}
                        >
                          <Icon size={16} />
                          <p>{item.label}</p>
                          <span>[ Placeholder ]</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="portfolio-copy">
                  <div>
                    <h3 className="portfolio-card-title">{project.title}</h3>
                    <p className="portfolio-card-category">{project.category}</p>
                    {project.focus ? <p className="portfolio-project-focus">{project.focus}</p> : null}
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
