import React, { useMemo, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Define the custom shader material
class VignetteMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        intensity: { value: 0.5 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float intensity;
        varying vec2 vUv;
        void main() {
          vec2 center = vec2(0.5, 0.48);
          float dist = distance(vUv, center);
          float vignette = smoothstep(0.4, 0.1, dist * 0.9);
          float vignetteIntensity = 1.0 - (vignette * intensity);
          gl_FragColor = vec4(1.0, 1.0, 1.0, vignetteIntensity);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
  }
}

// Extend Three.js with our custom shader material
extend({ VignetteMaterial });

// Create the WhiteVignette component
export default function WhiteVignette({ intensity = 0.5 }) {
  const { viewport } = useThree();

  const material = useMemo(() => new VignetteMaterial(), []);

  useEffect(() => {
    material.uniforms.intensity.value = intensity;
  }, [material, intensity]);

  useFrame(() => {
    material.uniforms.intensity.value = intensity;
  });

  return (
    <mesh renderOrder={1000} position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
