import { useEffect, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, RefreshSnapshot } from "@theatre/r3f";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { getProject } from "@theatre/core";
import StarsField from "./StarsField";
import ColoredLights from "./ColoredLights";
import HothScene from "./HothScene";
import ProfileModal from "./ProfileModal";
import { useAboutSection } from "../hooks/useAboutSection";
import { useContactSection } from "../hooks/useContactSection";
import { useTheatreScroll } from "../hooks/useTheatreScroll";
import animationState from "../data/animationState.json";
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

  // Cargar Theatre.js Studio en modo editor
  useEffect(() => {
    if (editorMode) {
      import("../theatre/studio");
    }
  }, [editorMode]);

  // Sincronizar scroll con animación Theatre.js
  useTheatreScroll({
    sheet,
    editorMode,
    animationDuration: 12,
  });

  // Deshabilitar rotación del planeta si salimos de Contact
  useEffect(() => {
    if (!isInContactSection && planetRotationEnabled) {
      setPlanetRotationEnabled(false);
      console.log("🔒 Rotación del planeta deshabilitada (fuera de Contact)");
    }
  }, [isInContactSection, planetRotationEnabled]);

  // Mostrar modal solo cuando estamos en About Y hay hover sobre una nave
  const showProfileModal = isInAboutSection && isHoveringShip;

  const handleRotationStart = () => {
    if (isInContactSection) {
      setPlanetRotationEnabled(true);
      console.log("🔓 Rotación del planeta activada");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        cursor: showProfileModal ? "pointer" : planetRotationEnabled ? "grab" : "default",
      }}
    >
      {/* Modal de perfil */}
      <ProfileModal show={showProfileModal} />

      {/* Canvas 3D */}
      <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
        <SheetProvider sheet={sheet}>
          {/* Cámara */}
          <PerspectiveCamera
            theatreKey="Camera"
            makeDefault
            position={[12, 12, 12]}
            fov={45}
            near={0.1}
            far={2000}
            attachArray={undefined}
            attachObject={undefined}
            attachFns={undefined}
          />

          {/* OrbitControls para modo editor */}
          {/* {editorMode && (
            <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
          )} */}

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
            <HothScene 
              onShipHover={setIsHoveringShip}
              enableRotation={isInContactSection}
              onRotationStart={handleRotationStart}
              onRotationEnd={() => console.log("🎯 Drag finalizado")}
            />
          </Suspense>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
