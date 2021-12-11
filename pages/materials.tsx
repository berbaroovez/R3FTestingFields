import { OrbitControls, useCubeTexture, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
// import { TextureLoader } from "three/src/loaders/TextureLoader";

const Box = (props: any) => {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={0x00ff00} />
    </mesh>
  );
};

const Torus = (props: any) => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  // const colorMap = useLoader(TextureLoader, "PavingStones092_1K_Color.jpg");
  // const colorMap = useTexture("/static/textures/door/color.jpg");
  return (
    <mesh position={[1.5, 0, 0]} ref={mesh}>
      <torusBufferGeometry attach="geometry" args={[1, 0.3, 16, 100]} />

      <meshStandardMaterial metalness={0.7} roughness={0.3} />
    </mesh>
  );
};

const Sphere = (props: any) => {
  // const mesh = useRef<THREE.Mesh>(null!);
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const envMap = useCubeTexture(
    ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
    { path: "/textures/3/" }
  );

  return (
    <mesh>
      <sphereBufferGeometry args={[0.5, 64, 64]} />
      <meshStandardMaterial metalness={0.9} roughness={0.1} envMap={envMap} />
    </mesh>
  );
};

const Plane = (props: any) => {
  // const colorMap = useTexture("/static/textures/door/color.jpg");
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      {/* <meshStandardMaterial map={colorMap} /> */}
      <meshStandardMaterial metalness={0.7} roughness={0.3} />
    </mesh>
  );
};

export default function Materials() {
  return (
    <Canvas
      style={{
        height: "80vh",
      }}
    >
      <color attach="background" args={[0, 0, 0]} />
      <OrbitControls />
      <ambientLight args={[0xffffff, 0.5]} />
      <pointLight args={[0xffffff, 0.5]} position={[2, 3, 4]} />

      <Suspense fallback={null}>
        <Sphere />

        <Plane />
        <Torus />
      </Suspense>
    </Canvas>
  );
}
