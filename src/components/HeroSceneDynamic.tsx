import { useEffect, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import StarsField from "./StarsField";
import ColoredLights from "./ColoredLights";
import HothSceneDynamic from "./HothSceneDynamic";
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
        // Fallback: permitir que el canvas se renderice sin Theatre.js
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
      targetPosition = scrollProgress * 12; // animationDuration = 12
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
    if (!planetRotationEnabled && isHovering) {
      setPlanetRotationEnabled(true);
      console.log("🔓 Rotación habilitada (hover en planeta)");
    }
  };

  // Renderizar loading o fallback mientras Theatre.js se carga
  if (!theatreLoaded || !TheatreComponents) {
    return (
      <div className="w-full h-screen">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{
            position: [0, 0, 80],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          {/* Color de fondo */}
          <color attach="background" args={["#070F19"]} />

          {/* Luces */}
          <ambientLight intensity={0.1} color="#5da8c3" />
          <ColoredLights />

          {/* Estrellas */}
          <StarsField count={2000} radius={100} />

          {/* Planeta Hoth sin Theatre.js */}
          <Suspense fallback={null}>
            <group position={[0, 0, 0]}>
              <HothSceneDynamic
                onShipHover={setIsHoveringShip}
                onPlanetHover={isInContactSection ? handlePlanetHover : undefined}
              />
            </group>
          </Suspense>

          {/* OrbitControls en Contact */}
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

        {isInAboutSection && (
          <ProfileModal
            isOpen={isInAboutSection}
            isHoveringShip={isHoveringShip}
          />
        )}
      </div>
    );
  }

  const { PerspectiveCamera, RefreshSnapshot, editable: e, SheetProvider } = TheatreComponents;

  return (
    <div className="w-full h-screen">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop="always"
      >
        <SheetProvider sheet={sheet}>
          <PerspectiveCamera
            theatreKey="Camera"
            makeDefault={!planetRotationEnabled}
            position={[0, 0, 80]}
            fov={50}
            near={0.1}
            far={1000}
            attachArray={undefined}
            attachObject={undefined}
            attachFns={undefined}
          />

          {/* OrbitControls: solo activos en Contact Y después de hacer hover */}
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

          {/* Color de fondo */}
          <color attach="background" args={["#070F19"]} />

          {/* Luces */}
          <ambientLight intensity={0.1} color="#5da8c3" />
          <ColoredLights />

          {/* Estrellas */}
          <e.group theatreKey="Stars">
            <StarsField count={2000} radius={100} />
          </e.group>

          {/* Planeta Hoth y naves Snowspeeder */}
          <Suspense fallback={null}>
            {editorMode && <RefreshSnapshot />}
            <HothSceneDynamic
              onShipHover={setIsHoveringShip}
              onPlanetHover={isInContactSection ? handlePlanetHover : undefined}
            />
          </Suspense>
        </SheetProvider>
      </Canvas>

      {isInAboutSection && (
        <ProfileModal
          isOpen={isInAboutSection}
          isHoveringShip={isHoveringShip}
        />
      )}
    </div>
  );
}
