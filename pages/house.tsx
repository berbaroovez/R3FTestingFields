import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const Sphere = (props: any) => {
  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial attach="material" roughness={0.7} />
    </mesh>
  );
};

const Floor = (props: any) => {
  const [
    grassColorTexture,
    grassAmbientOcclusionTexture,
    grassNormalTexture,
    grassRoughnessTexture,
  ] = useTexture([
    "/textures/grass/color.jpg",
    "/textures/grass/ambientOcclusion.jpg",
    "/textures/grass/normal.jpg",
    "/textures/grass/roughness.jpg",
  ]);

  grassColorTexture.repeat.set(8, 8);
  grassAmbientOcclusionTexture.repeat.set(8, 8);
  grassNormalTexture.repeat.set(8, 8);
  grassRoughnessTexture.repeat.set(8, 8);

  grassColorTexture.wrapS = THREE.RepeatWrapping;
  grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
  grassNormalTexture.wrapS = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

  grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
  grassColorTexture.wrapT = THREE.RepeatWrapping;
  grassNormalTexture.wrapT = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry attach="geometry" args={[20, 20]} />
      <meshStandardMaterial
        attach="material"
        roughness={0.7}
        color={new THREE.Color("#617449")}
        map={grassColorTexture}
        aoMap={grassAmbientOcclusionTexture}
        normalMap={grassNormalTexture}
        roughnessMap={grassRoughnessTexture}
      />
    </mesh>
  );
};

const Bush = (props: any) => {
  return (
    <mesh {...props} castShadow>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial
        attach="material"
        roughness={0.7}
        color={"#89c854"}
      />
    </mesh>
  );
};
const Grave = (props: any) => {
  return (
    <mesh {...props} castShadow>
      <boxBufferGeometry attach="geometry" args={[0.5, 0.75, 0.25]} />
      <meshStandardMaterial attach="material" roughness={0.7} color="#6b6e67" />
    </mesh>
  );
};

const Graves = () => {
  const group = useRef<THREE.Group>(null!);

  const NUM = 50;

  //@ts-ignore
  const graveArray = new Array(NUM).fill();
  return (
    <>
      {graveArray.map((grave, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 6;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <group ref={group} key={i}>
            <Grave
              position={[x, 0.75 / 2, z]}
              rotation={[
                (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.4,
                0,
              ]}
            />
          </group>
        );
      })}
    </>
  );
};

// const Fog = (props: any) => {
//   return
// };

const House = (props: any) => {
  const [
    bricksColorTexture,
    bricksAmbientOcclusionTexture,
    bricksNormalTexture,
    bricksRoughnessTexture,
  ] = useTexture([
    "/textures/bricks/color.jpg",
    "/textures/bricks/ambientOcclusion.jpg",
    "/textures/bricks/normal.jpg",
    "/textures/bricks/roughness.jpg",
  ]);

  return (
    <>
      <group>
        <pointLight
          distance={6}
          intensity={1}
          color={"#e66934"}
          position={[0, 2.2, 2.7]}
          castShadow
        />
        <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneBufferGeometry args={[3.5, 1, 4]} />

          <meshStandardMaterial
            attach="material"
            roughness={0.7}
            color={"#b35f45"}
          />
        </mesh>
        <mesh position={[0, 2.5 / 2, 0]} castShadow>
          <boxBufferGeometry attach="geometry" args={[4, 2.5, 4]} />
          <meshStandardMaterial
            attach="material"
            color={"#ac8e82"}
            map={bricksColorTexture}
            aoMap={bricksAmbientOcclusionTexture}
            normalMap={bricksNormalTexture}
            roughnessMap={bricksRoughnessTexture}
          />
        </mesh>
        <Door />
        <Bush position={[0.8, 0.2, 2.2]} scale={[0.5, 0.5, 0.5]} />
        <Bush position={[1.4, 0.1, 2.1]} scale={[0.25, 0.25, 0.25]} />
        <Bush position={[-0.8, 0.1, 2.2]} scale={[0.4, 0.4, 0.4]} />
        <Bush position={[-1, 0.05, 2.6]} scale={[0.15, 0.15, 0.15]} />
      </group>
    </>
  );
};

const Door = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const [
    doorColorTexture,
    doorAlphaTexture,
    doorAmbientOcclusionTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  ] = useTexture([
    "/textures/door/color.jpg",
    "/textures/door/alpha.jpg",
    "/textures/door/ambientOcclusion.jpg",
    "/textures/door/height.jpg",
    "/textures/door/normal.jpg",
    "/textures/door/metalness.jpg",
    "/textures/door/roughness.jpg",
  ]);
  return (
    <mesh position={[0, 1, 2.01]} ref={ref}>
      <planeBufferGeometry args={[2, 2, 100, 100]} />
      <meshStandardMaterial
        attach="material"
        map={doorColorTexture}
        transparent
        alphaMap={doorAlphaTexture}
        aoMap={doorAmbientOcclusionTexture}
        displacementMap={doorHeightTexture}
        displacementScale={0.1}
        // aoMapIntensity={0.5}

        normalMap={doorNormalTexture}
        metalnessMap={doorMetalnessTexture}
        roughnessMap={doorRoughnessTexture}
      />
    </mesh>
  );
};

interface GhostProps {
  rotationDirection: number;
}

const Ghost = ({ rotationDirection }: GhostProps) => {
  const ref = useRef<THREE.PointLight>(null!);

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime * rotationDirection;

    ref.current.position.set(
      Math.cos(angle) * 4,
      Math.sin(angle) * 4,
      Math.sin(angle) * 4
    );
  });

  return <pointLight ref={ref} args={["#ff00ff", 2, 3]} castShadow />;
};

export default function Main() {
  return (
    <Canvas
      style={{
        height: "80vh",
      }}
      shadows
    >
      <color attach="background" args={["#262837"]} />
      <directionalLight
        castShadow
        position={[4, 5, -2]}
        intensity={0.12}
        color={"#8093b1"}
      />
      <ambientLight intensity={0.8} color={"#8093b1"} />
      <OrbitControls />
      {/* <Sphere /> */}
      <Suspense fallback={null}>
        <House />
        <Floor />
      </Suspense>

      <Graves />
      <fog attach="fog" args={["#262837", 2, 15]} />
      <Ghost rotationDirection={0.5} />
      <Ghost rotationDirection={-0.5} />
    </Canvas>
  );
}
