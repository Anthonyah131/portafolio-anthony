import { useEffect, useState } from 'react';

type SkillsViewportState = {
  isMobile: boolean;
  reduceMotion: boolean;
  viewportWidth: number;
};

export function useSkillsViewport(): SkillsViewportState {
  const [state, setState] = useState<SkillsViewportState>({
    isMobile: false,
    reduceMotion: false,
    viewportWidth: 0,
  });

  useEffect(() => {
    const viewportMedia = window.matchMedia('(max-width: 767px)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMedia = () => {
      setState({
        isMobile: viewportMedia.matches,
        reduceMotion: motionMedia.matches,
        viewportWidth: window.innerWidth,
      });
    };

    updateMedia();
    viewportMedia.addEventListener('change', updateMedia);
    motionMedia.addEventListener('change', updateMedia);
    window.addEventListener('resize', updateMedia);

    return () => {
      viewportMedia.removeEventListener('change', updateMedia);
      motionMedia.removeEventListener('change', updateMedia);
      window.removeEventListener('resize', updateMedia);
    };
  }, []);

  return state;
}