import { Upload } from 'lucide-react';

export default function BrandsSection({ brands = [], theme = 'light' }) {
  const getBrandSlug = (name = '') => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const getLayoutClass = (layout = 'standard') => {
    if (layout === 'feature') {
      return 'brand-logo-slot-feature';
    }
    if (layout === 'compact') {
      return 'brand-logo-slot-compact';
    }
    return 'brand-logo-slot-standard';
  };

  return (
    <section id="brands" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="section-wrap section-pad">
        <div className="brands-shell">
          <div className="brands-header">
            <div>
              <p className="section-eyebrow">Partner Logbook</p>
              <h2 className="brands-title">Allies On Record.</h2>
            </div>
            <p className="brands-note">
              A cross-industry record of creative partnerships spanning brand execution, social content, live visual performance,
              campaign support, and production coordination.
            </p>
          </div>
          <div className="brands-grid">
            {brands.map((brand) => {
              const brandSlug = getBrandSlug(brand.name);
              const brandSrc = theme === 'dark' && brand.darkSrc ? brand.darkSrc : brand.src;
              const brandLabel = brand.label || brand.name;

              return (
                <article key={brand.name} className={`brand-logo-slot ${getLayoutClass(brand.layout)}`} tabIndex={0}>
                  {brandSrc ? (
                    <>
                      <div className="brand-logo-surface">
                        <img
                          src={brandSrc}
                          alt={brandLabel}
                          className={`brand-logo-image brand-logo-image-${brandSlug}`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="brand-logo-caption">
                        <h3>{brandLabel}</h3>
                        {brand.duration ? <p>{brand.duration}</p> : null}
                      </div>
                      <div className="brand-insight-box" aria-label={`${brandLabel} contribution details`}>
                        <p className="brand-insight-kicker">{brand.duration}</p>
                        <h4>{brand.role}</h4>
                        <p>{brand.contribution}</p>
                        <p>{brand.value}</p>
                      </div>
                    </>
                  ) : (
                    <div className="brand-placeholder">
                      <Upload size={18} />
                      <span>{brand.name}</span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
