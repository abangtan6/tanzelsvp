import { Eye, Activity, Video } from 'lucide-react';

const icons = {
  'Brand Systems': Eye,
  'Content Production': Activity,
  'Tools & Workflow': Video,
};

const labels = ['01_DIAGNOSIS', '02_PRESCRIPTION', '03_SURGERY'];
const titles = ['Brand Identity', 'Web Design', 'Video Editor'];

export default function SkillsSection({ groups }) {
  return (
    <section id="diagnostics" className="section-frame border-b border-[var(--border-soft)] section-tint">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 border-x border-[var(--border-soft)] md:grid-cols-3">
        {groups.map((group, index) => {
          const Icon = icons[group.title] || Eye;

          return (
            <article
              key={group.title}
              className={`service-panel border-b border-[var(--border-soft)] md:border-b-0 ${
                index < groups.length - 1 ? 'md:border-r' : ''
              }`}
            >
              <Icon size={22} className="service-icon" />
              <p className="service-kicker">{labels[index]}</p>
              <h3 className="service-title">{titles[index]}</h3>
              <p className="service-text">{group.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
