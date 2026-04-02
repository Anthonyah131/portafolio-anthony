import { memo } from 'react';

function HeroScrollHintBase() {
  return (
    <div
      className="fade-up mt-8 inline-flex items-center justify-start gap-3 font-label text-xs uppercase tracking-widest text-outline lg:absolute lg:bottom-16 lg:right-8 lg:mt-0"
      style={{ transitionDelay: '640ms' }}
    >
      <span>Scroll to explore</span>
      <span className="block h-12 w-px animate-[scrollLine_2s_ease-in-out_infinite] bg-[linear-gradient(to_bottom,var(--color-surface-muted),transparent)]" />
    </div>
  );
}

export const HeroScrollHint = memo(HeroScrollHintBase);
