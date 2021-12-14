import {
  Debug,
  Physics,
  useBox,
  useCylinder,
  usePlane,
} from "@react-three/cannon";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { forwardRef } from "react";
import Wheel from "../components/Car/WorkingWheel";
import type { Object3D } from "three";
import Model from "./../public/Racecar";
import Body from "../components/Car/WorkingBody";
import Vehicle from "../components/Car/WorkingVehicle";

const Plane = () => {
  const [ref, api] = usePlane(() => ({
    rotation: [Math.PI / -2, 0, 0],
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial attach="material" color="#cc5f5f" />
    </mesh>
  );
};

export default function CylinderPhysics() {
  return (
    <Canvas camera={{ position: [1, 4, 10] }}>
      <OrbitControls />
      <ambientLight intensity={0.1} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.5}
        intensity={1}
        castShadow
        penumbra={1}
      />
      <Physics>
        <Debug color="red" scale={1.1}>
          {/* <WheelContainer /> */}
          <Vehicle position={[0, 1, 0]} />
        </Debug>
        <Plane />

        {/* <Box /> */}
      </Physics>
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
