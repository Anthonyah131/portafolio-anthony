import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Object3D } from "three";

interface HothSceneProps {
  onShipHover: (isHovering: boolean) => void;
  onPlanetHover?: (isHovering: boolean) => void;
  editableGroup?: any;
}

/**
 * Componente que renderiza el planeta Hoth y detecta hover sobre las naves Snowspeeder
 */
export default function HothScene({
  onShipHover,
  onPlanetHover,
  editableGroup,
}: HothSceneProps) {
  const { scene } = useGLTF("/models/hothPlanet.glb");
  const groupRef = useRef<any>(null);

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

    console.log("👉 PointerEnter en:", objectName);

    // Si es una nave
    if (
      objectName === "Snowspeeder01" ||
      objectName === "Snowspeeder02" ||
      objectName === "Snowspeeder03"
    ) {
      // Solo manejar hover de naves si NO estamos en modo planeta (Contact)
      if (!onPlanetHover) {
        console.log("🚀 Hover ENTER en nave:", objectName);
        onShipHover(true);
      } else {
        console.log("✈️ Nave ignorada (estamos en Contact)");
      }
    }
    // Si NO es una nave, es el planeta - activar controles de rotación
    else if (onPlanetHover) {
      console.log("🌍 Hover sobre planeta - activando controles");
      onPlanetHover(true);
    }
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    const objectName = e.object?.name || "";

    // Solo manejar salida de hover de naves si NO estamos en Contact
    if (
      (objectName === "Snowspeeder01" ||
        objectName === "Snowspeeder02" ||
        objectName === "Snowspeeder03") &&
      !onPlanetHover
    ) {
      console.log("🚀 Hover LEAVE de nave:", objectName);
      onShipHover(false);
    }
    // No desactivamos los controles del planeta al salir del hover
    // Solo se desactivan al salir de la sección Contact
  };

  // Usar el editable group si está disponible, sino usar group normal
  const GroupComponent = editableGroup || 'group';
  const groupProps: any = editableGroup
    ? { 
        theatreKey: "HothPlanet",
        ref: groupRef,
        position: [0, 0, 0] as [number, number, number],
        scale: 3
      }
    : { 
        ref: groupRef,
        position: [0, 0, 0] as [number, number, number],
        scale: 3
      };

  return (
    <GroupComponent {...groupProps}>
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
    </GroupComponent>
  );
}
