import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useMemo } from "react";
import type { Object3D } from "three";

if (typeof window !== "undefined" && window.innerWidth >= 1024) {
  useGLTF.preload("/models/hothPlanet.glb");
}

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

  const snowspeeders = useMemo(() => {
    const ships: Object3D[] = [];
    scene.traverse((child: Object3D) => {
      if (
        child.name === "Snowspeeder01" ||
        child.name === "Snowspeeder02" ||
        child.name === "Snowspeeder03"
      ) {
        ships.push(child);
        child.userData.isInteractive = true;
      }
    });
    return ships;
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
      <mesh scale={3.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#6ec6ff" opacity={0.1} transparent />
      </mesh>

      <primitive
        object={scene}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />
    </GroupComponent>
  );
}
