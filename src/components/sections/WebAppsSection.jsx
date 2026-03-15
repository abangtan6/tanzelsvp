import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUpRight,
  Globe,
  Lightbulb,
  Target,
  Upload,
  Video,
  Waypoints,
  Workflow,
  Wrench,
  X,
} from 'lucide-react';

function CaseStudySection({ step, title, Icon, isResult = false, children }) {
  return (
    <section className={`webapp-case-section ${isResult ? 'webapp-case-section-result' : ''}`}>
      <div className="webapp-case-heading-row">
        <span className="webapp-case-step">{step}</span>
        <h4 className="webapp-case-heading">{title}</h4>
        <span className="webapp-case-icon">
          <Icon size={13} />
        </span>
      </div>
      {children}
    </section>
  );
}

export default function WebAppsSection({ items = [] }) {
  const [activeItem, setActiveItem] = useState(null);
  const [brokenPreviews, setBrokenPreviews] = useState({});
  const [brokenCaseVideos, setBrokenCaseVideos] = useState({});
  const iridiumReferenceLogo = '/brands/iridium.svg';

  useEffect(() => {
    if (!activeItem) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveItem(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeItem]);

  const caseStudy = activeItem?.caseStudy || null;
  const roadmapSections = caseStudy
    ? [
        { step: '01', title: 'Project', icon: Waypoints, body: caseStudy.projectSummary, lead: caseStudy.projectTitle },
        { step: '02', title: 'Problem', icon: AlertTriangle, body: caseStudy.problem },
        { step: '03', title: 'Goal', icon: Target, body: caseStudy.goal },
        { step: '04', title: 'Solution', icon: Lightbulb, body: caseStudy.solution },
        { step: '05', title: 'Process', icon: Workflow, list: caseStudy.process || [] },
        { step: '06', title: 'Design Decisions', icon: Wrench, list: caseStudy.designDecisions || [] },
        { step: '07', title: 'Result', icon: ArrowUpRight, body: caseStudy.result, links: caseStudy.links || [] },
      ]
    : [];

  const emphasizeMetrics = (text = '') => {
    const pieces = text.split(/(\d+%)/g);
    return pieces.map((piece, index) => (/^\d+%$/.test(piece) ? <strong key={`${piece}-${index}`}>{piece}</strong> : piece));
  };

  const getHostLabel = (url = '') => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Live preview';
    }
  };

  return (
    <>
      <section id="web-apps" className="section-frame section-light border-b border-[var(--border-soft)]">
        <div className="section-wrap section-pad">
          <div className="portfolio-shell">
            <div className="portfolio-header portfolio-header-match">
              <div>
                <p className="section-eyebrow">Recent Builds</p>
                <h2 className="portfolio-title">Digital Prescriptions.</h2>
              </div>
              <div className="portfolio-note-stack">
                <div className="photo-context-chip">
                  <img src={iridiumReferenceLogo} alt="" aria-hidden="true" className="photo-context-logo" />
                  <span>Iridium reference</span>
                </div>
                <p className="portfolio-note">
                  A concise selection of recent web builds, showing how each product was shaped from problem to implementation.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
              {items.map((item) => (
                <article key={item.title} className="portfolio-card portfolio-card-webapp">
                  <div className="portfolio-media">
                    {(item.previewVideoSrc || item.videoSrc || item.image) && !brokenPreviews[item.title] ? (
                      <div className={`portfolio-media-browser ${item.previewMode === 'mobile' ? 'portfolio-media-browser-mobile' : ''}`}>
                        <div className="portfolio-browser-bar">
                          <span className="portfolio-browser-dot" />
                          <span className="portfolio-browser-dot" />
                          <span className="portfolio-browser-dot" />
                          <p>{getHostLabel(item.href)}</p>
                        </div>
                        {item.previewVideoSrc || item.videoSrc ? (
                          item.previewMode === 'mobile' ? (
                            <div className="portfolio-mobile-frame">
                              <video
                                src={item.previewVideoSrc || item.videoSrc}
                                className="portfolio-media-image portfolio-media-image-mobile portfolio-media-video"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                poster={item.image || undefined}
                                onError={() => setBrokenPreviews((current) => ({ ...current, [item.title]: true }))}
                              />
                            </div>
                          ) : (
                            <video
                              src={item.previewVideoSrc || item.videoSrc}
                              className="portfolio-media-image portfolio-media-video"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              poster={item.image || undefined}
                              onError={() => setBrokenPreviews((current) => ({ ...current, [item.title]: true }))}
                            />
                          )
                        ) : item.previewMode === 'mobile' ? (
                          <div className="portfolio-mobile-frame">
                            <img
                              src={item.image}
                              alt={`${item.title} preview`}
                              className="portfolio-media-image portfolio-media-image-mobile"
                              loading="lazy"
                              onError={() => setBrokenPreviews((current) => ({ ...current, [item.title]: true }))}
                            />
                          </div>
                        ) : (
                          <img
                            src={item.image}
                            alt={`${item.title} preview`}
                            className="portfolio-media-image"
                            loading="lazy"
                            onError={() => setBrokenPreviews((current) => ({ ...current, [item.title]: true }))}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="portfolio-placeholder portfolio-preview-fallback">
                        <Upload size={18} />
                        <span>[ Live preview unavailable ]</span>
                        <p>{getHostLabel(item.href)}</p>
                      </div>
                    )}
                  </div>
                  <div className="portfolio-copy">
                    <div>
                      <h3 className="portfolio-card-title">{item.title}</h3>
                      <p className="portfolio-card-category">{item.category}</p>
                      <p className="portfolio-app-summary">
                        <Globe size={14} />
                        <span>{item.summary}</span>
                      </p>
                      <button type="button" className="portfolio-flow-link" onClick={() => setActiveItem(item)}>
                        <span>Open Flow Pipeline</span>
                      </button>
                    </div>
                    <a href={item.href} className="portfolio-link" aria-label={`View ${item.title}`} target="_blank" rel="noreferrer">
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeItem ? (
        <div className="photo-modal-backdrop" onClick={() => setActiveItem(null)}>
          <div className="photo-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="photo-modal-close"
              aria-label="Close web app details"
            >
              <X size={16} />
            </button>

            <div className="photo-modal-media-wrap photo-modal-media-wrap-webapp">
              {activeItem.caseVideoSrc && !brokenCaseVideos[activeItem.title] ? (
                <video
                  controls
                  preload="metadata"
                  className="portfolio-modal-video"
                  onError={() => setBrokenCaseVideos((current) => ({ ...current, [activeItem.title]: true }))}
                >
                  <source src={activeItem.caseVideoSrc} type="video/mp4" />
                </video>
              ) : (
                <div className="webapp-video-placeholder">
                  <Video size={24} />
                  <p>Full walkthrough placeholder</p>
                  <span>
                    {activeItem.caseVideoHintPath
                      ? `Add full video at: ${activeItem.caseVideoHintPath}`
                      : 'Add `caseVideoSrc` in `webAppItems` to embed the full walkthrough video.'}
                  </span>
                </div>
              )}
            </div>

            <div className="photo-modal-content">
              <p className="section-eyebrow">Web App Case</p>
              <h3 className="photo-modal-title">{activeItem.title}</h3>
              <div className="webapp-roadmap" role="list" aria-label="Web app case roadmap">
                {roadmapSections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.title} className="webapp-roadmap-item-wrap" role="listitem">
                      <CaseStudySection step={section.step} title={section.title} Icon={Icon} isResult={section.title === 'Result'}>
                        {section.lead ? (
                          <p className="webapp-case-text">
                            <strong>{section.lead}.</strong> {section.body}
                          </p>
                        ) : null}
                        {!section.lead && section.body ? (
                          <p className="webapp-case-text">
                            {section.title === 'Result' ? emphasizeMetrics(section.body) : section.body}
                          </p>
                        ) : null}
                        {section.list?.length ? (
                          <ul className="webapp-case-list">
                            {section.list.map((entry) => (
                              <li key={entry} className="webapp-case-text">
                                {entry}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {section.links?.length ? (
                          <div className="webapp-case-links">
                            {section.links.map((link) => (
                              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="webapp-result-cta">
                                <span>{link.label}</span>
                                <ArrowUpRight size={13} />
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </CaseStudySection>
                      {index < roadmapSections.length - 1 ? (
                        <span className="webapp-roadmap-arrow" aria-hidden="true">
                          <ArrowDown size={13} />
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <a href={activeItem.href} className="webapp-clinical-cta" target="_blank" rel="noreferrer">
                Open Website
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
