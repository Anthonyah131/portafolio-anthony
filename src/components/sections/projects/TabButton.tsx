import { memo } from 'react';
import { getProjects } from '../../../data/projects';
import { getCertificates } from '../../../data/certificates';
import type { Tab } from './constants';
import { useTranslation } from '../../../context/LanguageContext';

type TabButtonProps = {
  tab: Tab;
  active: boolean;
  onClick: () => void;
};

function TabButtonBase({ tab, active, onClick }: TabButtonProps) {
  const { t, locale } = useTranslation();
  const projects = getProjects(locale);
  const certificates = getCertificates(locale);
  return (
    <button
      onClick={onClick}
      className={`-mb-px border-b-2 px-7 py-3.5 font-label text-[0.7rem] font-semibold uppercase tracking-[0.15em] transition-[color,border-color] duration-300 ${
        active
          ? 'border-b-primary text-surface'
          : 'border-b-transparent text-outline hover:text-surface-muted'
      }`}
    >
      {tab === 'projects'
        ? `${t.projects.tabProjects} (${projects.length})`
        : `${t.projects.tabCertificates} (${certificates.length})`}
    </button>
  );
}

export const TabButton = memo(TabButtonBase);
