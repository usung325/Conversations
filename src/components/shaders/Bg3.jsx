import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAspect } from "@react-three/drei";
import fragment from "./page3/fragment.glsl";
import vertex from "./page3/vertex.glsl";
import * as THREE from "three";
import { useControls, button, Leva } from "leva";

export default function Bg3({ instanceId = "background3" }) {
  return (
    <div className="w-screen h-screen overscroll-none">
      {/* <Leva hidden={true} /> */}
      <Canvas
        className="w-full h-full"
        camera={{ fov: 50, position: [0, 0, 1.4] }}
      >
        <Wrapped instanceId={instanceId} />
      </Canvas>
    </div>
  );
}

export function Wrapped({ instanceId }) {
  const freqVal = 11.4;
  const ampVal = 21.4;
  const speedVal = 1.29;
  const lowerVal = 1.0;
  const sinVal = 13.5;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scale = useAspect(width, height, 1);

  // Function to generate a random hex color
  const getRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  const [
    { color1, color2, color3, color4, color5, color6, ...otherControls },
    set,
  ] = useControls(
    instanceId,
    () => ({
      color1: "#74d5b6", // dark blue
      color2: "#db94f4", // light blue
      color3: "#e5afe7", // very light blue
      color4: "#9f11c0", // medium blue
      color5: "#000000", // red
      color6: "#a5314a", // purple

      // Add randomize button
      randomize: button(() => {
        set({
          color1: getRandomColor(),
          color2: getRandomColor(),
          color3: getRandomColor(),
          color4: getRandomColor(),
          color5: getRandomColor(),
          color6: getRandomColor(),
        });
      }),

      frequency: { value: freqVal, min: 0.1, max: 30.0, step: 0.1 },
      amplitude: { value: ampVal, min: 0.1, max: 100.0, step: 0.1 },
      speed: { value: speedVal, min: 0.01, max: 5.0, step: 0.01 },
      timeMultiplier: {
        value: lowerVal,
        min: 0.001,
        max: 1.0,
        step: 0.01,
        label: "speed-lower",
      },
      mixLayer1: {
        value: { a: 0.5, b: -0.3 },
        min: -0.9,
        max: 0.9,
        step: 0.1,
      },
      mixLayer2: {
        value: { a: -0.9, b: 0.9 },
        min: -0.9,
        max: 0.9,
        step: 0.1,
      },
      sinMultiplier: { value: sinVal, min: 0.1, max: 30.0, step: 0.1 },
    }),
    {
      folder: `Background Controls ${instanceId}`,
      collapsed: true,
    }
  );

  const uniforms = useRef({
    iTime: {
      type: "f",
      value: 1.0,
    },
    iResolution: {
      type: "v2",
      value: new THREE.Vector2(10, 10),
    },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uColor3: { value: new THREE.Color(color3) },
    uColor4: { value: new THREE.Color(color4) },
    uColor5: { value: new THREE.Color(color5) },
    uColor6: { value: new THREE.Color(color6) },

    // New uniforms
    uFrequency: { value: otherControls.frequency },
    uAmplitude: { value: otherControls.amplitude },
    uSpeed: { value: otherControls.speed },
    uMixLayer1A: { value: otherControls.mixLayer1.a },
    uMixLayer1B: { value: otherControls.mixLayer1.b },
    uMixLayer2A: { value: otherControls.mixLayer2.a },
    uMixLayer2B: { value: otherControls.mixLayer2.b },
    uSinMultiplier: { value: otherControls.sinMultiplier },
    uTimeMultiplier: { value: otherControls.timeMultiplier },
  });
  const meshRef = useRef(null);

  useFrame((state) => {
    let tick = state.clock.getElapsedTime();
    meshRef.current.material.uniforms.iTime.value = tick + 20;
    //controls
    meshRef.current.material.uniforms.uColor1.value.set(color1);
    meshRef.current.material.uniforms.uColor2.value.set(color2);
    meshRef.current.material.uniforms.uColor3.value.set(color3);
    meshRef.current.material.uniforms.uColor4.value.set(color4);
    meshRef.current.material.uniforms.uColor5.value.set(color5);
    meshRef.current.material.uniforms.uColor6.value.set(color6);

    //
    meshRef.current.material.uniforms.uFrequency.value =
      otherControls.frequency;
    meshRef.current.material.uniforms.uAmplitude.value =
      otherControls.amplitude;
    meshRef.current.material.uniforms.uSpeed.value = otherControls.speed;
    meshRef.current.material.uniforms.uMixLayer1A.value =
      otherControls.mixLayer1.a;
    meshRef.current.material.uniforms.uMixLayer1B.value =
      otherControls.mixLayer1.b;
    meshRef.current.material.uniforms.uMixLayer2A.value =
      otherControls.mixLayer2.a;
    meshRef.current.material.uniforms.uMixLayer2B.value =
      otherControls.mixLayer2.b;
    meshRef.current.material.uniforms.uSinMultiplier.value =
      otherControls.sinMultiplier;
    meshRef.current.material.uniforms.uTimeMultiplier.value =
      otherControls.timeMultiplier;
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
