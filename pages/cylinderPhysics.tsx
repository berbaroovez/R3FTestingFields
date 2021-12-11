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

const WheelContainer = () => {
  const wheel1 = useRef();

  return (
    <group>
      <Wheel ref={wheel1} />
    </group>
  );
};

const Wheel = forwardRef((props, ref) => {
  const wheelTexture = useGLTF("racewheel.glb");

  useCylinder(
    () => ({
      mass: 1,
      material: "wheel",
      type: "Kinematic",
      rotation: [0, Math.PI / 0.5, 0],
      args: [0.93, 0.93, 0.6, 16],
      position: [0, 5, 0],
    }),
    ref
  );

  return (
    <mesh ref={ref}>
      <primitive object={wheelTexture.scene} />
    </mesh>
  );
});

// const Wheel = forwardRef() => {

//   const [ref, api] = useCylinder(() => ({
//     mass: 1,
//     material: "wheel",
//     type: "Kinematic",

//     args: [1, 1, 2, 16],
//     position: [0, 5, 0],
//   }));

//   return (
//     <mesh ref={ref}>
//       <primitive object={wheelTexture.scene} />
//     </mesh>
//   );
// };

const Box = () => {
  const [ref, api] = useBox(() => ({
    position: [0, 4, 0],
    rotation: [0, 0, 0],
    mass: 15,
    args: [1, 1, 1],
    damping: 0.01,
    // linearDamping: 0.01,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="#5fcc5f" />
    </mesh>
  );
};

export default function CylinderPhysics() {
  return (
    <Canvas camera={{ position: [1, 4, 10] }}>
      <OrbitControls />
      <ambientLight />
      <Physics>
        <Debug color="red" scale={1.1}>
          <WheelContainer />
        </Debug>
        <Plane />

        {/* <Box /> */}
      </Physics>
    </Canvas>
  );
}
