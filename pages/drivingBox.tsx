import { Debug, Physics, useBox, usePlane } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Object3D } from "three";
import { useControls } from "../util/useControls";

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
const Box = (props) => {
  const [boxPositionState, setBoxPositionState] = useState(0);
  const testRef = useRef<Object3D>(null!);
  const controls = useControls();

  const [ref, api] = useBox(
    () => ({
      mass: 1,
      //   type: "Static",
      args: [1, 1, 1],
      allowSleep: false,
      ...props,
    }),
    testRef
  );

  useFrame(({ clock }) => {
    const { forward, backward, left, right, brake, reset } = controls.current;
    if (forward) {
      setBoxPositionState(boxPositionState + 0.01);
    }
    // for (let e = 2; e < 2000; e++) {
    //   console.log(ref);
    // }

    api.position.set(Math.sin(clock.getElapsedTime()) * 1, 0.5, 0);
    // console.log(ref.current?.position);
  });
  return (
    <mesh ref={ref} position={props.position}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={0x00ff00} />
    </mesh>
  );
};

export default function DrivingBox() {
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
        <Plane />
        <Debug>
          <Box position={[0, 0.5, 0]} />
        </Debug>
      </Physics>
    </Canvas>
  );
}
