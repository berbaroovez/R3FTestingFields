import { ScrollControls, useTexture, Scroll } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import styled from "styled-components";

const Cone = () => {
  const texture = useTexture("/textures/gradients/3.jpg");
  texture.magFilter = THREE.NearestFilter;
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.001;
  });
  return (
    <mesh ref={ref}>
      <coneGeometry attach="geometry" args={[1, 2, 32]} />
      <meshToonMaterial
        attach="material"
        color="#1CB4E2"
        gradientMap={texture}
      />
    </mesh>
  );
};

function Scene() {
  const { viewport } = useThree();

  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ mouse }) => {
    // ref.current.position.x = mouse.x * 0.05;
    // ref.current.position.y = -viewport.height - mouse.y * 0.05;
  });

  return (
    <>
      <mesh ref={ref} position={[0, -viewport.height, 2]}>
        <planeGeometry />
        <meshBasicMaterial color="orange" />
      </mesh>

      <mesh position={[0, -viewport.height * 2, -2]}>
        <planeGeometry />
        <meshBasicMaterial color="hotpink" />
      </mesh>
    </>
  );
}

function CameraComponent() {
  // This one makes the camera move in and out

  useFrame(({ mouse, camera }) => {
    const parralax = mouse.x / 2;
    const parralaxY = mouse.y / 2;
    console.log(parralax, parralaxY);
    camera.position.x = parralax;
    camera.position.y = parralaxY;
  });
  return null;
}

const Stars = () => {
  const particle_count = 2000;

  const { viewport } = useThree();
  const positions = useMemo(() => {
    const positions = new Float32Array(particle_count * 3);

    for (let i = 0; i < particle_count * 3; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] =
        viewport.height * 0.5 - Math.random() * viewport.height * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return positions;
  }, [particle_count]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={particle_count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={0.03} color="#ffffff" />
    </points>
  );
};

export default function ScrollDrei() {
  return (
    <Canvas>
      '
      <perspectiveCamera position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <ScrollControls pages={4}>
          <Scroll>
            <Scene />
          </Scroll>
          <Scroll html>
            <HeroZone>Hero Seciton</HeroZone>
            <HeroZone>Hero Seciton</HeroZone>
          </Scroll>
        </ScrollControls>
        <Stars />
      </Suspense>
      <CameraComponent />
    </Canvas>
  );
}

const HeroZone = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12em;
  color: white;
  font-weight: 400;
  letter-spacing: -0.05em;
`;
const NonHeroZone = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12em;
  color: white;
  font-weight: 400;
  letter-spacing: -0.05em;
`;
