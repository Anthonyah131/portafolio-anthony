import { personal } from '../../data/personal';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}
      >

        {/* ── Left col ── */}
        <div>
          <div className="split-line-wrap" style={{ marginBottom: '1.25rem' }}>
            <span
              className="split-line"
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.68rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
              }}
            >
              About me
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-headline)',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
              lineHeight: 0.95,
              color: 'var(--on-surface)',
              marginBottom: '2rem',
            }}
          >
            <div className="split-line-wrap">
              <span className="split-line" style={{ transitionDelay: '80ms' }}>Building things</span>
            </div>
            <div className="split-line-wrap">
              <span className="split-line" style={{ transitionDelay: '180ms' }}>
                that <span style={{ color: 'var(--primary)' }}>matter.</span>
              </span>
            </div>
          </h2>

          {/* Bio paragraphs */}
          <div className="fade-up" style={{ transitionDelay: '200ms', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {personal.bio.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
                  color: 'var(--on-surface-var)',
                  lineHeight: 1.75,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div className="fade-up" style={{ transitionDelay: '280ms', width: '3rem', height: '2px', background: 'var(--secondary)', marginBottom: '2rem' }} />

          {/* Education */}
          <div className="fade-up" style={{ transitionDelay: '340ms', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>🎓</span>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--secondary)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Education
                </span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--on-surface)', fontWeight: 500 }}>
                  {personal.education.degree}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--on-surface-var)' }}>
                  {personal.education.institution}
                </p>
                <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.65rem', color: 'var(--outline)', marginTop: '0.2rem' }}>
                  {personal.education.status}
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="fade-up" style={{ transitionDelay: '400ms', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>💼</span>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--secondary)',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  Experience
                </span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--on-surface)', fontWeight: 500 }}>
                  {personal.experience.role}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--on-surface-var)' }}>
                  {personal.experience.company}
                </p>
                <p style={{ fontFamily: 'var(--font-label)', fontSize: '0.65rem', color: 'var(--outline)', marginTop: '0.2rem' }}>
                  {personal.experience.period}
                </p>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="fade-up" style={{ transitionDelay: '460ms' }}>
            <span
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              ✨ Interests & Hobbies
            </span>
            <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {personal.interests.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.68rem',
                    fontWeight: 500,
                    padding: '0.3rem 0.8rem',
                    background: 'var(--bg-highest)',
                    color: 'var(--on-surface-var)',
                    border: '1px solid transparent',
                    borderRadius: '999px',
                    transition: 'all var(--trans-base)',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255,183,135,0.35)';
                    el.style.color = 'var(--secondary)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'transparent';
                    el.style.color = 'var(--on-surface-var)';
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right col ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Photo */}
          <div className="clip-reveal" style={{ aspectRatio: '4/5', overflow: 'hidden', maxWidth: '380px' }}>
            <img
              src="/imgs/AnthonyPerfil.webp"
              alt="Anthony Avila"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(20%)',
                transition: 'filter var(--trans-slow), transform var(--trans-slow)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.filter = 'grayscale(0%)';
                el.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.filter = 'grayscale(20%)';
                el.style.transform = 'scale(1)';
              }}
            />
          </div>

          {/* Stats grid */}
          <div
            className="stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'var(--outline-var)',
              border: '1px solid var(--outline-var)',
            }}
          >
            {[
              { value: '3+',  label: 'Years coding' },
              { value: '9',   label: 'Projects shipped' },
              { value: '12',  label: 'Certifications' },
              { value: 'CR',  label: 'Costa Rica' },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  padding: '1.5rem',
                  background: 'var(--bg-low)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-headline)',
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    color: 'var(--primary)',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--on-surface-var)',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

