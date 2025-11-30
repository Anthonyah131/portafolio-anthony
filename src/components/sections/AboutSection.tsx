export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="section-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{ 
        maxWidth: '800px',
        color: 'white',
        zIndex: 10,
        position: 'relative',
      }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #6ec6ff 0%, #9f7aea 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          About Me
        </h2>
        <div style={{ 
          fontSize: '1.125rem', 
          lineHeight: '1.8',
          opacity: 0.9,
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Hi! I'm Anthony, a passionate developer with expertise in creating 
            immersive web experiences. I specialize in combining cutting-edge 
            technologies with creative design to build unique digital solutions.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            My journey in tech has led me to master both frontend and backend 
            development, with a special focus on 3D web graphics and interactive 
            animations.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, 
            contributing to open-source projects, or designing the next big thing.
          </p>
        </div>
      </div>
    </section>
  );
}
