import React, { useRef, useEffect } from 'react'
import { vertex, fragment } from './landingShader'
import { useTexture, useAspect } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function LandingModel() {



    const plane = useRef();
    // let tick = 100.;

    // const { size } = useControls({
    //     size: {
    //         value: 12.5,
    //         min: 0.1,
    //         max: 100.0,
    //         step: 0.1,
    //     }
    // });

    const size = 12.5

    const texture = useTexture('/images/im1.jpg');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scale = useAspect(
        width,
        height,
        1
    );


    useFrame((state) => {
        let tick = state.clock.getElapsedTime();
        plane.current.material.uniforms.iTime.value = tick + 20;
        plane.current.material.uniforms.uTexture.value = texture;
        plane.current.material.uniforms.uSize.value = size;

    })


    const uniforms = useRef({
        uSize: { value: size },
        uTexture: { value: texture },
        iTime: {
            type: "f",
            value: 1.0,
        },
        iResolution: {
            type: "v2",
            value: new THREE.Vector2(10, 10),
        },
    });

    console.log(size);

    return (
        <>
            <mesh ref={plane} scale={scale}>
                <planeGeometry args={[1, 1, 64, 64]} />
                <shaderMaterial
                    vertexShader={vertex}
                    fragmentShader={fragment}
                    uniforms={uniforms.current}
                    wireframe={false}
                />
            </mesh>
        </>
    )
}