import { useEffect, useMemo, useRef, useState } from 'react';
import { Compass, Rocket, ShieldCheck, Sparkles } from 'lucide-react';

export default function CareerJourneySection({ journey = [] }) {
  const baseOrder = useMemo(
    () => [...journey],
    [journey],
  );
  const [orderedJourney, setOrderedJourney] = useState(baseOrder);
  const [dragState, setDragState] = useState({ isDragging: false, dragIndex: null, overIndex: null });
  const [isSettling, setIsSettling] = useState(false);
  const dragIndexRef = useRef(null);
  const resetTimerRef = useRef(null);
  const settleTimerRef = useRef(null);

  useEffect(() => {
    setOrderedJourney(baseOrder);
  }, [baseOrder]);

  useEffect(() => () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
    }
  }, []);

  const tileClassByIndex = [
    'journey-tile-primary',
    'journey-tile-secondary',
    'journey-tile-support',
    'journey-tile-present',
    'journey-tile-forecast-a',
    'journey-tile-forecast-b',
    'journey-tile-forecast-c',
  ];

  const iconByType = {
    present: ShieldCheck,
    future: Rocket,
    past: Compass,
  };

  const onDragStart = (index) => {
    dragIndexRef.current = index;
    setDragState({ isDragging: true, dragIndex: index, overIndex: null });
  };

  const onDragEnter = (hoverIndex) => {
    const dragIndex = dragIndexRef.current;

    if (dragIndex === null || dragIndex === hoverIndex) {
      return;
    }

    setOrderedJourney((current) => {
      const next = [...current];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, moved);
      return next;
    });

    dragIndexRef.current = hoverIndex;
    setDragState((previous) => ({ ...previous, overIndex: hoverIndex, dragIndex: hoverIndex }));
  };

  const onDragEnd = () => {
    dragIndexRef.current = null;
    setDragState({ isDragging: false, dragIndex: null, overIndex: null });
    setIsSettling(true);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
    }

    settleTimerRef.current = setTimeout(() => {
      setIsSettling(false);
    }, 360);

    resetTimerRef.current = setTimeout(() => {
      setOrderedJourney(baseOrder);
    }, 500);
  };

  return (
    <section id="journey" className="section-frame section-light border-b border-[var(--border-soft)] journey-section">
      <div className="section-wrap section-pad">
        <div className="portfolio-header portfolio-header-match">
          <div>
            <p className="section-eyebrow">Career Logbook</p>
            <h2 className="portfolio-title">Career Journey.</h2>
          </div>
          <p className="portfolio-note">A timeline of where I&apos;ve been and where I&apos;m heading next.</p>
        </div>

        <div className="journey-grid-wrap journey-bento-wrap">
          <div className="journey-grid-lines" aria-hidden="true" />
          <div className="journey-circuit journey-circuit-b" aria-hidden="true" />
          <div
            className={`journey-grid journey-bento-grid ${dragState.isDragging ? 'journey-grid-dragging' : ''} ${
              isSettling ? 'journey-grid-settling' : ''
            }`}
          >
            {orderedJourney.map((item, index) => {
              const isFuture = item.type === 'future';
              const isPresent = item.type === 'present';
              const nodeClass = `journey-node ${isFuture ? 'journey-node-future' : ''} ${
                isPresent ? 'journey-node-present' : ''
              } journey-node-${item.type || 'past'} ${tileClassByIndex[index] || ''} ${
                dragState.isDragging && dragState.dragIndex === index ? 'journey-node-is-drag' : ''
              } ${dragState.isDragging && dragState.overIndex === index ? 'journey-node-is-over' : ''}`;
              const StatusIcon = iconByType[item.type] || Compass;

              return (
                <article
                  key={`${item.role}-${item.period}`}
                  className={nodeClass}
                  draggable="true"
                  onDragStart={() => onDragStart(index)}
                  onDragOver={(event) => event.preventDefault()}
                  onDragEnter={() => onDragEnter(index)}
                  onDragEnd={onDragEnd}
                  data-journey-type={item.type || 'past'}
                  style={{ '--journey-delay': `${index * 0.35}s` }}
                >
                  <div className="journey-meta-row">
                    <span className="journey-phase-icon" aria-hidden="true">
                      <StatusIcon size={13} />
                    </span>
                    <p className="journey-period">{item.period}</p>
                    {isPresent ? <span className="journey-status-pill">Current Chapter</span> : null}
                  </div>
                  <h3 className="journey-role">{item.role}</h3>
                  <div className="journey-company-row">
                    {item.companyLogo ? (
                      <img src={item.companyLogo} alt={`${item.company} logo`} className="journey-company-logo" />
                    ) : null}
                    <p className="journey-company">{item.company}</p>
                  </div>
                  <p className="journey-description">{item.description}</p>
                  <p className="journey-drag-hint">
                    <Sparkles size={11} />
                    Drag to explore
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
