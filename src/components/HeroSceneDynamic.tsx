import { useEffect, Suspense, useState } from "react";
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

export default function HeroSceneDynamic({ editorMode = false }: HeroSceneProps) {
  const [isHoveringShip, setIsHoveringShip] = useState(false);
  const [planetRotationEnabled, setPlanetRotationEnabled] = useState(false);
  const [theatreLoaded, setTheatreLoaded] = useState(false);
  const [TheatreComponents, setTheatreComponents] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [sheet, setSheet] = useState<any>(null);
  
  const isInAboutSection = useAboutSection();
  const isInContactSection = useContactSection();

  // Debug logging
  useEffect(() => {
    console.log('🔍 isInAboutSection:', isInAboutSection, 'isHoveringShip:', isHoveringShip);
  }, [isInAboutSection, isHoveringShip]);

  // Cargar Theatre.js dinámicamente solo en el cliente
  useEffect(() => {
    if (typeof window === 'undefined') return;

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    smoothUpdate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sheet, editorMode, theatreLoaded]);

  // Reiniciar rotación del planeta al salir de Contact
  useEffect(() => {
    if (!isInContactSection && planetRotationEnabled) {
      setPlanetRotationEnabled(false);
      console.log("🔒 Rotación deshabilitada (salió de Contact)");
    }
  }, [isInContactSection, planetRotationEnabled]);

  const handlePlanetHover = (isHovering: boolean) => {
    if (isInContactSection && isHovering && !planetRotationEnabled) {
      setTimeout(() => {
        setPlanetRotationEnabled(true);
        console.log("🔓 Rotación del planeta activada por hover");
      }, 100);
    }
  };

  // Mostrar modal solo cuando estamos en About Y hay hover sobre una nave
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
              onShipHover={setIsHoveringShip}
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

  const { PerspectiveCamera, RefreshSnapshot, editable: e, SheetProvider } = TheatreComponents;

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
              onShipHover={setIsHoveringShip}
              onPlanetHover={isInContactSection ? handlePlanetHover : undefined}
              editableGroup={e.group}
            />
          </Suspense>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
