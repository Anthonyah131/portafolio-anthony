import { useState } from 'react';

const technicalSkills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Three.js', level: 80 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 75 },
  { name: 'SQL', level: 70 },
];

const softSkills = [
  'Problem Solving',
  'Team Collaboration',
  'Communication',
  'Adaptability',
  'Time Management',
  'Creative Thinking',
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<'technical' | 'soft'>('technical');

  return (
    <section 
      id="skills" 
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
          Skills & Abilities
        </h2>

        {/* Tab Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          marginBottom: '3rem',
        }}>
          <button
            onClick={() => setActiveTab('technical')}
            style={{
              padding: '0.75rem 2rem',
              background: activeTab === 'technical' ? 'rgba(110, 198, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: `2px solid ${activeTab === 'technical' ? '#6ec6ff' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
            }}
          >
            Technical Skills
          </button>
          <button
            onClick={() => setActiveTab('soft')}
            style={{
              padding: '0.75rem 2rem',
              background: activeTab === 'soft' ? 'rgba(110, 198, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: `2px solid ${activeTab === 'soft' ? '#6ec6ff' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
            }}
          >
            Soft Skills
          </button>
        </div>

        {/* Technical Skills */}
        {activeTab === 'technical' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {technicalSkills.map((skill) => (
              <div key={skill.name}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #6ec6ff 0%, #9f7aea 100%)',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Soft Skills */}
        {activeTab === 'soft' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {softSkills.map((skill) => (
              <div 
                key={skill}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(110, 198, 255, 0.1)',
                  border: '1px solid rgba(110, 198, 255, 0.3)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(110, 198, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(110, 198, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
