/**
 * Componente de luces de colores en formación Fibonacci
 */
export default function ColoredLights() {
  const colors = ["#4a9eff", "#b794f6", "#00ff88", "#ffdd00", "#e20000"];

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
