import { useGLTF } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";
import { useEffect, useRef, useState } from "react";
import type { Object3D } from "three";
import { useFrame } from "@react-three/fiber";

interface HothSceneProps {
  onShipHover: (hovering: boolean) => void;
  enableRotation: boolean;
  onRotationStart?: () => void;
  onRotationEnd?: () => void;
}

/**
 * Componente que renderiza el planeta Hoth y detecta hover sobre las naves Snowspeeder
 */
export default function HothScene({ 
  onShipHover, 
  enableRotation,
  onRotationStart,
  onRotationEnd 
}: HothSceneProps) {
  const { scene } = useGLTF("/models/hothPlanet.glb");
  const groupRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMouseX, setPreviousMouseX] = useState(0);
  const rotationSpeed = useRef(0);

  useEffect(() => {
    // Buscar las naves Snowspeeder en el modelo
    const snowspeeders: Object3D[] = [];
    
    scene.traverse((child: Object3D) => {
      if (
        child.name === "Snowspeeder01" ||
        child.name === "Snowspeeder02" ||
        child.name === "Snowspeeder03"
      ) {
        snowspeeders.push(child);
        console.log("✈️ Encontrada nave:", child.name);
      }
    });

    if (snowspeeders.length === 0) {
      console.warn("⚠️ No se encontraron naves Snowspeeder en el modelo");
    }

    // Agregar eventos de puntero a cada nave
    snowspeeders.forEach((ship) => {
      // @ts-ignore - Three.js permite agregar propiedades personalizadas
      ship.userData.isInteractive = true;
    });

  }, [scene]);

  // Animar rotación del planeta
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Si estamos arrastrando, no aplicar inercia aún
    if (isDragging) return;

    // Aplicar inercia (desaceleración gradual)
    if (Math.abs(rotationSpeed.current) > 0.001) {
      groupRef.current.rotation.y += rotationSpeed.current;
      rotationSpeed.current *= 0.95; // Factor de fricción
    } else {
      rotationSpeed.current = 0;
    }
  });

  const handlePointerEnter = (e: any) => {
    e.stopPropagation();
    const objectName = e.object?.name || "";
    
    // Solo manejar hover de naves en About section
    if (
      !enableRotation &&
      (objectName === "Snowspeeder01" ||
      objectName === "Snowspeeder02" ||
      objectName === "Snowspeeder03")
    ) {
      console.log("🚀 Hover ENTER en nave:", objectName);
      onShipHover(true);
    }
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    const objectName = e.object?.name || "";
    
    // Solo manejar hover de naves en About section
    if (
      !enableRotation &&
      (objectName === "Snowspeeder01" ||
      objectName === "Snowspeeder02" ||
      objectName === "Snowspeeder03")
    ) {
      console.log("🚀 Hover LEAVE de nave:", objectName);
      onShipHover(false);
    }
  };

  const handlePointerDown = (e: any) => {
    // Si no está habilitada la rotación, no hacer nada
    if (!enableRotation) return;
    
    console.log("🌍 Click detectado en planeta - enableRotation:", enableRotation);
    e.stopPropagation();
    setIsDragging(true);
    setPreviousMouseX(e.clientX);
    onRotationStart?.();
    console.log("🌍 Rotación del planeta habilitada - isDragging:", true);
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMouseX;
    
    if (groupRef.current) {
      // Rotar el planeta basado en el movimiento del mouse
      const rotationDelta = deltaX * 0.01;
      groupRef.current.rotation.y += rotationDelta;
      rotationSpeed.current = rotationDelta;
      console.log("🌍 Rotando planeta - deltaX:", deltaX, "rotation:", groupRef.current.rotation.y);
    }
    
    setPreviousMouseX(e.clientX);
  };

  const handlePointerUp = (e: any) => {
    if (!isDragging) return;
    
    console.log("🌍 Soltando planeta");
    setIsDragging(false);
    onRotationEnd?.();
  };

  return (
    <e.group 
      ref={groupRef}
      theatreKey="HothPlanet" 
      position={[0, 0, 0]} 
      scale={3}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Glow del planeta */}
      <mesh scale={3.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#6ec6ff" opacity={0.1} transparent />
      </mesh>

      {/* Modelo del planeta y naves con eventos de hover */}
      <primitive 
        object={scene} 
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />
    </e.group>
  );
}
