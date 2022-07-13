import React, { useMemo } from "react";
import * as THREE from "three";
import { Text3D, Center, useTexture } from "@react-three/drei";
import { isMobile } from "react-device-detect";
import Image from "next/image";

const Text = () => {
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

  return (
    // <Center>
    <group position={[-0.6, 0, isMobile ? 12 : 8]}>
      <Text3D font={"/fonts/Montserrat_Regular.json"} {...config}>
        minh hieu
        <meshPhysicalMaterial
          metalness={0}
          roughness={0.2}
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
