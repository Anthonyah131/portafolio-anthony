import { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
  RefreshSnapshot,
} from "@theatre/r3f";
import { getProject } from "@theatre/core";
import StarsField from "./StarsField";
import animationState from "../data/animationState.json";

interface HeroSceneProps {
  editorMode?: boolean;
}

function ColoredLights() {
  const colors = [
    "#4a9eff",
    "#b794f6",
    "#00ff88",
    "#ffdd00",
    "#e20000",
  ];

  const lights = [];
  const numLights = 40;
  const radius = 25;

  for (let i = 0; i < numLights; i++) {
    const phi = Math.acos(-1 + (2 * i) / numLights);
    const theta = Math.sqrt(numLights * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    const color = colors[i % colors.length];
    const intensity = 1;

    lights.push(
      <pointLight
        key={i}
        position={[x, y, z]}
        color={color}
        intensity={intensity}
        distance={10}
        decay={1.5}
      />
    );
  }

  return <>{lights}</>;
}

function HothPlanet() {
  const { scene } = useGLTF("/models/hothPlanet.glb");

  return (
    <e.group theatreKey="HothPlanet" position={[0, 0, 0]} scale={3}>
      <mesh scale={3.2}>
        <sphereBufferGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#6ec6ff" opacity={0.1} transparent />
      </mesh>

      <primitive object={scene} />
    </e.group>
  );
}

export default function HeroScene({ editorMode = false }: HeroSceneProps) {
  const project = editorMode
    ? getProject("Portfolio")
    : getProject("Portfolio", { state: animationState });

  const sheet = project.sheet("Scene");

  useEffect(() => {
    if (editorMode) {
      import("../theatre/studio");
    }
  }, [editorMode]);

  // Scroll-based animation with smooth interpolation (only in display mode)
  // Timeline: 0s-Home, 3s-About, 6s-Skills, 9s-Projects, 12s-Experience, 15s-Contact
  useEffect(() => {
    if (editorMode) return;

    let currentPosition = 0;
    let targetPosition = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const scrollProgress =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const animationDuration = 15;
      targetPosition = scrollProgress * animationDuration;
    };

    const smoothUpdate = () => {
      // Lerp for smooth animation (0.1 = smoothing factor)
      currentPosition += (targetPosition - currentPosition) * 0.1;

      if (sheet && sheet.sequence) {
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
  }, [sheet, editorMode]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
        <SheetProvider sheet={sheet}>
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

          <color attach="background" args={["#070F19"]} />

          {editorMode && <OrbitControls makeDefault/>}

          <ambientLight intensity={0.1}  
          color="#5da8c3"/>

          <ColoredLights />

          <e.group theatreKey="Stars">
            <StarsField count={2000} radius={100} />
          </e.group>

          <Suspense fallback={null}>
            {editorMode && <RefreshSnapshot />}
            <HothPlanet />
          </Suspense>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
