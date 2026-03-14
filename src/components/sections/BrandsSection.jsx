import { Briefcase, CalendarClock, CircleDot, Sparkles, Upload } from 'lucide-react';

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

  const getDurationMeta = (statusType = 'project', duration = '') => {
    if (statusType === 'current') {
      return { label: duration || 'Current', icon: CircleDot, className: 'brand-duration-current' };
    }
    if (statusType === 'short') {
      return { label: duration || 'Short-term', icon: CalendarClock, className: 'brand-duration-short' };
    }
    if (statusType === 'show') {
      return { label: duration || 'Live work', icon: Sparkles, className: 'brand-duration-show' };
    }
    if (statusType === 'growth') {
      return { label: duration || 'Growth track', icon: Briefcase, className: 'brand-duration-growth' };
    }
    if (statusType === 'freelance') {
      return { label: duration || 'Freelance', icon: Briefcase, className: 'brand-duration-freelance' };
    }

    return { label: duration || 'Project', icon: Briefcase, className: 'brand-duration-project' };
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
              const durationMeta = getDurationMeta(brand.statusType, brand.duration);
              const DurationIcon = durationMeta.icon;

              return (
                <article
                  key={brand.name}
                  className={`brand-logo-slot ${getLayoutClass(brand.layout)} ${brand.isCurrent ? 'brand-logo-slot-current' : ''}`}
                  tabIndex={0}
                >
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
                        <span className={`brand-duration-chip ${durationMeta.className}`}>
                          <DurationIcon size={10} />
                          {durationMeta.label}
                        </span>
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
