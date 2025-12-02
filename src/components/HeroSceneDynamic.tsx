import { useEffect, Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StarsField from "./StarsField";
import ColoredLights from "./ColoredLights";
import HothScene from "./HothScene";
import ProfileModal from "./ProfileModal";
import { useAboutSection } from "../hooks/useAboutSection";
import { useContactSection } from "../hooks/useContactSection";

interface HeroSceneProps {
  editorMode?: boolean;
}

export default function HeroSceneDynamic({
  editorMode = false,
}: HeroSceneProps) {
  const [isHoveringShip, setIsHoveringShip] = useState(false);
  const [planetRotationEnabled, setPlanetRotationEnabled] = useState(false);
  const [theatreLoaded, setTheatreLoaded] = useState(false);
  const [TheatreComponents, setTheatreComponents] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [sheet, setSheet] = useState<any>(null);
  const [mountKey, setMountKey] = useState(0);

  const isInAboutSection = useAboutSection();
  const isInContactSection = useContactSection();

  // Usar useCallback para mantener la referencia estable
  const handleShipHover = useCallback((isHovering: boolean) => {
    setIsHoveringShip(isHovering);
  }, []);

  const handlePlanetHover = useCallback(
    (isHovering: boolean) => {
      if (isInContactSection && isHovering && !planetRotationEnabled) {
        setTimeout(() => {
          setPlanetRotationEnabled(true);
        }, 100);
      }
    },
    [isInContactSection, planetRotationEnabled]
  );

  // Forzar re-mount después de carga de Theatre.js
  useEffect(() => {
    if (theatreLoaded) {
      setMountKey((prev) => prev + 1);
    }
  }, [theatreLoaded]);

  // Cargar Theatre.js dinámicamente solo en el cliente
  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;

    async function loadTheatre() {
      try {
        const [core, r3f, animationState] = await Promise.all([
          import("@theatre/core"),
          import("@theatre/r3f"),
          import("../data/animationState.json"),
        ]);

        if (!mounted) return;

        // Cargar studio solo en modo editor
        if (editorMode) {
          await import("../theatre/studio");
        }

        const proj = editorMode
          ? core.getProject("Portfolio")
          : core.getProject("Portfolio", { state: animationState.default });

        const sh = proj.sheet("Scene");

        setProject(proj);
        setSheet(sh);
        setTheatreComponents({
          PerspectiveCamera: r3f.PerspectiveCamera,
          RefreshSnapshot: r3f.RefreshSnapshot,
          editable: r3f.editable,
          SheetProvider: r3f.SheetProvider,
        });
        setTheatreLoaded(true);
      } catch (error) {
        console.error("Error loading Theatre.js:", error);
        setTheatreLoaded(false);
      }
    }

    loadTheatre();

    return () => {
      mounted = false;
    };
  }, [editorMode]);

  // Sincronizar scroll con Theatre.js
  useEffect(() => {
    if (editorMode || !sheet || !theatreLoaded) return;

    let currentPosition = 0;
    let targetPosition = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const scrollProgress =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      targetPosition = scrollProgress * 12;
    };

    const smoothUpdate = () => {
      currentPosition += (targetPosition - currentPosition) * 0.1;

      if (sheet.sequence) {
        sheet.sequence.position = currentPosition;
      }

      animationFrameId = requestAnimationFrame(smoothUpdate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    smoothUpdate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sheet, editorMode, theatreLoaded]);

  // Reiniciar rotación del planeta al salir de Contact
  useEffect(() => {
    if (!isInContactSection && planetRotationEnabled) {
      setPlanetRotationEnabled(false);
    }
  }, [isInContactSection, planetRotationEnabled]);

  const showProfileModal = isInAboutSection && isHoveringShip;

  // Renderizar fallback mientras Theatre.js se carga
  if (!theatreLoaded || !TheatreComponents) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          cursor: showProfileModal ? "pointer" : "default",
        }}
      >
        <ProfileModal show={showProfileModal} />

        <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
          <color attach="background" args={["#070F19"]} />
          <ambientLight intensity={0.1} color="#5da8c3" />
          <ColoredLights />

          <group>
            <StarsField count={2000} radius={100} />
          </group>

          <Suspense fallback={null}>
            <HothScene
              key="hoth-fallback"
              onShipHover={handleShipHover}
              onPlanetHover={isInContactSection ? handlePlanetHover : undefined}
              editableGroup={undefined}
            />
          </Suspense>

          {planetRotationEnabled && (
            <OrbitControls
              makeDefault={true}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.5}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
              target={[0, 0, 0]}
              minDistance={60}
            />
          )}
        </Canvas>
      </div>
    );
  }

  const {
    PerspectiveCamera,
    RefreshSnapshot,
    editable: e,
    SheetProvider,
  } = TheatreComponents;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        cursor: showProfileModal ? "pointer" : "default",
      }}
    >
      <ProfileModal show={showProfileModal} />

      <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
        <SheetProvider sheet={sheet}>
          <PerspectiveCamera
            theatreKey="Camera"
            makeDefault={!planetRotationEnabled}
            position={[0, 8.653, 94.21300000000018]}
            fov={45}
            near={0.1}
            far={2000}
            attachArray={undefined}
            attachObject={undefined}
            attachFns={undefined}
          />

          {planetRotationEnabled && (
            <OrbitControls
              makeDefault={true}
              enableDamping
              dampingFactor={0.05}
              rotateSpeed={0.5}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
              target={[0, 0, 0]}
              minDistance={60}
            />
          )}

          <color attach="background" args={["#070F19"]} />
          <ambientLight intensity={0.1} color="#5da8c3" />
          <ColoredLights />

          <e.group theatreKey="Stars">
            <StarsField count={2000} radius={100} />
          </e.group>

          <Suspense fallback={null}>
            {editorMode && <RefreshSnapshot />}
            <HothScene
              key={`hoth-theatre-${mountKey}`}
              onShipHover={handleShipHover}
              onPlanetHover={isInContactSection ? handlePlanetHover : undefined}
              editableGroup={e.group}
            />
          </Suspense>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
