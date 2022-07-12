import React, { useMemo } from "react";
import * as THREE from "three";
import { Text3D, Center, useTexture } from "@react-three/drei";

const Text = () => {
  const config = useMemo(
    () => ({
      size: 0.2,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    }),
    []
  );

//   const props = useTexture({
//     envMap: "/env/empty_warehouse_01_1k.hdr",
//   });

  return (
    // <Center>
    <group position={[-0.5, 0, 8]}>
      <Text3D font={"/fonts/Montserrat_Regular.json"} {...config}>
        nova era
        {/* <meshNormalMaterial /> */}
        {/* <icosahedronBufferGeometry args={[]}/> */}
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
