import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useCallback, useRef } from "react";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import Cubes from "./Cube";
import * as THREE from "three";
import { useState } from "react";
import Text from "./Text";
// import { DotScreen, EffectComposer } from "@react-three/postprocessing";
// import { BlendFunction } from "postprocessing";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      {/* <spotLight
        color={new THREE.Color(0x00fffc)}
        position={[0, 12, 20]}
        intensity={5}
        angle={Math.PI / 4}
        penumbra={1}
      />
      <directionalLight
        position={[1, 0.25, 0]}
        color={new THREE.Color(0x00fffc)}
        intensity={1}
      /> */}
      {/* <hemisphereLight intensity={0.35} /> */}
      <directionalLight
        position={[30, 0, 30]}
        angle={0.3}
        // penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* <pointLight position={[-30, 0, -30]} intensity={0.3} /> */}
    </>
  );
};

export default function Model() {
  const [onHold, setOnHold] = useState(false);
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <div className="w-full h-screen">
      <Canvas
        dpr={[1, 2]}
        linear
        camera={{
          position: [0, 0, 30],
          fov: 75,
          near: 0.01,
          far: 100,
        }}
        shadows
        onMouseMove={onMouseMove}
        onMouseUp={() => setOnHold(false)}
        onMouseDown={() => setOnHold(true)}
        onMouseLeave={() => setOnHold(false)}
      >
        <Suspense fallback={null}>
          <Lights />
          <Text />
          <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <Cubes mouse={mouse} onHold={onHold} />
          </group>
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
