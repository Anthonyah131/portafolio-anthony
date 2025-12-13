import { useState } from "react";
import LoadingScreen from "../ui/LoadingScreen";
import PerformanceMonitor from "../PerformanceMonitor";
import { useScrollbarVisibility } from "../../hooks/useScrollbarVisibility";

interface PortfolioWrapperProps {
  children: React.ReactNode;
}

export default function PortfolioWrapper({ children }: PortfolioWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  useScrollbarVisibility();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <PerformanceMonitor />
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {children}
      </div>
    </>
  );
}
