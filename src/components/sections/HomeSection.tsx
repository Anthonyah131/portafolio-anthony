export default function HomeSection() {
  return (
    <section 
      id="home" 
      className="section-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '2rem',
      }}
    >
      <div className="content-overlay" style={{ 
        position: 'relative', 
        zIndex: 10,
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 8vw, 5rem)', 
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(110, 198, 255, 0.5)',
        }}>
          Anthony's Portfolio
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 3vw, 1.5rem)', 
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Full Stack Developer & Creative Technologist
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a 
            href="#about" 
            style={{
              padding: '0.75rem 2rem',
              background: 'rgba(110, 198, 255, 0.2)',
              border: '2px solid #6ec6ff',
              borderRadius: '8px',
              color: 'white',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(110, 198, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(110, 198, 255, 0.2)';
            }}
          >
            Explore
          </a>
        </div>
      </div>
    </section>
  );
}
