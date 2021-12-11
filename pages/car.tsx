import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Physics, usePlane } from "@react-three/cannon";
import Wheel from "./../components/Car/Wheel";

export default function Models() {
  return (
    <Canvas camera={{ position: [1, 6, 11] }}>
      <color attach="background" args={["#913838"]} />
      <ambientLight />
      <directionalLight position={[-10, 10, 10]} />
      <Physics
        broadphase="SAP"
        contactEquationRelaxation={4}
        friction={1e-3}
        allowSleep
      >
        <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: "floor" }} />
        <Wheel position={[0, 0, 2]} />
      </Physics>

      <OrbitControls />
    </Canvas>
  );
}

function Plane(props) {
  const [ref] = usePlane(() => ({
    type: "Static",
    material: "ground",
    ...props,
  }));

  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" color="#3e6872" />
      </mesh>
    </group>
  );
}
