import { OrbitControls, useCubeTexture, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

extend({ TextGeometry });

interface TourusProps {
  x: number;
  y: number;
  z: number;
}

const Torus = ({ x, y, z }: TourusProps) => {
  return (
    <mesh position={[x, y, z]} scale={[x, x, x]}>
      <torusBufferGeometry attach="geometry" args={[0.3, 0.2, 20, 45]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  );
};

// function TorusGenerator() {
//   return new Array(100).fill().map((_, i) => {
//     const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1);
//     const y = -10 + Math.random() * 20;
//     const z = -5 + Math.random() * 10;
//     return <Torus key={i} x={x} y={y} z={z} />;
//   });
// }

// function Birds() {
//   return new Array(100).fill().map((_, i) => {
//     const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1);
//     const y = -10 + Math.random() * 20;
//     const z = -5 + Math.random() * 10;
//     const bird = ["Stork", "Parrot", "Flamingo"][Math.round(Math.random() * 2)];
//     let speed = bird === "Stork" ? 0.25 : bird === "Flamingo" ? 0.5 : 5;
//     let factor =
//       bird === "Stork"
//         ? 0.5 + Math.random()
//         : bird === "Flamingo"
//         ? 0.25 + Math.random()
//         : 1 + Math.random() - 0.5;
//     return <Torus key={i} x={x} y={y} z={z} />;
//   });
// }

const TorusGroup = () => {
  const group = useRef<THREE.Group>(null!);

  const NUM = 100;

  //@ts-ignore
  const toruses = new Array(NUM).fill();

  return (
    <>
      {toruses.map((_, i) => {
        return (
          <group ref={group}>
            <Torus
              x={5 - Math.random() * 10}
              z={5 - Math.random() * 10}
              y={5 - Math.random() * 10}
            />
          </group>
        );
      })}
    </>
  );
};

const FontDisplay = () => {
  // var loader = new THREE.FontLoader();
  //   const fontLoader = new FontLoader();

  const ref = useRef<THREE.Mesh>(null!);
  //   const font = fontLoader.load("/Verre_Regular.json");

  const colorMap = useTexture("/textures/matcaps/8.png");
  const font = useLoader(FontLoader, "/helvetiker_regular.typeface.json");
  const config = useMemo(
    () => ({
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }),
    [font]
  );

  useLayoutEffect(() => {
    ref.current.geometry.center();
  }, []);

  return (
    <mesh ref={ref}>
      <textGeometry attach="geometry" args={["Carter Ipsum", config]} />
      {/* <meshNormalMaterial attach="material" color="red"  />
       */}

      <meshMatcapMaterial matcap={colorMap} />
    </mesh>
  );
};

export default function Text3d() {
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
        <TorusGroup />
        <FontDisplay />
      </Suspense>
    </Canvas>
  );
}
