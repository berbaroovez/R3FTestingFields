import Link from "next/link";
import Vehicle from "../components/VanillaJSCar/WorkingVehicle";
import {
  Debug,
  Physics,
  useBox,
  useCylinder,
  usePlane,
} from "@react-three/cannon";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { forwardRef } from "react";

import Wheel from "./../components/VanillaJSCar/WorkingWheel";
import { Ramp } from "../components/VanillaJSCar/Ramp";
const Plane = () => {
  const [ref, api] = usePlane(() => ({
    mass: 0,
    // type: "Static",
    rotation: [Math.PI / -2, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" color="#cc5f5f" />
    </mesh>
  );
};

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 5],
    ...props,
    args: [1, 1, 1],
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry />
    </mesh>
  );
}

export default function IndexPage() {
  const ref = useRef();
  return (
    <Canvas
      shadows
      camera={{ position: [1, 4, 10] }}
      style={{
        height: "100vh",
      }}
    >
      <OrbitControls />
      <ambientLight />
      <directionalLight position={[0, 10, 0]} />
      <Physics>
        <Debug color="red" scale={1.1}>
          <Vehicle position={[0, 10, 0]} />
          <Plane />

          <Cube />
          {/* <Wheel ref={ref} position={[0, 4, 0]} /> */}
        </Debug>

        <Ramp
          args={[30, 6, 8]}
          position={[2, -1, 10]}
          rotation={[0, 0.49, Math.PI / 15]}
        />
      </Physics>
    </Canvas>
  );
}
