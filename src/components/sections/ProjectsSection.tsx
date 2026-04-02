import { useState } from 'react';
import { HeaderBlock } from './projects/HeaderBlock';
import { ProjectsGrid } from './projects/ProjectsGrid';
import { CertificatesGrid } from './projects/CertificatesGrid';
import { type Tab } from './projects/constants';

export default function ProjectsSection() {
  const [tab, setTab] = useState<Tab>('projects');

  return (
    <section id="projects" className="bg-(--bg-low) py-16 sm:py-20 lg:py-24">
      <div className="section-inner px-8 sm:px-12 xl:px-0">
        <HeaderBlock tab={tab} onTabChange={setTab} />
        {tab === 'projects' ? <ProjectsGrid /> : <CertificatesGrid />}
      </div>
    </section>
  );
}
