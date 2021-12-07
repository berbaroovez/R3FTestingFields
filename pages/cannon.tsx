import { Canvas } from "@react-three/fiber";
import {
  Physics,
  usePlane,
  useBox,
  useSphere,
  Debug,
} from "@react-three/cannon";
import { OrbitControls, Stats } from "@react-three/drei";

import * as THREE from "three";
// const Plane: React.FC = ({ size, color, ...props }) => {
//   const [ref] = usePlane(() => ({
//     rotation: [-Math.PI / 2, 0, 0],
//     ...props,
//   }));
//   return (
//     <mesh ref={ref} receiveShadow>
//       <planeGeometry args={[size, size]} />
//       {/* <shadowMaterial color="#c40101" transparent opacity={1} /> */}
//       <meshStandardMaterial color={color} side={THREE.DoubleSide} />
//     </mesh>
//   );
// };

// const Crate = () => {
//   const [wall1] = usePlane(() => ({
//     position: [0, 10, 0],
//   }));
//   const [wall2] = usePlane(() => ({
//     position: [0, 10, -10],
//   }));
//   const [wall3] = usePlane(() => ({
//     position: [-5, 10, -5],
//     rotation: [0, Math.PI / 2, 0],
//   }));
//   const [wall4] = usePlane(() => ({
//     position: [5, 10, -5],
//     rotation: [0, Math.PI / 2, 0],
//   }));
//   const [floor] = usePlane(() => ({
//     position: [0, 5, -5],
//     rotation: [Math.PI / 2, 0, 0],
//   }));
//   return (
//     <group position={[2, 2, 2]}>
//       <mesh receiveShadow ref={wall1}>
//         <planeGeometry args={[10, 10]} />
//         <meshStandardMaterial color="grey" side={THREE.DoubleSide} />
//       </mesh>
//       <mesh receiveShadow ref={wall2}>
//         <planeGeometry args={[10, 10]} />
//         <meshStandardMaterial color="grey" side={THREE.DoubleSide} />
//       </mesh>
//       <mesh
//         ref={wall3}
//         receiveShadow
//         position={[-5, 10, -5]}
//         rotation={[0, Math.PI / 2, 0]}
//       >
//         <planeGeometry args={[10, 10]} />
//         <meshStandardMaterial color="grey" side={THREE.DoubleSide} />
//       </mesh>
//       <mesh ref={wall4} receiveShadow>
//         <planeGeometry args={[10, 10]} />
//         <meshStandardMaterial color="grey" side={THREE.DoubleSide} />
//       </mesh>
//       <mesh ref={floor} receiveShadow>
//         <planeGeometry args={[20, 20]} />
//         <meshStandardMaterial color="grey" side={THREE.DoubleSide} />
//       </mesh>
//     </group>
//   );
// };

const Cube: React.FC = (props) => {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  );
};

const Sphere: React.FC = (props) => {
  const [ref] = useSphere(() => ({
    mass: 1,
    position: [0, 5, 0],
    ...props,
  }));

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <sphereGeometry />
      <meshNormalMaterial />
    </mesh>
  );
};

export default function Cannon() {
  //   const [gravitySwitch, setGravitySwitch] = useState(true);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: false }}
      camera={{ position: [80, 100, 100], fov: 45 }}
    >
      <color attach="background" args={["black"]} />
      <ambientLight />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <Stats />

      <OrbitControls />
    </Canvas>
  );
}
