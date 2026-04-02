import { useState } from 'react';
import { HeaderBlock } from './projects/HeaderBlock';
import { ProjectsGrid } from './projects/ProjectsGrid';
import { CertificatesGrid } from './projects/CertificatesGrid';
import { type Tab } from './projects/constants';

export default function ProjectsSection() {
  const [tab, setTab] = useState<Tab>('projects');

  return (
    <section
      id="projects"
      style={{
        background: 'var(--bg-low)',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem)',
      }}
    >
      <div className="section-inner">
        <HeaderBlock tab={tab} onTabChange={setTab} />
        {tab === 'projects' ? <ProjectsGrid /> : <CertificatesGrid />}
      </div>
    </section>
  );
}
