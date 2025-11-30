import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";

export default function StarsField({ count = 3000, radius = 150 }) {
  const positions = useMemo(() => {
    const pts = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius;

      pts.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }

    return new Float32Array(pts);
  }, [count, radius]);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        color="#ffffff"
        size={0.06}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}
