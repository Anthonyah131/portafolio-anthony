import { useEffect, useState } from "react";

/**
 * Hook para detectar cuando estamos en la sección About
 * Usa IntersectionObserver para una detección precisa
 */
export function useAboutSection() {
  const [isInAboutSection, setIsInAboutSection] = useState(false);

  useEffect(() => {
    // Esperar a que el DOM esté completamente cargado
    const initObserver = () => {
      const aboutSection = document.getElementById("about");

      if (!aboutSection) {
        setTimeout(initObserver, 100);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const inAbout =
              entry.isIntersecting && entry.intersectionRatio > 0.2;
            setIsInAboutSection(inAbout);
          });
        },
        { threshold: [0, 0.2, 0.5, 1] }
      );

      observer.observe(aboutSection);

      // Trigger inicial manual
      const rect = aboutSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        const ratio = Math.min(
          (Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) /
            rect.height,
          1
        );
        if (ratio > 0.2) {
          setIsInAboutSection(true);
        }
      }

      return () => observer.disconnect();
    };

    const cleanup = initObserver();
    return cleanup;
  }, []);

  return isInAboutSection;
}
