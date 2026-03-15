import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Clapperboard, FileBadge2, Image, LayoutGrid, Shirt, Smartphone, Upload, Video, X } from 'lucide-react';

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
  const [activeModalKey, setActiveModalKey] = useState(null);
  const [previewFrameIndex, setPreviewFrameIndex] = useState({});

  const deliverablePreviews = useMemo(() => {
    const map = {};

    projects.slice(0, 2).forEach((project) => {
      (project.deliverables || []).forEach((item) => {
        const key = `${project.title}-${item.label}`;
        const frames = item.previewFrames?.length ? item.previewFrames : item.previewSrc ? [item.previewSrc] : [];

        if (frames.length) {
          map[key] = frames;
        }
      });
    });

    return map;
  }, [projects]);

  const deliverableDetails = useMemo(() => {
    const map = {};

    projects.slice(0, 2).forEach((project) => {
      (project.deliverables || []).forEach((item) => {
        const key = `${project.title}-${item.label}`;
        map[key] = { ...item, projectTitle: project.title };
      });
    });

    return map;
  }, [projects]);

  useEffect(() => {
    if (!activeModalKey) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveModalKey(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeModalKey]);

  const openModalPreview = (tileKey) => {
    const item = deliverableDetails[tileKey];
    const hasPreview = Boolean(deliverablePreviews[tileKey]?.length);
    const hasCaseCopy = Boolean(item?.caseCopy);

    if (!hasPreview && !hasCaseCopy) {
      return;
    }

    setPreviewFrameIndex((current) => (current[tileKey] !== undefined ? current : { ...current, [tileKey]: 0 }));
    setActiveModalKey(tileKey);
  };

  const handleTileKeyDown = (event, tileKey) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModalPreview(tileKey);
    }

    if (event.key === 'Escape') {
      setActiveModalKey(null);
    }
  };

  const modalFrames = activeModalKey ? deliverablePreviews[activeModalKey] || [] : [];
  const activeDeliverable = activeModalKey ? deliverableDetails[activeModalKey] : null;
  const activeCaseCopy = activeDeliverable?.caseCopy || null;
  const modalFrameIndex = activeModalKey ? previewFrameIndex[activeModalKey] || 0 : 0;
  const modalFrame = modalFrames.length ? modalFrames[modalFrameIndex % modalFrames.length] : null;

  const caseFlowSections = activeCaseCopy
    ? [
        { step: '01', title: 'Project', body: activeCaseCopy.title },
        { step: '02', title: 'Problem', body: activeCaseCopy.problem },
        { step: '03', title: 'Objective', body: activeCaseCopy.objective },
        { step: '04', title: 'Approach', list: activeCaseCopy.approach || [] },
        { step: '05', title: 'Outcome', body: activeCaseCopy.outcome },
      ]
    : [];

  const goToNextModalFrame = () => {
    if (!activeModalKey || modalFrames.length < 2) {
      return;
    }

    setPreviewFrameIndex((current) => ({
      ...current,
      [activeModalKey]: ((current[activeModalKey] || 0) + 1) % modalFrames.length,
    }));
  };

  const goToPreviousModalFrame = () => {
    if (!activeModalKey || modalFrames.length < 2) {
      return;
    }

    setPreviewFrameIndex((current) => ({
      ...current,
      [activeModalKey]: ((current[activeModalKey] || 0) - 1 + modalFrames.length) % modalFrames.length,
    }));
  };

  return (
    <section id="work" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="section-wrap section-pad">
        <div className="portfolio-shell">
          <div className="portfolio-header portfolio-header-match">
            <div>
              <p className="section-eyebrow">Brand Case Files</p>
              <h2 className="portfolio-title">Company Diagnosed.</h2>
            </div>
            <p className="portfolio-note">
              A practical record of brand work, built around clear visual decisions and production-ready outcomes.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <article key={project.title} className="portfolio-card">
                <div className="portfolio-media portfolio-media-deliverables">
                  <div className="portfolio-deliverables-grid">
                    {(project.deliverables || []).map((item) => {
                      const Icon = deliverableIcon[item.type] || Upload;
                      const tileKey = `${project.title}-${item.label}`;
                      const previewFrames = deliverablePreviews[tileKey] || [];
                      const hasPreview = previewFrames.length > 0;
                      const hasCaseCopy = Boolean(item.caseCopy);
                      const isInteractive = hasPreview || hasCaseCopy;

                      return (
                        <div
                          key={tileKey}
                          className={`portfolio-deliverable-tile ${item.primary ? 'portfolio-deliverable-primary' : ''} ${
                            isInteractive ? 'portfolio-deliverable-interactive' : ''
                          }`}
                          role={isInteractive ? 'button' : undefined}
                          tabIndex={isInteractive ? 0 : undefined}
                          onClick={isInteractive ? () => openModalPreview(tileKey) : undefined}
                          onKeyDown={isInteractive ? (event) => handleTileKeyDown(event, tileKey) : undefined}
                        >
                          {hasPreview ? (
                            <img
                              src={item.previewSrc || previewFrames[0]}
                              alt={`${item.label} preview`}
                              className="portfolio-deliverable-preview"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                          <div className="portfolio-deliverable-head">
                            <Icon size={16} />
                            {item.socialTag ? (
                              <a
                                href={item.socialTag.href}
                                target="_blank"
                                rel="noreferrer"
                                className="portfolio-deliverable-account-tag"
                                onClick={(event) => event.stopPropagation()}
                              >
                                {item.socialTag.label}
                              </a>
                            ) : null}
                          </div>
                          <p>{item.label}</p>
                          <span>{item.primary ? 'Primary' : 'Supporting'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="portfolio-copy">
                  <div>
                    <h3 className="portfolio-card-title">{project.title}</h3>
                    {project.category ? <p className="portfolio-card-category">{project.category}</p> : null}
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

      {activeModalKey && (modalFrame || activeCaseCopy) ? (
        <div className="photo-modal-backdrop" onClick={() => setActiveModalKey(null)}>
          <div className="photo-modal work-preview-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveModalKey(null)}
              className="photo-modal-close"
              aria-label="Close slideshow preview"
            >
              <X size={16} />
            </button>

            <div className="work-preview-stage">
              {modalFrame ? <img src={modalFrame} alt="Deliverable slideshow preview" className="work-preview-image" /> : null}
              {!modalFrame && activeCaseCopy ? (
                <div className="work-preview-placeholder-grid">
                  {(activeCaseCopy.videoPlaceholders || []).slice(0, 2).map((entry) => (
                    <div key={entry.label} className="work-preview-video-placeholder">
                      <Video size={20} />
                      <p>{entry.label}</p>
                      <span>{entry.hint}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {modalFrame && modalFrames.length > 1 ? (
                <>
                  <button
                    type="button"
                    className="work-preview-nav work-preview-nav-prev"
                    onClick={goToPreviousModalFrame}
                    aria-label="Previous preview image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    className="work-preview-nav work-preview-nav-next"
                    onClick={goToNextModalFrame}
                    aria-label="Next preview image"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <span className="work-preview-counter">
                    {modalFrameIndex + 1} / {modalFrames.length}
                  </span>
                </>
              ) : null}
            </div>
            {activeCaseCopy ? (
              <div className="work-preview-copy">
                <p className="section-eyebrow">Environmental Case</p>
                <div className="webapp-roadmap" role="list" aria-label="Environmental design flow pipeline">
                  {caseFlowSections.map((section, index) => (
                    <div key={section.title} className="webapp-roadmap-item-wrap" role="listitem">
                      <section className={`webapp-case-section ${section.title === 'Outcome' ? 'webapp-case-section-result' : ''}`}>
                        <div className="webapp-case-heading-row">
                          <span className="webapp-case-step">{section.step}</span>
                          <h4 className="webapp-case-heading">{section.title}</h4>
                          <span className="webapp-case-icon">
                            <ArrowUpRight size={13} />
                          </span>
                        </div>
                        {section.body ? <p className="webapp-case-text">{section.body}</p> : null}
                        {section.list?.length ? (
                          <ul className="webapp-case-list">
                            {section.list.map((entry) => (
                              <li key={entry} className="webapp-case-text">
                                {entry}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                      {index < caseFlowSections.length - 1 ? (
                        <span className="webapp-roadmap-arrow" aria-hidden="true">
                          <ArrowDown size={13} />
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
