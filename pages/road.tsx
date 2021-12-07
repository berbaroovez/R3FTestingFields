import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const fragmentShader = `
    uniform vec3 uColor;
	void main(){
        gl_FragColor = vec4(uColor,1.);
    }
`;

const vertexShader = `
	void main(){
        vec3 transformed = position.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed.xyz, 1.);
	}
`;

const RoadMesh = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -100 / 2]}>
      <planeBufferGeometry attach="geometry" args={[100, 100, 20, 200]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{ uColor: { value: new THREE.Color(0x101012) } }}
      />
      {/* <meshBasicMaterial attach="material" color={0x101012} /> */}
    </mesh>
  );
};

const CarLights = () => {
  // craete a array of 50 carlights
};

const CarLight = ({}) => {
  let curve = new THREE.LineCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -1)
  );

  return (
    <mesh>
      <tubeBufferGeometry attach="geometry" args={[curve, 25, 1, 8, false]} />
      <meshBasicMaterial attach="material" color={0x545454} />
    </mesh>
  );
};

//cube mesh
const CubeMesh = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" color={0x00ff00} />
    </mesh>
  );
};

export default function Road() {
  return (
    <Canvas camera={{ position: [0, 7, -4] }}>
      <color attach="background" args={[0xffffff]} />
      {/* <OrbitControls /> */}
      <ambientLight />
      <RoadMesh />
      <CarLight />
      {/* <CubeMesh /> */}
    </Canvas>
  );
}
