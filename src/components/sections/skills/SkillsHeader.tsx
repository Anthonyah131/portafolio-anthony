import { memo } from 'react';

type SkillsHeaderProps = {
  isMobile: boolean;
  progress: number;
  reduceMotion: boolean;
};

function SkillsHeaderBase({ isMobile, progress, reduceMotion }: SkillsHeaderProps) {
  return (
    <div className="z-2 flex shrink-0 items-end justify-between gap-8 px-[1.1rem] pb-5 pt-8 md:px-10 md:pb-6 md:pt-10 xl:px-20">
      <div>
        <div className="split-line-wrap mb-2">
          <span className="split-line font-label text-[0.65rem] uppercase tracking-[0.35em] text-secondary">Expertise</span>
        </div>

        <h2
          className="fade-up font-headline text-[clamp(2.1rem,4.8vw,3.75rem)] font-bold italic leading-[0.95] text-surface"
          style={{ transitionDelay: '120ms' }}
        >
          Skills &amp; <span className="text-primary">Technologies.</span>
        </h2>
      </div>

      {!isMobile && (
        <div className="fade-up flex flex-col items-end gap-1.5" style={{ transitionDelay: '220ms' }}>
          <span className="font-label text-[0.6rem] uppercase tracking-[0.15em] text-outline">{Math.round(progress * 100)}%</span>

          <div className="relative h-px w-16 bg-(--outline-var)">
            <div
              className="absolute inset-0 bg-primary"
              style={{
                transformOrigin: 'left',
                transform: `scaleX(${progress})`,
                transition: reduceMotion ? 'none' : 'transform 0.1s linear',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export const SkillsHeader = memo(SkillsHeaderBase);