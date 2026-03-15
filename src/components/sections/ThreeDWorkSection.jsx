import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Cuboid, Upload, X } from 'lucide-react';

export default function ThreeDWorkSection({ items = [] }) {
  const [brokenItems, setBrokenItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const safeItems = items.filter((item) => item?.src);
  const activeItem = safeItems[activeIndex] || null;
  const hasMedia = safeItems.length > 0;
  const hasMultiple = safeItems.length > 1;
  const previewItem = safeItems[0] || null;

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  const goPrevious = () => {
    if (!hasMultiple) return;
    setActiveIndex((current) => (current - 1 + safeItems.length) % safeItems.length);
  };

  const goNext = () => {
    if (!hasMultiple) return;
    setActiveIndex((current) => (current + 1) % safeItems.length);
  };

  return (
    <section id="three-d-work" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="section-wrap section-pad">
        <div className="portfolio-shell">
          <div className="portfolio-header portfolio-header-match">
            <div>
              <p className="section-eyebrow">Dimensional Lab</p>
              <h2 className="portfolio-title">3D Signal Vault.</h2>
            </div>
            <p className="portfolio-note">
              A focused vault of cinematic 3D outputs across product, character, and environment scenes, prepared for campaign-ready storytelling.
            </p>
          </div>

          <div className="mt-10">
            <article className="portfolio-card">
              <button
                type="button"
                className="portfolio-media portfolio-media-3d portfolio-3d-single"
                onClick={() => {
                  if (!hasMedia) return;
                  setActiveIndex(0);
                  setIsModalOpen(true);
                }}
                aria-label="Open 3D Signal Vault media"
              >
                {previewItem && !brokenItems[previewItem.src] ? (
                  previewItem.type === 'video' ? (
                    <video
                      src={previewItem.src}
                      className="portfolio-media-image portfolio-media-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onError={() => setBrokenItems((current) => ({ ...current, [previewItem.src]: true }))}
                    />
                  ) : (
                    <img
                      src={previewItem.src}
                      alt="3D vault preview"
                      className="portfolio-media-image"
                      loading="lazy"
                      onError={() => setBrokenItems((current) => ({ ...current, [previewItem.src]: true }))}
                    />
                  )
                ) : (
                  <div className="portfolio-placeholder">
                    <Upload size={18} />
                    <span>[ 3D media placeholder ]</span>
                  </div>
                )}
              </button>
              <div className="portfolio-copy portfolio-copy-vault">
                <button
                  type="button"
                  className="portfolio-vault-button"
                  onClick={() => {
                    if (!hasMedia) return;
                    setActiveIndex(0);
                    setIsModalOpen(true);
                  }}
                >
                  <Cuboid size={14} />
                  Open Vault
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {isModalOpen && activeItem ? (
        <div className="photo-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="photo-modal work-preview-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="photo-modal-close"
              aria-label="Close 3D media reel"
            >
              <X size={16} />
            </button>

            <div className="work-preview-stage">
              {activeItem.type === 'video' ? (
                <video src={activeItem.src} className="work-preview-image" controls autoPlay playsInline preload="metadata" />
              ) : (
                <img src={activeItem.src} alt="3D reel media" className="work-preview-image" />
              )}
              {hasMultiple ? (
                <>
                  <button type="button" className="work-preview-nav work-preview-nav-prev" onClick={goPrevious} aria-label="Previous media">
                    <ChevronLeft size={16} />
                  </button>
                  <button type="button" className="work-preview-nav work-preview-nav-next" onClick={goNext} aria-label="Next media">
                    <ChevronRight size={16} />
                  </button>
                  <span className="work-preview-counter">
                    {activeIndex + 1} / {safeItems.length}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
