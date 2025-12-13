import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Carga rápida: completa en ~1 segundo
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Incremento constante para completar en ~1 segundo (100ms * 10 = 1000ms)
        return Math.min(prev + 10, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Salir inmediatamente después de completar
      setIsComplete(true);
      // Llamar al callback después de la animación de salida
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
    }
  }, [progress, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Contenido principal */}
      <div className="flex flex-col items-center gap-6">
        {/* Saludo */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-starwars tracking-widest text-center px-4">
          Welcome
        </h1>

        {/* Barra de progreso simple */}
        <div className="w-64 sm:w-80 md:w-96">
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Texto de carga */}
          <p className="text-center mt-4 text-xs sm:text-sm text-white/40 uppercase tracking-widest">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
