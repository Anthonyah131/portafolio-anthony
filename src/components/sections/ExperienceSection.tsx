export default function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      role: 'Senior Frontend Developer',
      company: 'Tech Company Inc.',
      period: '2023 - Present',
      description: 'Leading frontend development with React and Three.js',
      technologies: ['React', 'TypeScript', 'Three.js', 'Next.js'],
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2021 - 2023',
      description: 'Built scalable web applications and APIs',
      technologies: ['Node.js', 'React', 'MongoDB', 'AWS'],
    },
    {
      id: 3,
      role: 'Junior Developer',
      company: 'Startup Studio',
      period: '2019 - 2021',
      description: 'Developed responsive web interfaces',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Vue.js'],
    },
  ];

  return (
    <section 
      id="experience" 
      className="section-container min-h-screen lg:h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 lg:py-0 relative"
    >
      <div style={{ 
        maxWidth: '900px',
        width: '100%',
        color: 'white',
        zIndex: 10,
        position: 'relative',
      }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '3rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #6ec6ff 0%, #9f7aea 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Work Experience
        </h2>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              style={{
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(110, 198, 255, 0.2)',
                borderRadius: '12px',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(10px)';
                e.currentTarget.style.borderColor = 'rgba(110, 198, 255, 0.5)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = 'rgba(110, 198, 255, 0.2)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-8px',
                top: '2rem',
                width: '16px',
                height: '16px',
                background: 'linear-gradient(135deg, #6ec6ff 0%, #9f7aea 100%)',
                borderRadius: '50%',
                border: '3px solid rgba(0, 0, 20, 0.7)',
              }} />

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '0.25rem',
                    color: '#6ec6ff',
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{ 
                    fontSize: '1.125rem',
                    opacity: 0.9,
                  }}>
                    {exp.company}
                  </p>
                </div>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(110, 198, 255, 0.2)',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                }}>
                  {exp.period}
                </span>
              </div>

              <p style={{ 
                opacity: 0.8,
                marginBottom: '1rem',
                lineHeight: '1.6',
              }}>
                {exp.description}
              </p>

              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                flexWrap: 'wrap',
              }}>
                {exp.technologies.map((tech) => (
                  <span 
                    key={tech}
                    style={{
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(159, 122, 234, 0.2)',
                      border: '1px solid rgba(159, 122, 234, 0.3)',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
