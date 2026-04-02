import { memo } from 'react';

type TimelineItem = {
  key: string;
  icon: string;
  title: string;
  primary: string;
  secondary: string;
  tertiary: string;
};

type AboutTimelineProps = {
  items: TimelineItem[];
};

function AboutTimelineBase({ items }: AboutTimelineProps) {
  return (
    <div className="fade-up mb-8 flex flex-col gap-5" style={{ transitionDelay: '320ms' }}>
      {items.map((item) => (
        <article key={item.key} className="flex items-start gap-4 rounded-2xl p-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-lg">
            {item.icon}
          </span>
          <div>
            <p className="mb-1 font-label text-xs uppercase tracking-widest text-secondary">{item.title}</p>
            <p className="font-body text-base font-medium text-surface">{item.primary}</p>
            <p className="font-body text-sm text-surface-muted">{item.secondary}</p>
            <p className="mt-1 font-label text-xs tracking-wide text-outline">{item.tertiary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export const AboutTimeline = memo(AboutTimelineBase);