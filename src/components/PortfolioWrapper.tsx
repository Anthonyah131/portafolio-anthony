import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

interface PortfolioWrapperProps {
  children: React.ReactNode;
}

export default function PortfolioWrapper({ children }: PortfolioWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
}
