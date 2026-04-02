import { memo } from 'react';
import { useTranslation } from '../../../context/LanguageContext';

function AboutTitleBase() {
  const { t } = useTranslation();
  return (
    <h2 className="mb-6 font-headline text-4xl leading-tight text-surface italic font-bold sm:text-5xl lg:text-6xl">
      <span className="split-line-wrap block">
        <span className="split-line" style={{ transitionDelay: '80ms' }}>
          {t.about.title} <span className="text-primary">{t.about.titleHighlight}</span>
        </span>
      </span>
    </h2>
  );
}

export const AboutTitle = memo(AboutTitleBase);