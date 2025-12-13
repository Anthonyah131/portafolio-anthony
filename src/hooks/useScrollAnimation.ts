import { useEffect } from "react";

/**
 * Hook para activar animaciones al hacer scroll
 * Basado en W3.CSS y Tailwind animations
 * Funciona en desktop y móviles
 *
 * @example
 * useScrollAnimation();
 *
 * // En tu JSX:
 * <div data-scroll="fade-up">Contenido</div>
 * <div data-scroll="slide-left">Contenido</div>
 * <div data-scroll="zoom">Contenido</div>
 */
export function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-scroll]");

    // Ajustar threshold según el tamaño de pantalla
    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 0.2 : 0.3;
    const rootMargin = isMobile ? "0px 0px -50px 0px" : "0px";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("is-hidden");
          } else {
            // Remover clase para repetir animación cuando vuelves
            entry.target.classList.remove("is-visible");
            entry.target.classList.add("is-hidden");
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
