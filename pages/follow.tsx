import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Head = () => {
  const cubeRef = useRef<THREE.Mesh>(null!);

  useFrame(({ mouse }) => {
    //   cubeRef.current.rotation.x = -mouse.x * 2 + 1;
    cubeRef.current.lookAt(
      new THREE.Vector3(mouse.x * 2 + 1, mouse.y * +2, 0.5)
    );

    // cubeRef.current.position.y = mouse.y / 10;
  });

  return (
    <group ref={cubeRef}>
      <Cube position={new THREE.Vector3(0, 0, 0.25)} />
      <Eye position={new THREE.Vector3(-0.2, 0.1, 0.5)} />
      <Eye position={new THREE.Vector3(0.2, 0.1, 0.5)} />
    </group>
  );
};

const Cube = ({ position }: EyeProps) => {
  return (
    <mesh position={position}>
      <boxGeometry attach="geometry" args={[1, 1, 0.5]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  );
};
const Plane = () => {
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial attach="material" color="pink" />
    </mesh>
  );
};
interface EyeProps {
  position: THREE.Vector3;
}
const Eye = ({ position }: EyeProps) => {
  const eyeRef = useRef<THREE.Mesh>(null!);

  useFrame(({ mouse }) => {
    eyeRef.current.position.x = mouse.x / 20;
    eyeRef.current.position.y = mouse.y / 20;
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry attach="geometry" args={[0.1, 32, 32]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
      <mesh ref={eyeRef} position={[0, 0, 0.08]}>
        <sphereGeometry attach="geometry" args={[0.04, 32, 32]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh>
    </group>
  );
};

export default function Follow() {
  return (
    <Canvas>
      <ambientLight />
      <Cube position={new THREE.Vector3(0, 0, -5)} />

      <Head />
      <Plane />
      <OrbitControls />
    </Canvas>
  );
}
