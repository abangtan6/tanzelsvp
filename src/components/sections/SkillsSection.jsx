import { Brush, PenTool, Cuboid, Clapperboard, Megaphone } from 'lucide-react';

const icons = {
  'Graphic Design': Brush,
  'Brand Identity': PenTool,
  '3D Visualization': Cuboid,
  'Video Editing': Clapperboard,
  'Digital Marketing': Megaphone,
};

export default function SkillsSection({ groups }) {
  const scrollingGroups = [...groups, ...groups];
  const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <section id="diagnostics" className="section-frame border-b border-[var(--border-soft)] section-tint">
      <div className="section-wrap service-loop-shell service-loop-bleed">
        <div className="service-loop-track">
          {scrollingGroups.map((group, index) => {
            const Icon = icons[group.title] || Brush;
            const isDuplicate = index >= groups.length;
            const iconClass = `service-icon service-icon-${toSlug(group.title)}`;

            return (
              <article
                key={`${group.title}-${index}`}
                className="service-panel service-panel-card"
                aria-hidden={isDuplicate ? 'true' : undefined}
              >
                <Icon size={22} className={iconClass} />
                <p className="service-kicker">{group.code}</p>
                <h3 className="service-title">{group.displayTitle}</h3>
                <p className="service-text">{group.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
