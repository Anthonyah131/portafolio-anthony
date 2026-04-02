import { getProjectTransitionNames } from '../../utils/projectTransitions';
import { Image } from './Image';
import type { Project } from '../../types/portfolio';

const STATUS_COLOR: Record<string, string> = {
  LIVE:     '#43fe6d',
  COMPLETE: '#b9e4ff',
  ARCHIVED: '#ffb787',
};

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%231c1b1b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23859582' font-size='14' font-family='monospace'%3ENo image%3C/text%3E%3C/svg%3E";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const href = `/projects/${project.slug}`;
  const transitionNames = getProjectTransitionNames(project.slug);

  return (
    <article className="group relative h-full w-full cursor-pointer overflow-hidden bg-(--bg-card) before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_45%_18%,rgba(67,254,109,0.2)_0%,transparent_34%),radial-gradient(circle_at_74%_82%,rgba(255,183,135,0.12)_0%,transparent_28%),linear-gradient(180deg,rgba(67,254,109,0.05)_0%,transparent_26%),linear-gradient(0deg,rgba(255,183,135,0.05)_0%,transparent_30%)] before:opacity-0 before:transition-opacity before:duration-[450ms] before:content-[''] hover:before:opacity-100">
      {/* Background image */}
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{
          viewTransitionName: transitionNames.poster,
        }}
      >
        <Image
          src={project.image || FALLBACK_IMG}
          alt={project.title}
          className="h-full w-full object-cover [filter:grayscale(30%)_contrast(1.1)] [transform:scale(1.04)] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:[filter:grayscale(0%)_contrast(1.05)] group-hover:[transform:scale(1.12)]"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Base info — always visible, hidden on hover */}
      <div className="absolute right-0 bottom-0 left-0 z-20 bg-[linear-gradient(to_top,rgba(10,10,10,0.97)_0%,rgba(10,10,10,0.7)_50%,transparent_100%)] px-6 pt-8 pb-6 transition-opacity duration-300 group-hover:opacity-0">
        <span className="mb-2 block font-label text-[0.6rem] uppercase tracking-[0.3em] text-secondary">
          {project.genre}
        </span>
        <h3
          className="mb-1.5 font-headline text-xl font-bold italic leading-[1.05] text-surface sm:text-2xl xl:text-[1.75rem]"
          style={{
            viewTransitionName: transitionNames.title,
          }}
        >
          {project.title}
        </h3>
        <span className="font-label text-[0.65rem] tracking-[0.15em] text-outline">
          {project.year}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 z-30 flex items-end bg-[rgba(8,8,8,0.92)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
        <div className="flex translate-y-3 flex-col gap-4 px-6 py-8 transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0">
          <p className="line-clamp-3 text-[0.85rem] leading-[1.6] text-surface-muted">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="border border-[rgba(67,254,109,0.2)] bg-[rgba(67,254,109,0.08)] px-[0.65rem] py-1 font-label text-[0.6rem] uppercase tracking-[0.12em] text-primary"
              >
                {t}
              </span>
            ))}
          </div>

          <a href={href} className="relative z-40 inline-flex self-start bg-primary px-5 py-3 font-label text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#002a0e] transition-[background-color,box-shadow] duration-200 hover:bg-[#5fff7a] hover:shadow-[0_0_20px_rgba(67,254,109,0.4)]">
            <span>View Project</span>
            <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* Status pill */}
      <div
        className="absolute top-4 right-4 z-40 bg-[rgba(0,0,0,0.6)] px-2.5 py-1 font-label text-[0.55rem] uppercase tracking-[0.2em] backdrop-blur-[4px]"
        style={{
          color: STATUS_COLOR[project.status] ?? 'var(--on-surface-var)',
        }}
      >
        {project.status}
      </div>
    </article>
  );
}
