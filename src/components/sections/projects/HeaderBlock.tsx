import { memo } from 'react';
import { PROJECT_TABS, type Tab } from './constants';
import { TabButton } from './TabButton';

type HeaderBlockProps = {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
};

function HeaderBlockBase({ tab, onTabChange }: HeaderBlockProps) {
  return (
    <div className="mb-12 flex flex-col gap-8 lg:mb-14">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="split-line-wrap mb-3">
            <span className="split-line font-label text-[0.68rem] uppercase tracking-[0.35em] text-secondary">
              Selected Works // MMXXV
            </span>
          </div>

          <h2 className="font-headline text-4xl font-bold italic leading-[0.95] tracking-[-0.03em] text-surface sm:text-5xl lg:text-[3.75rem]">
            <div className="split-line-wrap">
              <span className="split-line" style={{ transitionDelay: '80ms' }}>
                Filmography.
              </span>
            </div>
          </h2>

          <p className="fade-up mt-3 max-w-[44ch] text-base leading-[1.7] text-surface-muted" style={{ transitionDelay: '200ms' }}>
            A curated sequence of digital experiences - where code meets craft.
            Hover each poster to preview.
          </p>
        </div>

        <div className="fade-up flex shrink-0 items-center gap-3 font-label text-[0.65rem] uppercase tracking-[0.2em] text-outline" style={{ transitionDelay: '300ms' }}>
          <span className="block h-px w-10 bg-outline" />
          Hover to preview
        </div>
      </div>

      <div className="flex gap-0 border-b border-(--outline-var)">
        {PROJECT_TABS.map(item => (
          <TabButton key={item} tab={item} active={item === tab} onClick={() => onTabChange(item)} />
        ))}
      </div>
    </div>
  );
}

export const HeaderBlock = memo(HeaderBlockBase);
