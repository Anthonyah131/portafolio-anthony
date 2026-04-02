import { useEffect, useMemo, useRef, useState } from 'react';
import { skillCategories } from '../../data/skills';
import type { SkillCategory } from '../../types/portfolio';

type CategoryLayout = {
  top: number;
  width: number;
  columnCount: number;
};

const CATEGORY_LAYOUTS: CategoryLayout[] = [
  { top: 56, width: 260, columnCount: 3 },
  { top: 316, width: 330, columnCount: 4 },
  { top: 120, width: 295, columnCount: 3 },
  { top: 386, width: 245, columnCount: 3 },
  { top: 82, width: 330, columnCount: 4 },
  { top: 332, width: 280, columnCount: 3 },
];

function getLayout(index: number): CategoryLayout {
  return CATEGORY_LAYOUTS[index % CATEGORY_LAYOUTS.length];
}

export default function SkillsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const maxSkillCount = useMemo(
    () => Math.max(...skillCategories.map(category => category.skills.length)),
    [],
  );

  useEffect(() => {
    const viewportMedia = window.matchMedia('(max-width: 767px)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMedia = () => {
      setIsMobile(viewportMedia.matches);
      setReduceMotion(motionMedia.matches);
    };

    updateMedia();
    viewportMedia.addEventListener('change', updateMedia);
    motionMedia.addEventListener('change', updateMedia);

    return () => {
      viewportMedia.removeEventListener('change', updateMedia);
      motionMedia.removeEventListener('change', updateMedia);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setProgress(0);
      return;
    }

    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = Math.max(1, wrapper.offsetHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, scrolled / maxScroll));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    const raf = window.requestAnimationFrame(handleScroll);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile]);

  const stageTranslateX = isMobile ? 0 : 460 - progress * 680;
  const warmOverlayOpacity = isMobile ? 0.08 : progress * 0.2;

  return (
    <section
      ref={wrapperRef}
      id="skills"
      style={{
        position: 'relative',
        height: isMobile ? 'auto' : '220vh',
        minHeight: isMobile ? 'auto' : '100svh',
      }}
    >
      <div
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100svh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-low)',
          backgroundImage:
            'radial-gradient(circle at 16% 20%, rgba(67,254,109,0.08), transparent 38%), radial-gradient(circle at 84% 72%, rgba(255,183,135,0.12), transparent 42%), linear-gradient(135deg, rgba(133,149,130,0.12) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 24px 24px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(118deg, rgba(255,183,135,0.34), rgba(255,183,135,0.08) 42%, transparent 72%)',
            opacity: warmOverlayOpacity,
            transition: reduceMotion ? 'none' : 'opacity 180ms linear',
            zIndex: 0,
          }}
        />

        <div
          style={{
            padding: isMobile ? '2rem 1.1rem 1.2rem' : '2.5rem clamp(2rem, 5vw, 5rem) 1.5rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            flexShrink: 0,
            zIndex: 2,
          }}
        >
          <div>
            <div className="split-line-wrap" style={{ marginBottom: '0.5rem' }}>
              <span
                className="split-line"
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                }}
              >
                Expertise
              </span>
            </div>
            <h2
              className="fade-up"
              style={{
                transitionDelay: '120ms',
                fontFamily: 'var(--font-headline)',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 'clamp(2.1rem, 4.8vw, 3.75rem)',
                lineHeight: 0.95,
                color: 'var(--on-surface)',
              }}
            >
              Skills &amp; <span style={{ color: 'var(--primary)' }}>Technologies.</span>
            </h2>
          </div>

          {!isMobile && (
            <div className="fade-up" style={{ transitionDelay: '220ms', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--outline)',
                }}
              >
                {Math.round(progress * 100)}%
              </span>
              <div style={{ width: '64px', height: '1px', background: 'var(--outline-var)', position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--primary)',
                    transformOrigin: 'left',
                    transform: `scaleX(${progress})`,
                    transition: reduceMotion ? 'none' : 'transform 0.1s linear',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ height: '1px', background: 'var(--outline-var)', opacity: 0.4, flexShrink: 0 }} />

        {isMobile ? (
          <div
            className="stagger"
            style={{
              padding: '1.2rem 0.9rem 1.5rem',
              display: 'grid',
              gap: '1rem',
            }}
          >
            {skillCategories.map(category => (
              <MobileCategoryIcons key={category.category} category={category} />
            ))}
          </div>
        ) : (
          <div style={{ flex: 1, position: 'relative', zIndex: 1, overflow: 'hidden' }}>
            <div
              ref={stageRef}
              style={{
                position: 'relative',
                height: '100%',
                width: `${Math.max(1900, skillCategories.length * 340) + 180}px`,
                transform: `translateX(${stageTranslateX}px)`,
                willChange: 'transform',
                transition: reduceMotion ? 'none' : 'transform 160ms linear',
              }}
            >
              {skillCategories.map((category, categoryIndex) => {
                const layout = getLayout(categoryIndex);
                const leftBase = categoryIndex * 286 + 44;
                const categoryOffset = -progress * (16 + categoryIndex * 8);

                return (
                  <div
                    key={category.category}
                    className="fade-up"
                    style={{
                      transitionDelay: `${Math.min(categoryIndex * 90, 450)}ms`,
                      position: 'absolute',
                      top: `${layout.top}px`,
                      left: `${leftBase + categoryOffset}px`,
                      width: `${layout.width}px`,
                      display: 'grid',
                      gap: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-label)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'var(--secondary)',
                      }}
                    >
                      {category.category}
                    </span>

                    <div
                      className="stagger"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${Math.min(layout.columnCount, Math.max(2, category.skills.length))}, minmax(0, 1fr))`,
                        gap: '0.65rem',
                      }}
                    >
                      {category.skills.map(skill => (
                        <IconToken
                          key={`${category.category}-${skill.name}`}
                          icon={skill.icon}
                          name={skill.name}
                          scale={1 + (maxSkillCount - category.skills.length) * 0.015}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function IconToken({ icon, name, scale = 1 }: { icon: string; name: string; scale?: number }) {
  return (
    <div
      title={name}
      aria-label={name}
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(165deg, rgba(32,31,31,0.72), rgba(17,17,17,0.52))',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <i
        className={`devicon-${icon}-plain`}
        aria-hidden="true"
        style={{
          fontSize: `calc(1.65rem * ${scale})`,
          color: 'var(--primary)',
          filter: 'drop-shadow(0 5px 12px rgba(67,254,109,0.25))',
        }}
      />
    </div>
  );
}

function MobileCategoryIcons({ category }: { category: SkillCategory }) {
  return (
    <section
      style={{
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '0.85rem',
        background: 'rgba(19,19,19,0.75)',
        display: 'grid',
        gap: '0.75rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-label)',
          fontSize: '0.58rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
        }}
      >
        {category.category}
      </span>

      <div
        className="stagger"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '0.55rem',
        }}
      >
        {category.skills.map(skill => (
          <IconToken key={`${category.category}-${skill.name}`} icon={skill.icon} name={skill.name} />
        ))}
      </div>
    </section>
  );
}

