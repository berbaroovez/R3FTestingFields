import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

const Body = forwardRef(({ args = [1.7, 1, 4], mass = 500, ...props }, ref) => {
  const bodyModel = useGLTF("body.glb");
  const [, api] = useBox(
    () => ({
      mass,
      args,
      allowSleep: false,
      ...props,
    }),
    ref
  );

  return (
    <mesh ref={ref} api={api}>
      <primitive object={bodyModel.scene} />
    </mesh>
  );
});

export default Body;
