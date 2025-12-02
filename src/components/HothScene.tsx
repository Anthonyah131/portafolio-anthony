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
    const snowspeeders: Object3D[] = [];

    scene.traverse((child: Object3D) => {
      if (
        child.name === "Snowspeeder01" ||
        child.name === "Snowspeeder02" ||
        child.name === "Snowspeeder03"
      ) {
        snowspeeders.push(child);
      }
    });

    snowspeeders.forEach((ship) => {
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
      if (!onPlanetHover) {
        onShipHover(true);
      }
    } else if (onPlanetHover) {
      onPlanetHover(true);
    }
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    const objectName = e.object?.name || "";

    if (
      (objectName === "Snowspeeder01" ||
        objectName === "Snowspeeder02" ||
        objectName === "Snowspeeder03") &&
      !onPlanetHover
    ) {
      onShipHover(false);
    }
  };

  // Usar el editable group si está disponible, sino usar group normal
  const GroupComponent = editableGroup || "group";
  const groupProps: any = editableGroup
    ? {
        theatreKey: "HothPlanet",
        ref: groupRef,
        position: [0, 0, 0] as [number, number, number],
        scale: 3,
      }
    : {
        ref: groupRef,
        position: [0, 0, 0] as [number, number, number],
        scale: 3,
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
