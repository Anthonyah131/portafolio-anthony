import { memo } from 'react';

type AboutInterestsProps = {
  interests: string[];
};

function AboutInterestsBase({ interests }: AboutInterestsProps) {
  return (
    <div className="fade-up" style={{ transitionDelay: '420ms' }}>
      <p className="mb-3 font-label text-xs uppercase tracking-widest text-secondary">Interests & Hobbies</p>
      <div className="stagger flex flex-wrap gap-2">
        {interests.map((item) => (
          <span
            key={item}
            className="rounded-full border border-transparent bg-high px-3 py-1 font-label text-xs font-medium text-surface-muted transition-colors duration-300 hover:border-[rgba(255,183,135,0.35)] hover:text-secondary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export const AboutInterests = memo(AboutInterestsBase);