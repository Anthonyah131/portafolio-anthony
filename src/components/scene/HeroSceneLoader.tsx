import { lazy, Suspense, useEffect, useState } from "react";

const HeroSceneDynamic = lazy(() => import("./HeroSceneDynamic"));

interface HeroSceneLoaderProps {
  editorMode?: boolean;
}

export default function HeroSceneLoader({ editorMode = false }: HeroSceneLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScreenSize = () => {
      setShouldLoad(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <HeroSceneDynamic editorMode={editorMode} />
    </Suspense>
  );
}

