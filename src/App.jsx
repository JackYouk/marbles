import { Bloom, EffectComposer, Glitch, Noise, Vignette } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import { Center, Environment, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { CuboidCollider, Debug, Physics, RigidBody, InstancedRigidBodies } from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function App() {
  const cubesCount = 1500;
  const cubes = useRef();

  const zmtTexture = useMatcapTexture('6E524D_8496C5_AF6624_100B11', 128);



  const cubesTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        i % 2 === 0 ? ((Math.random()) * 10) : (Math.random()) * -10,
        9 + i * 0.05,
        (Math.random()) * 1,
      ]);
      rotations.push([0, 0, 0]);
      scales.push([1, 1, 1]);
    }
    return { positions, rotations, scales }
  }, []);

  return (
    <>
      <color args={['#fff']} attach='background' />
      {/* <EffectComposer>
        <Bloom mipmapBlur />
      </EffectComposer> */}

      <Environment preset='city' />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <directionalLight castShadow position={[1, 20, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} /> */}

      <Physics gravity={[0, -6, 0]}>
        {/* <Debug /> */}

        {/* <RigidBody type='fixed' colliders='trimesh'>
          <Center>
            <Text3D
              font='./Alata_Regular.json'
              scale={[3, 3, 15]}
              letterSpacing={1}
            >
              Hello World
              <meshStandardMaterial color='black' />
            </Text3D>
          </Center>
        </RigidBody>  */}

        <RigidBody type='fixed'>
          <mesh rotation={[0,0, 0.4]} position={[6, 7, 0]}>
            <boxGeometry args={[10, 2, 2]} />
            <meshStandardMaterial color='white' />
          </mesh>
        </RigidBody>

        <RigidBody type='fixed'>
          <mesh rotation={[0,0, -0.4]} position={[-4, 1, 0]}>
            <boxGeometry args={[15, 2, 2]} />
            <meshStandardMaterial color='white' />
          </mesh>
        </RigidBody>

        <RigidBody type='fixed'>
          <mesh rotation={[0,0, 0.4]} position={[6, -8, 0]}>
            <boxGeometry args={[10, 2, 2]} />
            <meshStandardMaterial color='white' />
          </mesh>
        </RigidBody>


        <RigidBody type='fixed'>
          {/* FB */}
          <CuboidCollider args={[10, 100, 0.5]} position={[0, 0, 2]} />
          <CuboidCollider args={[10, 100, 0.5]} position={[0, 0, -2]} />
          {/* RL */}
          <CuboidCollider args={[0.5, 100, 5]} position={[10.5, 0, 0]} />
          <CuboidCollider args={[0.5, 100, 5]} position={[-10.5, 0, 0]} />
          {/* TB */}
          <CuboidCollider args={[15, 0.5, 10]} position={[0, 100, 0]} />
          <CuboidCollider args={[15, 0.5, 10]} position={[0, -15, 0]} />
        </RigidBody>

        <InstancedRigidBodies
          positions={cubesTransforms.positions}
          rotations={cubesTransforms.rotations}
          scales={cubesTransforms.scales}
          colliders='ball'
        >
          <instancedMesh ref={cubes} castShadow args={[null, null, cubesCount]}>
            <sphereGeometry args={[0.5]} />
            {/* <meshStandardMaterial 
              color='gray'
              metalness={10}
            // toneMapped={false} 
            // // color={[1.5, 1, 4]} 
            // color='white'
            // emissive='orange'
            // emissiveIntensity={1}
             /> */}
             <meshMatcapMaterial matcap={zmtTexture[0]} />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}