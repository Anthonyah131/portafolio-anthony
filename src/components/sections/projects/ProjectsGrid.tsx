import { memo } from 'react';
import { projects } from '../../../data/projects';
import ProjectCard from '../../ui/ProjectCard';
import { TALL_INDICES } from './constants';

function ProjectsGridBase() {
  return (
    <>
      <div className="grid grid-cols-1 auto-rows-[360px] gap-3 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={TALL_INDICES.has(i) ? 'min-h-0 xl:[grid-row:span_2]' : 'min-h-0'}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="fade-up mt-8 flex flex-wrap items-center justify-between gap-8 border-t border-[rgba(60,75,58,0.2)] pt-12">
        <div>
          <h3 className="mb-2 font-headline text-[1.32rem] italic text-surface">More in Pre-Production</h3>
          <p className="text-[0.9rem] text-surface-muted">New projects are currently in development. Stay tuned.</p>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 border border-(--outline-var) bg-transparent px-8 py-3.5 font-label text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-surface-muted transition-[transform,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-outline hover:text-surface"
        >
          Commission a Project →
        </a>
      </div>
    </>
  );
}

export const ProjectsGrid = memo(ProjectsGridBase);
