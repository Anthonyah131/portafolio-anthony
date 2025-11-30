import { useEffect, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
  RefreshSnapshot,
} from "@theatre/r3f";
import { getProject } from "@theatre/core";
import StarsField from "./StarsField";
import "../theatre/studio";

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

export default function HeroSceneEditor() {
  const project = getProject("Portfolio");
  const sheet = project.sheet("Scene");

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
            <StarsField count={2000} radius={800} />
          </e.group>

          <Suspense fallback={null}>
            <RefreshSnapshot />
            <HothPlanet />
          </Suspense>
        </SheetProvider>
      </Canvas>
    </div>
  );
}
