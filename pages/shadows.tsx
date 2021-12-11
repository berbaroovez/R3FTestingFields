import { OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { Suspense, useRef } from "react";
import * as THREE from "three";
import { PointLightHelper, SpotLightHelper } from "three";
const Box = (props: any) => {
  const mesh = useRef<THREE.Group>(null!);
  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" />
    </mesh>
  );
};

const Torus = (props: any) => {
  const mesh = useRef<THREE.Mesh>(null!);
  return (
    <mesh position={[1.5, 0, 0]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[0.3, 0.2, 32, 64]} />

      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};

const Sphere = (props: any) => {
  const mesh = useRef<THREE.Group>(null!);
  return (
    <mesh position={[0, 0, 0]} ref={mesh} castShadow>
      <sphereBufferGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};

const Plane = (props: any) => {
  const mesh = useRef<THREE.Group>(null!);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      ref={mesh}
      receiveShadow
    >
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};

const LightingStuff = () => {
  const spotLightRef = useRef<THREE.SpotLight>(null!);

  useHelper(spotLightRef, SpotLightHelper, "hotpink");

  return (
    <spotLight
      ref={spotLightRef}
      color={0xffffff}
      position={[0, 2, 2]}
      castShadow
      intensity={0.4}
      distance={10}
      angle={Math.PI * 0.3}
    />
  );
};

export default function Lighting() {
  return (
    <Canvas
      style={{
        height: "80vh",
      }}
      shadows
    >
      <color attach="background" args={["#000"]} />
      <OrbitControls />

      <ambientLight intensity={0.3} color={0xffffff} />
      <directionalLight
        intensity={0.3}
        position={[2, 2, -1]}
        color={0xffffff}
        castShadow
      />
      <LightingStuff />

      <Sphere />
      <Plane />
    </Canvas>
  );
}
