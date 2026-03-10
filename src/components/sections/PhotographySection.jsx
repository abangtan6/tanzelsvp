import { useEffect, useState } from 'react';
import { Aperture, X } from 'lucide-react';

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
            Capturing raw texture, structure, and light across automotive
            and conceptual environments.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {photos.map((photo) => (
              <button
                key={photo.title}
                type="button"
                onClick={() => setActivePhoto(photo)}
                className="photo-frame photo-clickable text-left"
              >
                <img src={photo.src} alt={photo.alt} className="photo-image" />
                <div className="photo-overlay">
                  <div className="photo-overlay-content">
                    <Aperture size={16} />
                    <span>View Case Study</span>
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

            <div className="photo-modal-media-wrap">
              <img src={activePhoto.src} alt={activePhoto.alt} className="photo-modal-media" />
            </div>

            <div className="photo-modal-content">
              <p className="section-eyebrow">Case Study</p>
              <h3 className="photo-modal-title">{activePhoto.title}</h3>

              <div className="photo-modal-grid">
                <article>
                  <h4>Project Goal</h4>
                  <p>{activePhoto.goals}</p>
                </article>
                <article>
                  <h4>Challenge</h4>
                  <p>{activePhoto.challenges}</p>
                </article>
                <article>
                  <h4>Result</h4>
                  <p>{activePhoto.results}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
