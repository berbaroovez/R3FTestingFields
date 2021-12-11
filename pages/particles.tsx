import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Points, useTexture } from "@react-three/drei";
import { Suspense, useCallback, useMemo, useRef } from "react";
import * as THREE from "three";
//https://spectrum.chat/react-three-fiber/general/im-new-to-this-how-to-render-a-point-to-scene~03a9897d-fb48-4880-9810-a64be5ad0767
const Sphere = () => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });
  return (
    <points ref={ref}>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
      <pointsMaterial size={0.02} />
    </points>
  );
};
const Cussy = () => {
  const count = 5000;

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)

    for (
      let i = 0;
      i < count * 3;
      i++ // Multiply by 3 for same reason
    ) {
      positions[i] = (Math.random() - 0.5) * 10; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
    }
    return positions;
  }, [count]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach="material"
        size={10}
        sizeAttenuation={false}
        color="#ff88cc"
      />
    </points>
  );
};
const CustomTextureCussy = () => {
  const count = 50000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)
    const colors = new Float32Array(count * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)

    let counter = 1;
    let x = 0;
    let y = 0;
    for (
      let i = 0;
      i < count * 3;
      i++ // Multiply by 3 for same reason
    ) {
      colors[i] = Math.random();

      if (counter === 2) {
        positions[i] = 1;
      } else {
        positions[i] = (Math.random() - 0.5) * 10; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
      }

      counter++;
      if (counter > 3) {
        counter = 1;
      }
    }
    return [positions, colors];
  }, [count]);

  const particleTexture = useTexture("/textures/particles/2.png");
  const ref = useRef<THREE.Mesh>(null!);
  let t = 0;
  let f = 0.002;
  let a = 3;

  const graph = useCallback(
    (x, z) => {
      return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [f, a, t]
  );
  const bufferRef = useRef<THREE.BufferGeometry>(null!);
  // useFrame(({ clock }) => {
  //   for (let i = 0; i < count; i++) {
  //     let i3 = i * 3;
  //     const position = bufferRef.current.attributes.position.array;
  //     const x = position[i3];
  //   }
  // });

  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={["attributes", "color"]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        attach="material"
        size={0.1}
        // sizeAttenuation={false}

        alphaMap={particleTexture}
        map={particleTexture}
        transparent
        // alphaTest={0.001}
        // depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
};

export default function Particles() {
  return (
    <Canvas
      style={{
        height: "80vh",
      }}
    >
      <color attach="background" args={["black"]} />
      <OrbitControls />
      <Suspense fallback={null}>
        {/* <Cussy /> */}
        <CustomTextureCussy />
      </Suspense>
      {/* <Sphere /> */}
    </Canvas>
  );
}
