import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { OrbitControls, RoundedBox } from "@react-three/drei";

export default function Test() {
  return (
    <div className="fixed w-full h-screen z-[1001] bg-[rgba(20,20,20,.7)]">
      <Canvas
        style={{ cursor: "pointer" }}
        dpr={[1, 2]}
        linear
        camera={{
          position: [3, 3, 3],
          fov: 75,
          near: 0.01,
          far: 100,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <mesh>
            <boxBufferGeometry />
            <meshNormalMaterial />
          </mesh>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
