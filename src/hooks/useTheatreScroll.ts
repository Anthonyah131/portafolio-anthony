import { useEffect } from 'react';
import type { ISheet } from '@theatre/core';

interface UseTheatreScrollOptions {
  sheet: ISheet | null;
  editorMode: boolean;
  animationDuration?: number;
}

/**
 * Hook para sincronizar el scroll con Theatre.js
 * Controla la animación 3D basada en el scroll de la página
 */
export function useTheatreScroll({ 
  sheet, 
  editorMode, 
  animationDuration = 12 
}: UseTheatreScrollOptions) {
  useEffect(() => {
    if (editorMode || !sheet) return;

    let currentPosition = 0;
    let targetPosition = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const scrollProgress =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      targetPosition = scrollProgress * animationDuration;
    };

    const smoothUpdate = () => {
      // Lerp for smooth animation (0.1 = smoothing factor)
      currentPosition += (targetPosition - currentPosition) * 0.1;

      if (sheet.sequence) {
        sheet.sequence.position = currentPosition;
      }

      animationFrameId = requestAnimationFrame(smoothUpdate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    smoothUpdate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sheet, editorMode, animationDuration]);
}
