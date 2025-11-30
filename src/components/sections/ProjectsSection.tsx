import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A revolutionary web application built with React and Three.js',
    image: '/placeholder-project.jpg',
    tech: ['React', 'Three.js', 'TypeScript'],
    link: '#',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'Full-stack e-commerce platform with real-time features',
    image: '/placeholder-project.jpg',
    tech: ['Node.js', 'React', 'MongoDB'],
    link: '#',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'AI-powered analytics dashboard for data visualization',
    image: '/placeholder-project.jpg',
    tech: ['Python', 'React', 'TensorFlow'],
    link: '#',
  },
];

const certificates = [
  {
    id: 1,
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2024',
    link: '#',
  },
  {
    id: 2,
    title: 'React Advanced Patterns',
    issuer: 'Frontend Masters',
    date: '2024',
    link: '#',
  },
  {
    id: 3,
    title: 'Three.js Journey',
    issuer: 'Bruno Simon',
    date: '2023',
    link: '#',
  },
];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates'>('projects');

  return (
    <section 
      id="projects" 
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
        maxWidth: '1200px',
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
          Projects & Achievements
        </h2>

        {/* Tab Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginBottom: '3rem',
        }}>
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              padding: '0.75rem 2rem',
              background: activeTab === 'projects' ? 'rgba(110, 198, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: `2px solid ${activeTab === 'projects' ? '#6ec6ff' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
            }}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            style={{
              padding: '0.75rem 2rem',
              background: activeTab === 'certificates' ? 'rgba(110, 198, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: `2px solid ${activeTab === 'certificates' ? '#6ec6ff' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
            }}
          >
            Certificates
          </button>
        </div>

        {/* Projects Grid */}
        {activeTab === 'projects' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}>
            {projects.map((project) => (
              <div 
                key={project.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(110, 198, 255, 0.2)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(110, 198, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(110, 198, 255, 0.2)';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, rgba(110, 198, 255, 0.2) 0%, rgba(159, 122, 234, 0.2) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                }}>
                  📱
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '0.5rem',
                    color: '#6ec6ff',
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ 
                    opacity: 0.8, 
                    marginBottom: '1rem',
                    lineHeight: '1.6',
                  }}>
                    {project.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    flexWrap: 'wrap',
                    marginBottom: '1rem',
                  }}>
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: 'rgba(110, 198, 255, 0.2)',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    style={{
                      color: '#6ec6ff',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                    }}
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificates List */}
        {activeTab === 'certificates' && (
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            {certificates.map((cert) => (
              <div 
                key={cert.id}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(110, 198, 255, 0.2)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  gap: '1rem',
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      marginBottom: '0.5rem',
                      color: '#6ec6ff',
                    }}>
                      {cert.title}
                    </h3>
                    <p style={{ opacity: 0.8 }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(110, 198, 255, 0.2)',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                  }}>
                    {cert.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
