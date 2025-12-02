import { useEffect, useState } from "react";

/**
 * Hook para detectar si estamos en la sección Contact
 */
export function useContactSection() {
  const [isInContactSection, setIsInContactSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById("contact");
      if (!contactSection) return;

      const rect = contactSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Consideramos que estamos en Contact si la sección está visible
      // al menos un 30% en el viewport
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visiblePercentage = visibleHeight / windowHeight;

      setIsInContactSection(visiblePercentage > 0.3);
    };

    // Ejecutar al montar
    handleScroll();

    // Escuchar scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isInContactSection;
}
