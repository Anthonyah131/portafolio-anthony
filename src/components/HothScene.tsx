import { useGLTF } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";
import { useEffect } from "react";
import type { Object3D } from "three";

interface HothSceneProps {
  onShipHover: (hovering: boolean) => void;
}

/**
 * Componente que renderiza el planeta Hoth y detecta hover sobre las naves Snowspeeder
 */
export default function HothScene({ onShipHover }: HothSceneProps) {
  const { scene } = useGLTF("/models/hothPlanet.glb");

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

  const handlePointerEnter = (e: any) => {
    e.stopPropagation();
    const objectName = e.object?.name || "";
    
    if (
      objectName === "Snowspeeder01" ||
      objectName === "Snowspeeder02" ||
      objectName === "Snowspeeder03"
    ) {
      console.log("🚀 Hover ENTER en nave:", objectName);
      onShipHover(true);
    }
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    const objectName = e.object?.name || "";
    
    if (
      objectName === "Snowspeeder01" ||
      objectName === "Snowspeeder02" ||
      objectName === "Snowspeeder03"
    ) {
      console.log("🚀 Hover LEAVE de nave:", objectName);
      onShipHover(false);
    }
  };

  return (
    <e.group theatreKey="HothPlanet" position={[0, 0, 0]} scale={3}>
      {/* Glow del planeta */}
      <mesh scale={3.2}>
        <sphereBufferGeometry args={[1, 64, 64]} />
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
