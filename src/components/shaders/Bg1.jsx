import React from "react";
import { Canvas } from "@react-three/fiber";
import { useAspect } from "@react-three/drei";
import fragment from "./page1/fragment.glsl";
import vertex from "./page1/vertex.glsl";

export default function Bg1() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        className="w-full h-full"
        camera={{ fov: 50, position: [0, 0, 1.4] }}
      >
        <Wrapped />
      </Canvas>
    </div>
  );
}

export function Wrapped() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scale = useAspect(width, height, 1);
  return (
    <mesh scale={scale}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial fragmentShader={fragment} vertexShader={vertex} />
    </mesh>
  );
}
