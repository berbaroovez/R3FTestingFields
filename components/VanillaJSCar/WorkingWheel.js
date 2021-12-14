import { useCylinder } from "@react-three/cannon";
import * as THREE from "three";
import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

useGLTF.preload("/racewheel.glb");
const Wheel = forwardRef(({ leftSide, ...props }, ref) => {
  useCylinder(
    () => ({
      mass: 1,
      // type: "Kinematic",
      material: "wheel",
      collisionFilterGroup: 0,

      args: [0.93 / 2.4, 0.93 / 2.4, 0.6 / 2.4, 16],
      //   position: [0, 5, 0],
      ...props,
    }),
    ref
  );
  const { nodes, materials } = useGLTF("/goodyear.glb");
  return (
    <group ref={ref} dispose={null} castShadow>
      <group rotation={[0, 0, Math.PI / 2]}>
        <group scale={leftSide ? -1 : 1}>
          <mesh
            geometry={nodes.Tire.geometry}
            material={materials["Black Tire"]}
            scale={[0.4, 0.07, 0.4]}
          />
          <mesh
            geometry={nodes.HubCap.geometry}
            material={nodes.HubCap.material}
            scale={[0.08, 0.01, 0.08]}
          />
          <mesh
            geometry={nodes.Cylinder002.geometry}
            material={nodes.Cylinder002.material}
            position={[-0.04, 0, 0.01]}
            scale={[0.01, 0.02, 0.01]}
          />
          <mesh
            geometry={nodes.Cylinder001.geometry}
            material={nodes.Cylinder001.material}
            position={[0.02, 0, 0.04]}
            scale={[0.01, 0.02, 0.01]}
          />
          <mesh
            geometry={nodes.Cylinder003.geometry}
            material={nodes.Cylinder003.material}
            position={[-0.02, 0, 0.04]}
            scale={[0.01, 0.02, 0.01]}
          />
          <mesh
            geometry={nodes.Cylinder004.geometry}
            material={nodes.Cylinder004.material}
            position={[0.05, 0, 0.02]}
            scale={[0.01, 0.02, 0.01]}
          />
          <mesh
            geometry={nodes.Cylinder005.geometry}
            material={nodes.Cylinder005.material}
            position={[-0.03, 0, -0.02]}
            scale={[0.01, 0.02, 0.01]}
          />
          <mesh
            geometry={nodes.Cylinder006.geometry}
            material={nodes.Cylinder006.material}
            position={[0.04, 0, -0.01]}
            scale={[0.01, 0.02, 0.01]}
          />
          <mesh
            geometry={nodes.Cylinder007.geometry}
            material={nodes.Cylinder007.material}
            position={[0, 0, -0.04]}
            scale={[0.01, 0.02, 0.01]}
          />
          <mesh
            geometry={nodes.RacingStripes.geometry}
            material={nodes.RacingStripes.material}
            position={[0, 0.03, 0]}
            scale={[0.3, 0.05, 0.3]}
          />
        </group>
      </group>
    </group>
  );
});

export default Wheel;
