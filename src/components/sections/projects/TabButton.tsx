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
    <button onClick={onClick} className={`section-tab-button${active ? ' is-active' : ''}`}>
      {tab === 'projects' ? `Projects (${projects.length})` : `Certificates (${certificates.length})`}
    </button>
  );
}

export const TabButton = memo(TabButtonBase);
