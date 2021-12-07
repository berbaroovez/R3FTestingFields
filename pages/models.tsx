import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const DuckLoader = () => {
  const duckloader = useGLTF("/models/scene.gltf");

  let mixer: any = null;
  mixer = new THREE.AnimationMixer(duckloader.scene);
  //   const action = mixer.clipAction(duckloader.animations[2]);
  //   action.play();
  duckloader.animations.forEach((clip: any) => {
    mixer.clipAction(clip).play();
  });

  useFrame((state, delta) => {
    mixer.update(delta);
  });
  console.log(duckloader);
  return (
    <mesh scale={0.25}>
      <primitive object={duckloader.scene} />
    </mesh>
  );
};

export default function Models() {
  return (
    <Canvas>
      <ambientLight />
      <Suspense fallback={null}>
        <DuckLoader />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
