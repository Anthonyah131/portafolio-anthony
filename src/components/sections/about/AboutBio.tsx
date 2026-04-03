import { memo } from 'react';

type AboutBioProps = {
  bio: string[];
};

function AboutBioBase({ bio }: AboutBioProps) {
  return (
    <div className="fade-up mb-8 flex flex-col gap-4" style={{ transitionDelay: '200ms' }}>
      {bio.map((paragraph, index) => (
        <p
          key={index}
          className="max-w-[62ch] font-body text-base leading-7 text-surface-muted sm:text-lg sm:leading-8"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export const AboutBio = memo(AboutBioBase);