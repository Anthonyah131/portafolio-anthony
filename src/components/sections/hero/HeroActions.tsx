import { memo } from 'react';
import { ArrowUpRight, Download, Mail } from 'lucide-react';
import { useTranslation } from '../../../context/LanguageContext';

type HeroActionsProps = {
  cvLink: string;
};

function HeroActionsBase({ cvLink }: HeroActionsProps) {
  const { t } = useTranslation();
  const cvFileName = cvLink.split('/').pop() || 'Anthony_Avila_CV.pdf';

  return (
    <div className="fade-up mt-1 flex flex-col gap-3 pt-3 sm:flex-row sm:flex-wrap" style={{ transitionDelay: '520ms' }}>
      <a
        href="#contact"
        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,var(--color-primary),#9dff84)] p-4 font-label text-xs font-bold uppercase tracking-widest text-on-primary shadow-[0_16px_38px_rgba(67,254,109,0.22)] transition-[transform,background,box-shadow,color,border-color] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(67,254,109,0.28)] sm:w-auto"
      >
        <Mail size={16} strokeWidth={1.8} />
        {t.hero.hireMe}
        <ArrowUpRight size={15} strokeWidth={2} />
      </a>
      <a
        href={cvLink}
        download={cvFileName}
        data-astro-reload
        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-[rgba(133,149,130,0.24)] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-4 font-label text-xs font-bold uppercase tracking-widest text-surface transition-[transform,background,box-shadow,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-[rgba(133,149,130,0.45)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] sm:w-auto"
      >
        <Download size={16} strokeWidth={1.8} />
        {t.hero.downloadCV}
      </a>
    </div>
  );
}

export const HeroActions = memo(HeroActionsBase);
