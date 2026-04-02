import { memo } from 'react';
import { projects } from '../../../data/projects';
import ProjectCard from '../../ui/ProjectCard';
import { TALL_INDICES } from './constants';

function ProjectsGridBase() {
  return (
    <>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <div
            key={project.id}
            style={{
              gridRow: TALL_INDICES.has(i) ? 'span 2' : 'span 1',
              minHeight: 0,
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <div className="fade-up projects-footer">
        <div>
          <h3 className="projects-footer-title">More in Pre-Production</h3>
          <p className="projects-footer-copy">New projects are currently in development. Stay tuned.</p>
        </div>

        <a href="#contact" className="projects-ghost-cta">
          Commission a Project →
        </a>
      </div>
    </>
  );
}

export const ProjectsGrid = memo(ProjectsGridBase);
