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
              className="inline-flex w-full items-center justify-between gap-2 font-label text-xs font-semibold uppercase tracking-wider text-surface-muted transition-[transform,color] duration-300 hover:-translate-y-0.5 hover:text-primary sm:w-auto sm:justify-start"
              aria-label={`Open ${key}`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
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
