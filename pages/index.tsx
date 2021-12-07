import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import styled from "styled-components";
import { Suspense, useRef, useState } from "react";

const objectsDistance = 5;

const Torus = () => {
  const texture = useTexture("/textures/gradients/3.jpg");
  texture.magFilter = THREE.NearestFilter;
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.001;
  });
  return (
    <mesh position={[2, 0, 0]} ref={ref}>
      <torusGeometry attach="geometry" args={[1, 0.4, 16, 60]} />
      <meshToonMaterial
        attach="material"
        color="#1CB4E2"
        gradientMap={texture}
      />
    </mesh>
  );
};

const Cone = () => {
  const texture = useTexture("/textures/gradients/3.jpg");
  texture.magFilter = THREE.NearestFilter;
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.001;
  });
  return (
    <mesh position={[-2, -objectsDistance * 1, 0]} ref={ref}>
      <coneGeometry attach="geometry" args={[1, 2, 32]} />
      <meshToonMaterial
        attach="material"
        color="#1CB4E2"
        gradientMap={texture}
      />
    </mesh>
  );
};

const TorusKnot = () => {
  const texture = useTexture("/textures/gradients/3.jpg");
  texture.magFilter = THREE.NearestFilter;
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ mouse }) => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.001;
    console.log(mouse.x);
  });
  return (
    <mesh position={[2, -objectsDistance * 2, 0]} ref={ref}>
      <torusKnotGeometry attach="geometry" args={[0.8, 0.35, 100, 16]} />
      <meshToonMaterial
        attach="material"
        color="#1CB4E2"
        gradientMap={texture}
      />
    </mesh>
  );
};

const SectionZone = styled.section`
  display: flex;
  align-items: center;
  height: 100vh;
  position: relative;
  font-family: "Cabin", sans-serif;
  color: #ffeded;
  text-transform: uppercase;
  font-size: 7vmin;
  padding-left: 10%;
  padding-right: 10%;

  //make odd sections flex-end
  &:nth-child(odd) {
    justify-content: flex-end;
  }
`;

function Parralax() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ mouse }) => {
    const parralax = mouse.x / 2;
    const parralaxY = mouse.y / 2;
    console.log(parralax, parralaxY);
    groupRef.current.position.x = parralax;
    groupRef.current.position.y = parralaxY;
  });

  return (
    <group ref={groupRef}>
      <CameraComponent />
    </group>
  );
}

function CameraComponent() {
  // This one makes the camera move in and out

  useFrame(({ clock, camera, mouse }) => {
    let scrollY = window.scrollY;

    camera.position.y = (-scrollY / window.innerHeight) * objectsDistance;
  });
  return null;
}

export default function Scroll() {
  return (
    <>
      <Canvas
        camera={{ fov: 35, position: [0, 0, 6] }}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          outline: "none",
          overflow: "hidden",
        }}
      >
        <directionalLight color="white" intensity={1} position={[1, 1, 0]} />
        <Suspense fallback={null}>
          <Torus />
          <TorusKnot />

          <Cone />
        </Suspense>
        <Parralax />
      </Canvas>

      <SectionZone>
        <h1>My Portfolio</h1>
      </SectionZone>
      <SectionZone>
        <h2>My projects</h2>
      </SectionZone>
      <SectionZone>
        <h2>Contact me</h2>
      </SectionZone>
    </>
  );
}

// https://codesandbox.io/embed/y3j31r13zz
// look at this for parralax mayvbe
