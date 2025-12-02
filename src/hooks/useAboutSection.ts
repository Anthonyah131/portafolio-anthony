import { useEffect, useState } from 'react';

/**
 * Hook para detectar cuando estamos en la sección About
 * Usa IntersectionObserver para una detección precisa
 */
export function useAboutSection() {
  const [isInAboutSection, setIsInAboutSection] = useState(false);

  useEffect(() => {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inAbout = entry.isIntersecting && entry.intersectionRatio > 0.2;
          setIsInAboutSection(inAbout);
        });
      },
      { threshold: [0, 0.2, 0.5, 1] }
    );

    observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  return isInAboutSection;
}
