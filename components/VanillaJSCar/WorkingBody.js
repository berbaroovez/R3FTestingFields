import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

useGLTF.preload("/racecar.glb");

const Body = forwardRef(({ mass = 500, ...props }, ref) => {
  const [, api] = useBox(
    () => ({
      mass,
      args: [2, 1, 5.5],
      allowSleep: false,
      ...props,
    }),
    ref
  );
  const { nodes, materials } = useGLTF("/racecar.glb");
  return (
    <mesh ref={ref} dispose={null} api={api} castShadow>
      <group>
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials["Material.002"]}
          scale={[1, 0.46, 3]}
        />
        <mesh
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[0.57, 0.57, -2.85]}
          scale={[0.04, 0.19, 0.05]}
        />
        <mesh
          geometry={nodes.Cube002.geometry}
          material={nodes.Cube002.material}
          position={[-0.63, 0.57, -2.76]}
          scale={[0.04, 0.19, 0.04]}
        />
        <mesh
          geometry={nodes.Cube003.geometry}
          material={nodes.Cube003.material}
          position={[-0.06, 0.76, -2.76]}
          rotation={[0.13, 0, -Math.PI / 2]}
          scale={[0.02, 0.92, 0.23]}
        />
        <mesh
          geometry={nodes.Cube004.geometry}
          material={nodes.Cube004.material}
          position={[-0.97, 0.86, -2.76]}
          rotation={[0.13, 0, -Math.PI / 2]}
          scale={[-0.14, -0.02, 0.26]}
        />
        <mesh
          geometry={nodes.Cube006.geometry}
          material={nodes.Cube006.material}
          position={[-0.97, 0.86, -2.76]}
          rotation={[0.13, 0, -Math.PI / 2]}
          scale={[-0.14, -0.02, 0.26]}
        />
        <mesh
          geometry={nodes.Cube007.geometry}
          material={nodes.Cube007.material}
          position={[0.85, 0.86, -2.76]}
          rotation={[0.13, 0, -Math.PI / 2]}
          scale={[-0.14, -0.02, 0.26]}
        />
      </group>
    </mesh>
  );
});

export default Body;
