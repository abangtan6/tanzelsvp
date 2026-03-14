import { useEffect, useState } from 'react';
import { Aperture, Upload, X, ArrowRight } from 'lucide-react';

function FlowPipeline({ photo }) {
  const pipeline = [
    { step: '01 / Goal', detail: photo.goals },
    { step: '02 / Challenge', detail: photo.challenges },
    { step: '03 / Intervention', detail: photo.intervention },
    { step: '04 / Result', detail: photo.results },
  ];

  return (
    <div className="flow-pipeline" role="list" aria-label="Case-study flow pipeline">
      {pipeline.map((item, index) => (
        <article key={item.step} className="flow-step" role="listitem">
          <p className="flow-step-kicker">{item.step}</p>
          <p className="flow-step-text">{item.detail}</p>
          {index < pipeline.length - 1 ? <ArrowRight size={14} className="flow-arrow" /> : null}
        </article>
      ))}
    </div>
  );
}

export default function PhotographySection({ photos, theme = 'light' }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const isSingleClient = photos.length === 1;
  const contextPhoto = photos[0] || null;
  const contextLogo = contextPhoto
    ? theme === 'dark' && contextPhoto.contextLogoDark
      ? contextPhoto.contextLogoDark
      : contextPhoto.contextLogo
    : null;

  useEffect(() => {
    if (!activePhoto) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActivePhoto(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activePhoto]);

  return (
    <>
      <section id="photography" className="section-frame section-light border-b border-[var(--border-soft)]">
        <div className="section-wrap section-pad">
          <div className="portfolio-shell">
            <div className="portfolio-header">
              <div>
                <p className="section-eyebrow">Field Observations</p>
                <h2 className="portfolio-title">Visual Evidence.</h2>
              </div>
              <p className="portfolio-note">
                Visual evidence in this segment currently references Aikira Tari. Click a tile to edit each case file and attach final
                photography later.
              </p>
            </div>
            {contextLogo ? (
              <div className="photo-context-chip">
                <img src={contextLogo} alt={contextPhoto.contextLabel || 'Visual evidence reference'} className="photo-context-logo" />
                <span>{contextPhoto.contextLabel || 'Photography reference'}</span>
              </div>
            ) : null}

            <div className={isSingleClient ? 'mt-10 grid gap-4 photo-grid-single' : 'mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3'}>
              {photos.map((photo) => (
                <button
                  key={photo.title}
                  type="button"
                  onClick={() => setActivePhoto(photo)}
                  className="photo-frame photo-clickable text-left"
                >
                  <div className="photo-placeholder-media">
                    <Upload size={20} />
                    <span>[ Upload photography media ]</span>
                  </div>
                  <div className="photo-overlay">
                    <div className="photo-overlay-content">
                      <Aperture size={16} />
                      <span>Open Case File</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activePhoto ? (
        <div className="photo-modal-backdrop" onClick={() => setActivePhoto(null)}>
          <div className="photo-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="photo-modal-close"
              aria-label="Close case study"
            >
              <X size={16} />
            </button>

            <div className="photo-modal-media-wrap photo-modal-placeholder">
              <Upload size={24} />
              <p>Media placeholder</p>
              <span>Attach final image/video for this case study</span>
            </div>

            <div className="photo-modal-content">
              <p className="section-eyebrow">Case Study</p>
              <h3 className="photo-modal-title">{activePhoto.title}</h3>
              <FlowPipeline photo={activePhoto} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
