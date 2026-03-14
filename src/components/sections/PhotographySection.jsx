export default function PhotographySection({ photos, theme = 'light' }) {
  const contextPhoto = photos[0] || null;
  const orderedPhotos = photos.length > 1 ? [...photos.slice(1), photos.slice(0, 1)].flat() : photos;
  const contextLogo = contextPhoto
    ? theme === 'dark' && contextPhoto.contextLogoDark
      ? contextPhoto.contextLogoDark
      : contextPhoto.contextLogo
    : null;

  return (
    <section id="photography" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="section-wrap section-pad">
        <div className="portfolio-shell">
          <div className="portfolio-header portfolio-header-match">
            <div>
              <p className="section-eyebrow">Field Observations</p>
              <h2 className="portfolio-title">Visual Evidence.</h2>
            </div>
            <div className="portfolio-note-stack">
              {contextLogo ? (
                <div className="photo-context-chip">
                  <img src={contextLogo} alt={contextPhoto.contextLabel || 'Visual evidence reference'} className="photo-context-logo" />
                  <span>{contextPhoto.contextLabel || 'Photography reference'}</span>
                </div>
              ) : null}
              <p className="portfolio-note">
                A curated evidence strip highlighting Aikira Tari visuals, from campaign portraits to production-ready field captures.
              </p>
            </div>
          </div>

          <div className="evidence-strip-shell mt-10">
            <div className="evidence-strip-marquee" role="list" aria-label="Visual evidence gallery">
              {[0, 1].map((loopIndex) => (
                <div className="evidence-strip-lane" key={`lane-${loopIndex}`} aria-hidden={loopIndex === 1 ? 'true' : undefined}>
                  {orderedPhotos.map((photo, index) => (
                    <figure
                      key={`${photo.src || `evidence-${index}`}-loop-${loopIndex}`}
                      className={`evidence-card ${photo.format === 'portrait' ? 'evidence-card-portrait' : 'evidence-card-landscape'}`}
                      role={loopIndex === 0 ? 'listitem' : undefined}
                    >
                      <img src={photo.src} alt={photo.alt || `Visual evidence frame ${index + 1}`} className="evidence-card-image" loading="lazy" />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
