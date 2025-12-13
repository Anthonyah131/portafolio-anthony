import { useState, useEffect } from "react";

export type PerformanceMode = "high" | "medium" | "low";

/**
 * Hook para detectar el rendimiento del dispositivo y ajustar la calidad
 * Detecta FPS y ajusta automáticamente la calidad de renderizado
 */
export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>("high");

  useEffect(() => {
    // Detectar hardware básico
    const isLowEndDevice = 
      navigator.hardwareConcurrency <= 4 ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4);

    if (isLowEndDevice) {
      setMode("low");
      return;
    }

    // Medir FPS durante los primeros segundos
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;
    const measureDuration = 3000; // 3 segundos
    const startTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
      }

      if (elapsed < measureDuration) {
        requestAnimationFrame(measureFPS);
      } else {
        // Determinar modo basado en FPS promedio
        if (fps < 30) {
          setMode("low");
        } else if (fps < 50) {
          setMode("medium");
        } else {
          setMode("high");
        }
      }
    };

    requestAnimationFrame(measureFPS);
  }, []);

  return mode;
}

/**
 * Obtiene los valores de configuración según el modo de rendimiento
 */
export function getPerformanceConfig(mode: PerformanceMode) {
  switch (mode) {
    case "low":
      return {
        starsCount: 600,
        lightsCount: 10,
        glowSegments: 16,
        antialias: false,
      };
    case "medium":
      return {
        starsCount: 900,
        lightsCount: 15,
        glowSegments: 24,
        antialias: true,
      };
    case "high":
    default:
      return {
        starsCount: 1200,
        lightsCount: 20,
        glowSegments: 32,
        antialias: true,
      };
  }
}

