import Head from "next/head";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import { Block, useBlock } from "../components/Block";
import state from "../components/state";
import { BoxBufferGeometry } from "three";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
    </>
  );
};

const Paragraph = ({ index, offset, factor, aspect, text }) => {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock();
  const size = aspect < 1 && !mobile ? 0.65 : 1;
  const alignRight = (canvasWidth - w * size - margin) / 2;
  const pixelWidth = w * state.zoom * size;
  const left = !(index % 2);
  const color = index % 2 ? "#D40749" : "#2FE8C3";

  return (
    <Block factor={factor} offset={offset}>
      <group position={[0, 0, 0]}>
        <mesh position={[2, 0, 0]}>
          <boxBufferGeometry args={[3, 3, 3]} />
          <meshNormalMaterial />
        </mesh>
        <Html fullscreen style={{ height: "100%" }}>
          <div className="w-full h-full flex flex-col justify-start items-start bg-orange-500">
            <h2 className="text-8xl">PHAM MINH HIEU</h2>
            <h2 className="text-8xl">Creative Developer</h2>
          </div>
        </Html>
        <Html
          style={{
            width: pixelWidth / (mobile ? 1 : 2),
            textAlign: left ? "left" : "right",
          }}
          position={[
            left || mobile ? (-w * size) / 2 : 0,
            (-w * size) / 2 / aspect - 0.4,
            1,
          ]}
        >
          <div tabIndex={index}>{text}</div>
        </Html>
      </group>
    </Block>
  );
};

const Scene = () => {
  return (
    <>
      <Lights />
      <mesh>
        <boxBufferGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Canvas
        dpr={[1, 2]}
        orthographic
        linear
        camera={{
          zoom: state.zoom,
          position: [1, 1, 6],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
