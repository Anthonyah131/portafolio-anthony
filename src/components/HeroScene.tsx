import { useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
} from "@theatre/r3f";
import { getProject } from "@theatre/core";
import StarsField from "./StarsField";
import animationState from "../data/animationState.json";

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

export default function HeroScene() {
  // Load animation from JSON only
  const project = getProject("Portfolio", {
    state: animationState,
  });
  const sheet = project.sheet("Scene");

  // Scroll-based animation with smooth interpolation
  // Timeline: 0s-Home, 3s-About, 6s-Skills, 9s-Projects, 12s-Experience, 15s-Contact
  useEffect(() => {
    let currentPosition = 0;
    let targetPosition = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    smoothUpdate();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sheet]);

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

          <color attach="background" args={["#000"]} />

          <ambientLight intensity={1.2} />
          <e.directionalLight
            theatreKey="MainLight"
            intensity={1.5}
            position={[10, 10, 5]}
            castShadow
          />

          <e.group theatreKey="Stars">
            <StarsField count={2000} radius={100} />
          </e.group>

          <Suspense fallback={null}>
            <HothPlanet />
          </Suspense>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
