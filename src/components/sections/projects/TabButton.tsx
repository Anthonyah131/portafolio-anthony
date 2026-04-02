import { memo } from 'react';
import { projects } from '../../../data/projects';
import { certificates } from '../../../data/certificates';
import type { Tab } from './constants';

type TabButtonProps = {
  tab: Tab;
  active: boolean;
  onClick: () => void;
};

function TabButtonBase({ tab, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`mb-[-1px] border-b-2 px-7 py-3.5 font-label text-[0.7rem] font-semibold uppercase tracking-[0.15em] transition-[color,border-color] duration-300 ${
        active
          ? 'border-b-primary text-surface'
          : 'border-b-transparent text-outline hover:text-surface-muted'
      }`}
    >
      {tab === 'projects' ? `Projects (${projects.length})` : `Certificates (${certificates.length})`}
    </button>
  );
}

export const TabButton = memo(TabButtonBase);
