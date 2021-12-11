import { useCylinder } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

// interface Props {
//   ref: any;
//   radius: number;
//   leftSide?: boolean;
// }

const Wheel = forwardRef(({ radius = 0.7, leftSide, ...props }, ref) => {
  const wheel = useGLTF("wheel.glb");
  //   useCylinder({ mass: 1, type: "Kinematic" });
  useCylinder(
    () => ({
      mass: 1,
      material: "wheel",
      collisionFilterGroup: 0,
      args: [radius, radius, 0.5, 16],
      position: [0, 0, 5],
      ...props,
    }),
    ref
  );

  return (
    <mesh scale={0.25} rotation={[0, Math.PI * 1.5, 0]}>
      <primitive object={wheel.scene} />
    </mesh>
  );
});

export default Wheel;
