import type { Project } from '../../types/portfolio';

const STATUS_COLOR: Record<string, string> = {
  LIVE:     '#43fe6d',
  COMPLETE: '#b9e4ff',
  ARCHIVED: '#ffb787',
};

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%231c1b1b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23859582' font-size='14' font-family='monospace'%3ENo image%3C/text%3E%3C/svg%3E";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const href = project.githubLink || project.link || '#';

  return (
    <article className="poster-card">
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src={project.image || FALLBACK_IMG}
          alt={project.title}
          className="poster-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Base info — always visible, hidden on hover */}
      <div className="poster-base">
        <span
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          {project.genre}
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-headline)',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
            color: 'var(--on-surface)',
            lineHeight: 1.05,
            marginBottom: '0.4rem',
          }}
        >
          {project.title}
        </h3>
        <span
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'var(--outline)',
          }}
        >
          {project.year}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="poster-overlay" aria-hidden="true">
        <div className="poster-overlay-inner">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--on-surface-var)',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            } as React.CSSProperties}
          >
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-label)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.25rem 0.65rem',
                  background: 'rgba(67,254,109,0.08)',
                  color: 'var(--primary)',
                  border: '1px solid rgba(67,254,109,0.2)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <a href={href} target="_blank" rel="noopener noreferrer" className="poster-cta">
            <span>View Project</span>
            <span className="poster-cta-arrow">→</span>
          </a>
        </div>
      </div>

      {/* Status pill */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 4,
          fontFamily: 'var(--font-label)',
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: STATUS_COLOR[project.status] ?? 'var(--on-surface-var)',
          background: 'rgba(0,0,0,0.6)',
          padding: '0.3rem 0.6rem',
          backdropFilter: 'blur(4px)',
        }}
      >
        {project.status}
      </div>
    </article>
  );
}
