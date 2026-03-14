import { Upload } from 'lucide-react';

export default function BrandsSection({ brands = [] }) {
  const getBrandSlug = (name = '') => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <section id="brands" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="section-wrap section-pad">
        <div className="brands-shell">
          <div className="brands-header">
            <div>
              <p className="section-eyebrow">Partner Logbook</p>
              <h2 className="brands-title">Allies On Record.</h2>
            </div>
            <p className="brands-note">Drop each brand webP into data later and these placeholders will auto-switch to real logos.</p>
          </div>
          <div className="brands-grid">
            {brands.map((brand) => {
              const brandSlug = getBrandSlug(brand.name);

              return (
                <article key={brand.name} className="brand-logo-slot">
                  {brand.src ? (
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className={`brand-logo-image brand-logo-image-${brandSlug}`}
                      loading="lazy"
                      decoding="async"
                    />
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
