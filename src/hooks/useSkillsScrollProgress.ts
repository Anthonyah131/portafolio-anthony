import { RefObject, useEffect, useRef, useState } from 'react';

export function useSkillsScrollProgress(wrapperRef: RefObject<HTMLDivElement | null>, isMobile: boolean) {
  const [progress, setProgress] = useState(0);
  const previousProgressRef = useRef(0);

  useEffect(() => {
    if (isMobile) {
      previousProgressRef.current = 0;
      setProgress(0);
      return;
    }

    const updateProgress = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = Math.max(1, wrapper.offsetHeight - window.innerHeight);
      const nextProgress = Math.max(0, Math.min(1, scrolled / maxScroll));

      if (Math.abs(nextProgress - previousProgressRef.current) > 0.001) {
        previousProgressRef.current = nextProgress;
        setProgress(nextProgress);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    const raf = window.requestAnimationFrame(updateProgress);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [isMobile, wrapperRef]);

  return progress;
}