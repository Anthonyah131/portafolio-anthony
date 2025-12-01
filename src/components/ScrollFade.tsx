import { useEffect, useRef, useState } from "react";

interface ScrollFadeProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollFade({
  children,
  direction = "up",
  delay = 0,
  className = "",
  style = {},
}: ScrollFadeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optional: stop observing after animation triggers
            // observer.unobserve(entry.target);
          } else {
            // Fade out when scrolling away
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before element enters viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    
    switch (direction) {
      case "up":
        return "translate(0, 50px)";
      case "down":
        return "translate(0, -50px)";
      case "left":
        return "translate(50px, 0)";
      case "right":
        return "translate(-50px, 0)";
      default:
        return "translate(0, 50px)";
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
