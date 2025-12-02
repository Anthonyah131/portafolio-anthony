import { useEffect } from "react";

/**
 * Hook para activar animaciones al hacer scroll
 * Basado en W3.CSS y Tailwind animations
 *
 * Las animaciones solo se activan en desktop (>= 1024px)
 * En mobile, el contenido se muestra sin animación
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
    // Solo activar en desktop
    if (window.innerWidth < 1024) return;

    const elements = document.querySelectorAll("[data-scroll]");

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
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
