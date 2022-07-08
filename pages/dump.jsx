import Head from "next/head";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Html, OrbitControls } from "@react-three/drei";
import { Block, useBlock } from "../components/Block";
import state from "../components/state";

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

const Content = () => {
  return (
    <>
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} />
      ))}
    </>
  );
};

export default function Home() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);

  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Head>
        <title>NovaEra</title>
        <meta name="description" content="NovaEra's portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
        <Lights />
        <Suspense fallback={null}>
          <Content />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div
            key={index}
            id={"0" + index}
            style={{ height: `${(state.pages / state.sections) * 100}vh` }}
          />
        ))}
      </div>
    </>
  );
}
