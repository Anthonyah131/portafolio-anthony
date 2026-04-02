import { memo } from 'react';
import { ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';

type SocialMap = {
  github: string;
  linkedin: string;
  instagram: string;
};

function HeroSocialLinksBase({ social }: { social: SocialMap }) {
  const icons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
  } as const;

  return (
    <div className="fade-up flex flex-wrap items-stretch gap-3 pt-2 sm:items-center" style={{ transitionDelay: '620ms' }}>
      <span className="w-full pr-1 font-label text-xs uppercase tracking-widest text-outline sm:w-auto">Elsewhere</span>
      {Object.entries(social).map(([key, url]) => (
        (() => {
          const Icon = icons[key as keyof SocialMap];

          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-between gap-2 rounded-full border border-[rgba(133,149,130,0.17)] bg-white/3 px-4 py-3 font-label text-xs font-semibold uppercase tracking-wider text-surface-muted transition-[transform,border-color,color,background] duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,183,135,0.42)] hover:bg-[rgba(255,183,135,0.08)] hover:text-surface sm:w-auto sm:justify-start"
              aria-label={`Open ${key}`}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5" aria-hidden="true">
                <Icon size={15} strokeWidth={1.9} />
              </span>
              <span>{key}</span>
              <ArrowUpRight size={13} strokeWidth={2} />
            </a>
          );
        })()
      ))}
    </div>
  );
}

export const HeroSocialLinks = memo(HeroSocialLinksBase);
