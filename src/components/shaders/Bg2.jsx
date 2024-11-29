import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAspect } from "@react-three/drei";
import fragment from "./page2/fragment.glsl";
import vertex from "./page2/vertex.glsl";
import * as THREE from "three";

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

  const uniforms = useRef({
    iTime: {
      type: "f",
      value: 1.0,
    },
    iResolution: {
      type: "v2",
      value: new THREE.Vector2(10, 10),
    },
  });
  const meshRef = useRef(null);

  useFrame((state) => {
    let tick = state.clock.getElapsedTime();
    meshRef.current.material.uniforms.iTime.value = tick + 20;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
