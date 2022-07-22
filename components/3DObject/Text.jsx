import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Text3D, Center, useTexture } from "@react-three/drei";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import { useFrame } from "@react-three/fiber";
import lerp from "lerp";

const Text = ({ path }) => {
  const text = useRef();
  const config = useMemo(
    () => ({
      size: 0.2,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 1,
    }),
    []
  );

  //   const props = useTexture({
  //     envMap: "/env/empty_warehouse_01_1k.hdr",
  //   });
  useFrame(() => {
    if (path !== "/") {
      text.current.position.z = lerp(text.current.position.z, -20, 0.2);
    } else {
      text.current.position.z = lerp(
        text.current.position.z,
        isMobile ? 12 : 8,
        0.3
      );
    }
  });

  return (
    // <Center>
    <group position={[-0.7, 0, isMobile ? 12 : 8]} ref={text}>
      <Text3D font={"/fonts/Montserrat_Regular.json"} {...config}>
        minh hieu
        <meshPhysicalMaterial
          metalness={0}
          roughness={0.3}
          transmission={1}
          thickness={1}
          //   envMap={props}
        />
      </Text3D>
    </group>
    // </Center>
  );
};

export default Text;
