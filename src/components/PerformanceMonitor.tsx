import { useEffect, useState } from "react";

interface PerformanceMetrics {
  fps: number;
  memory?: number;
  renderTime: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    renderTime: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!import.meta.env.DEV) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        const memory = (performance as any).memory
          ? Math.round((performance as any).memory.usedJSHeapSize / 1048576)
          : undefined;

        setMetrics({
          fps,
          memory,
          renderTime: 16.67,
        });
      }

      requestAnimationFrame(measureFPS);
    };

    measureFPS();

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "p" && e.ctrlKey) {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (!isVisible || !import.meta.env.DEV) return null;

  const getFPSColor = () => {
    if (metrics.fps >= 55) return "text-green-400";
    if (metrics.fps >= 30) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="fixed top-4 right-4 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 z-50 font-mono text-xs text-white">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-white/60">Performance Monitor</span>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/40 hover:text-white/80 ml-auto"
        >
          ×
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-white/60">FPS:</span>
          <span className={getFPSColor()}>{metrics.fps}</span>
        </div>
        {metrics.memory !== undefined && (
          <div className="flex justify-between gap-4">
            <span className="text-white/60">Memory:</span>
            <span className="text-white">{metrics.memory} MB</span>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <span className="text-white/60">Render:</span>
          <span className="text-white">{metrics.renderTime.toFixed(2)}ms</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-white/40">
        Press Ctrl+P to toggle
      </div>
    </div>
  );
}

