import { Eye, Activity, Video } from 'lucide-react';

const icons = {
  'Brand Systems': Eye,
  'Content Production': Activity,
  'Tools & Workflow': Video,
};

export default function SkillsSection({ groups }) {
  return (
    <section id="diagnostics" className="section-frame border-b border-[var(--border-soft)] section-tint">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 border-x border-[var(--border-soft)] md:grid-cols-3">
        {groups.map((group, index) => {
          const Icon = icons[group.title] || Eye;
          const labels = ['01_DIAGNOSIS', '02_PRESCRIPTION', '03_SURGERY'];

          return (
            <article
              key={group.title}
              className={`service-panel ${index < groups.length - 1 ? 'md:border-r' : ''} border-[var(--border-soft)]`}
            >
              <Icon size={22} className="text-[var(--text-muted)]" />
              <p className="service-kicker">{labels[index]}</p>
              <h3 className="service-title">{group.title === 'Brand Systems' ? 'Brand Identity' : group.title === 'Content Production' ? 'Web Design' : 'Video Editor'}</h3>
              <p className="service-text">{group.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
