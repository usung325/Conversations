import React from "react";
import { Canvas } from "@react-three/fiber";
import ContentModel from "./ContentModel";

export default function ContentScene() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        className="w-full h-full"
        camera={{ fov: 50, position: [0, 0, 1.4] }}
      >
        <ContentModel />
      </Canvas>
    </div>
  );
}
