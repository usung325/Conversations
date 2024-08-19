import React from 'react'
import { Canvas } from '@react-three/fiber'
import LandingModel from './LandingModel'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import WhiteVignette from '../WhiteVignette'

export default function LandingScene() {
    return (
        <div className="w-screen h-screen">
            <Canvas
                className="w-full h-full"
                camera={{ fov: 50, position: [0, 0, 1.4] }}
            >
                <LandingModel />
                <WhiteVignette intensity={5.0} />
            </Canvas>
        </div>
    )
}