import { useEffect, useRef } from "react";
import type { ISheet } from "@theatre/core";

interface UseTheatreScrollOptions {
  sheet: ISheet | null;
  editorMode: boolean;
  animationDuration?: number;
}

/**
 * Hook para sincronizar el scroll con Theatre.js
 * Controla la animación 3D basada en el scroll de la página
 * Optimizado con throttling y mejor gestión de RAF
 */
export function useTheatreScroll({
  sheet,
  editorMode,
  animationDuration = 12,
}: UseTheatreScrollOptions) {
  const rafIdRef = useRef<number>();
  const lastScrollTimeRef = useRef<number>(0);
  const isUpdatingRef = useRef<boolean>(false);

  useEffect(() => {
    if (editorMode || !sheet) return;

    let currentPosition = 0;
    let targetPosition = 0;
    const scrollThrottle = 16; // ~60fps max scroll updates

    const handleScroll = () => {
      const now = performance.now();
      // Throttle scroll updates
      if (now - lastScrollTimeRef.current < scrollThrottle) return;
      lastScrollTimeRef.current = now;

      const scrollProgress =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      targetPosition = scrollProgress * animationDuration;
    };

    const smoothUpdate = () => {
      const diff = targetPosition - currentPosition;
      const absDiff = Math.abs(diff);

      // Solo actualizar si hay diferencia significativa (optimización)
      if (absDiff > 0.001) {
        // Lerp adaptativo: más rápido cuando la diferencia es grande
        const lerpFactor = absDiff > 1 ? 0.15 : 0.08;
        currentPosition += diff * lerpFactor;

        if (sheet.sequence) {
          sheet.sequence.position = currentPosition;
        }

        rafIdRef.current = requestAnimationFrame(smoothUpdate);
        isUpdatingRef.current = true;
      } else {
        // Detener actualizaciones cuando está cerca del target
        isUpdatingRef.current = false;
        if (sheet.sequence) {
          sheet.sequence.position = targetPosition;
        }
      }
    };

    const startUpdateLoop = () => {
      if (!isUpdatingRef.current) {
        isUpdatingRef.current = true;
        smoothUpdate();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", startUpdateLoop, { passive: true });
    handleScroll();
    startUpdateLoop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", startUpdateLoop);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      isUpdatingRef.current = false;
    };
  }, [sheet, editorMode, animationDuration]);
}
