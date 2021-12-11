import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
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
    <mesh position={[-1.5, 0, 0]} ref={mesh}>
      <sphereBufferGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};

const Plane = (props: any) => {
  const mesh = useRef<THREE.Group>(null!);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} ref={mesh}>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <meshStandardMaterial roughness={0.4} />
    </mesh>
  );
};
export default function Lighting() {
  return (
    <Canvas
      style={{
        height: "80vh",
      }}
    >
      <color attach="background" args={["#000"]} />
      <OrbitControls />

      <ambientLight intensity={0.5} color={0xffffff} />

      <pointLight intensity={0.5} position={[2, 3, 4]} color={0xffffff} />
      <hemisphereLight
        color={0xff0000}
        groundColor={new THREE.Color(0x0000ff)}
        intensity={1}
      />
      <pointLight intensity={0.1} position={[-2, 3, 4]} color={0xffffff} />
      <Box />
      <Torus />
      <Sphere />
      <Plane />
    </Canvas>
  );
}
