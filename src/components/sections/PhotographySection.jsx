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

export default function PhotographySection({ photos }) {
  const [activePhoto, setActivePhoto] = useState(null);

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
        <div className="mx-auto max-w-[88rem] px-4 py-16 text-center md:px-8 lg:py-24">
          <p className="section-eyebrow">Field Observations</p>
          <h2 className="photo-title">Photography.</h2>
          <p className="photo-note">
            Placeholder mode enabled. Click a tile to edit its case-study flow and attach final media later.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {photos.map((photo) => (
              <button
                key={photo.title}
                type="button"
                onClick={() => setActivePhoto(photo)}
                className="photo-frame photo-clickable text-left"
              >
                <div className="photo-placeholder-media">
                  <Upload size={20} />
                  <span>[ Upload case-study media ]</span>
                </div>
                <div className="photo-overlay">
                  <div className="photo-overlay-content">
                    <Aperture size={16} />
                    <span>Open Flow Pipeline</span>
                  </div>
                </div>
              </button>
            ))}
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
