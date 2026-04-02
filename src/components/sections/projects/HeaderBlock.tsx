import { memo } from 'react';
import { PROJECT_TABS, type Tab } from './constants';
import { TabButton } from './TabButton';

type HeaderBlockProps = {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
};

function HeaderBlockBase({ tab, onTabChange }: HeaderBlockProps) {
  return (
    <div className="section-header-stack">
      <div className="section-header-row">
        <div>
          <div className="split-line-wrap" style={{ marginBottom: '0.75rem' }}>
            <span className="split-line section-eyebrow">Selected Works // MMXXV</span>
          </div>

          <h2 className="projects-title">
            <div className="split-line-wrap">
              <span className="split-line" style={{ transitionDelay: '80ms' }}>
                Filmography.
              </span>
            </div>
          </h2>

          <p className="fade-up projects-subcopy" style={{ transitionDelay: '200ms' }}>
            A curated sequence of digital experiences - where code meets craft.
            Hover each poster to preview.
          </p>
        </div>

        <div className="fade-up projects-hover-hint" style={{ transitionDelay: '300ms' }}>
          <span className="projects-hover-line" />
          Hover to preview
        </div>
      </div>

      <div className="section-tabs-row">
        {PROJECT_TABS.map(item => (
          <TabButton key={item} tab={item} active={item === tab} onClick={() => onTabChange(item)} />
        ))}
      </div>
    </div>
  );
}

export const HeaderBlock = memo(HeaderBlockBase);
