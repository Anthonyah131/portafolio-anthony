import { useEffect, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, RefreshSnapshot } from "@theatre/r3f";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import StarsField from "./StarsField";
import ColoredLights from "./ColoredLights";
import HothScene from "./HothScene";
import ProfileModal from "../ui/ProfileModal";
import { useAboutSection } from "../../hooks/useAboutSection";
import { useContactSection } from "../../hooks/useContactSection";
import { useTheatreScroll } from "../../hooks/useTheatreScroll";
import animationState from "../../data/animationState.json";
import { OrbitControls } from "@react-three/drei";

interface HeroSceneProps {
  editorMode?: boolean;
}

export default function HeroScene({ editorMode = false }: HeroSceneProps) {
  const [isHoveringShip, setIsHoveringShip] = useState(false);
  const [planetRotationEnabled, setPlanetRotationEnabled] = useState(false);
  const isInAboutSection = useAboutSection();
  const isInContactSection = useContactSection();

  const project = editorMode
    ? getProject("Portfolio")
    : getProject("Portfolio", { state: animationState });

  const sheet = project.sheet("Scene");

  useEffect(() => {
    if (editorMode) {
      import("../../theatre/studio");
    }
  }, [editorMode]);

  useTheatreScroll({
    sheet,
    editorMode,
    animationDuration: 12,
  });

  useEffect(() => {
    if (!isInContactSection && planetRotationEnabled) {
      setPlanetRotationEnabled(false);
    }
  }, [isInContactSection, planetRotationEnabled]);

  const handlePlanetHover = (isHovering: boolean) => {
    if (isInContactSection && isHovering && !planetRotationEnabled) {
      setTimeout(() => {
        setPlanetRotationEnabled(true);
      }, 100);
    }
  };

  const showProfileModal = isInAboutSection && isHoveringShip;

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

      <Canvas gl={{ antialias: true, alpha: false }}>
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
            <StarsField count={1200} radius={100} />
          </e.group>

          <Suspense fallback={null}>
            {editorMode && <RefreshSnapshot />}
            <HothScene
              onShipHover={setIsHoveringShip}
              onPlanetHover={isInContactSection ? handlePlanetHover : undefined}
            />
          </Suspense>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
