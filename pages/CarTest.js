import { Canvas, useFrame } from "@react-three/fiber";
import {
  Physics,
  useCylinder,
  useBox,
  usePlane,
  Debug,
  useRaycastVehicle,
} from "@react-three/cannon";
import { forwardRef, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "../util/useControls";
const wheelRadius = 0.5;
const steer = 0.75,
  force = 2000,
  maxBrake = 1e5;

const Plane = () => {
  const [ref, api] = usePlane(() => ({
    mass: 0,
    rotation: [Math.PI / -2, 0, 0],
    type: "Static",
    material: "ground",
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" color="#cc5f5f" />
    </mesh>
  );
};

const WheelRef = forwardRef((props, ref) => {
  const args = [wheelRadius, wheelRadius, wheelRadius / 2, 20];
  useCylinder(
    () => ({
      mass: 1,
      args,
      type: "Kinematic",
      collisionFilterGroup: 0, // turns off collisions
      ...props,
    }),
    ref
  );

  return (
    <mesh ref={ref}>
      <mesh rotation={[0, Math.PI / 2, Math.PI / 2]}>
        <cylinderBufferGeometry attach="geometry" args={args} />
        <meshBasicMaterial attach="material" color="red" />
      </mesh>
    </mesh>
  );
});

const ChassisRef = forwardRef((props, ref) => {
  const args = [2, 0.5, 1];

  const [, api] = useBox(
    () => ({
      mass: 500,
      ...props,
      args,
      angularVelocity: [0, 0.5, 0],
    }),
    ref
  );

  return (
    <mesh ref={ref} api={api}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshBasicMaterial attach="material" color="blue" />
    </mesh>
  );
});

const Car = () => {
  //Body Ref
  const chassis = useRef();

  //Wheel Refs
  const wheel1 = useRef();
  const wheel2 = useRef();
  const wheel3 = useRef();
  const wheel4 = useRef();

  const controls = useControls();

  const wheelOptions = {
    radius: wheelRadius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    frictionSlip: 1.4,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    axleLocal: [0, 0, 1],
    chassisConnectionPointLocal: [-1, 0, 1],
    maxSuspensionTravel: 0.3,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfo1 = {
    ...wheelOptions,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-1, 0, 1],
  };
  const wheelInfo2 = {
    ...wheelOptions,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-1, 0, -1],
  };
  const wheelInfo3 = {
    ...wheelOptions,
    isFrontWheel: false,
    chassisConnectionPointLocal: [1, 0, -1],
  };
  const wheelInfo4 = {
    ...wheelOptions,
    isFrontWheel: false,
    chassisConnectionPointLocal: [1, 0, 1],
  };

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: chassis,
    wheels: [wheel1, wheel2, wheel3, wheel4],
    wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1,
  }));

  useFrame(() => {
    const { forward, backward, left, right, brake, reset } = controls.current;
    for (let e = 2; e < 4; e++)
      api.applyEngineForce(
        forward || backward ? force * (forward && !backward ? -1 : 1) : 0,
        2
      );
    for (let s = 0; s < 2; s++)
      api.setSteeringValue(
        left || right ? steer * (left && !right ? 1 : -1) : 0,
        s
      );
    for (let b = 2; b < 4; b++) api.setBrake(brake ? maxBrake : 0, b);
    if (reset) {
      chassis.current.api.position.set(0, 0.5, 0);
      chassis.current.api.velocity.set(0, 0, 0);
      chassis.current.api.angularVelocity.set(0, 0.5, 0);
      chassis.current.api.rotation.set(0, -Math.PI / 4, 0);
    }
  });

  return (
    <group>
      <ChassisRef ref={chassis} position={[0, 2, 0]} />
      <WheelRef ref={wheel1} />
      <WheelRef ref={wheel2} />
      <WheelRef ref={wheel3} />
      <WheelRef ref={wheel4} />
    </group>
  );
};

export default function App() {
  //   const wheel1 = useRef();
  //   const wheel2 = useRef();
  //   const chassis = useRef();

  return (
    <Canvas camera={{ position: [1, 4, 10] }}>
      <OrbitControls />
      <ambientLight intensity={0.1} />
      <Physics>
        <Debug color="black" scale={1.1}>
          {/* <ChassisRef ref={chassis} position={[0, 4, 0]} />
           */}
          <Car />
        </Debug>
        <Plane />
        {/* <WheelRef ref={wheel1} position={[0, 4, 0]} /> */}

        {/* <WheelRef ref={wheel2} /> */}
      </Physics>
    </Canvas>
  );
}
