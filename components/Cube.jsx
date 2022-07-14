import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
} from "react";
import perlin3 from "../utils/perlin";
import * as THREE from "three";
import lerp from "lerp";
import vertexShader from "../shaders/shader-patterns/vertex.glsl";
import fragmentShader from "../shaders/shader-patterns/fragment.glsl";
import { clamp } from "../utils/function";
import niceColors from "nice-color-palettes";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";

const p3 = (time, threshold) => (a, b, c) =>
  perlin3(
    Math.abs(((a + 0.5) / (NUM / 2)) * time * threshold),
    Math.abs(((b + 0.5) / (NUM / 2)) * time * threshold),
    Math.abs(((c + 0.5) / (NUM / 2)) * time * threshold)
  );
const NUM = 6;
const TOT = NUM * NUM * NUM;

export default function Cubes({ mouse, onHold, path }) {
  const instance = useRef();
  const influence = useRef(0);

  const { clock, camera } = useThree();
  const [objects] = useState(() =>
    [...new Array(TOT)].map(() => new THREE.Object3D())
  );
  const [vec] = useState(() => new THREE.Vector3());
  const vec3 = new THREE.Vector3();
  const color = new THREE.Color();

  const update = useCallback((count) => {
    const positions = [];
    const time = clock.getElapsedTime() * (1 + 60 * Math.random());
    const threshold = 0.05 + 0.2 * Math.random();
    for (let z = -NUM / 2; z < NUM / 2; z += 1) {
      for (let y = -NUM / 2; y < NUM / 2; y += 1) {
        for (let x = -NUM / 2; x < NUM / 2; x += 1) {
          const fn = p3(time, threshold);
          const noise = fn(x, y, z) + fn(y, z, x) + fn(z, x, y);
          positions.push(
            noise > 1.5 - threshold && noise < threshold + 1.5 ? 1 : 0
          );
        }
      }
    }
    return [count, positions];
  }, []);
  const [[count, positions], set] = useState(() => update(0));

  useEffect(() => {
    const id = setInterval(() => set(([count]) => update(count + 1)), 2000);
    return () => clearInterval(id);
  }, [update]);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    camera.position.lerp(vec3.set(0, 0, isMobile ? 15 : 10), 0.1);

    let offset = path === "/" ? 2 : 3;
    let id = 0;
    for (let z = -NUM / 2; z < NUM / 2; z += 1) {
      for (let y = -NUM / 2; y < NUM / 2; y += 1) {
        for (let x = -NUM / 2; x < NUM / 2; x += 1) {
          const sign = (y > 0 ? -1 : 1) * (x > 0 ? -1 : 1);
          const s = positions[id];

          let xOffset = lerp(objects[id].position.x, x * offset, 0.2);
          let yOffset = lerp(objects[id].position.y, y * offset, 0.2);
          let zOffset = lerp(objects[id].position.z, z * offset, 0.2);

          if (onHold || path !== "/") {
            objects[id].position.set(xOffset, yOffset, zOffset);
          } else {
            objects[id].position.set(
              lerp(objects[id].position.x, x, 0.2),
              lerp(objects[id].position.y, y, 0.2),
              lerp(objects[id].position.z, z, 0.2)
            );
          }

          objects[id].scale.lerp(vec.set(s, s, s), 0.1);
          objects[id].rotation.x = lerp(
            objects[id].rotation.x,
            sign * (1 - s),
            0.08
          );
          objects[id].rotation.y = lerp(
            objects[id].rotation.y,
            sign * (1 - s),
            0.08
          );
          objects[id].rotation.z = lerp(
            objects[id].rotation.z,
            sign * (1 - s),
            0.08
          );
          objects[id].updateMatrix();
          instance.current.setMatrixAt(id, objects[id++].matrix);
          // instance.current.setColorAt(
          //   id,
          //   color.setHex(0xffffff * Math.random())
          // );
        }
      }
    }

    instance.current.rotation.x = 0.2 * a;
    instance.current.rotation.y = 0.2 * a;

    instance.current.rotation.x = lerp(
      instance.current.rotation.x,
      0 + mouse.current[1] / 100,
      0.3
    );
    instance.current.rotation.y = lerp(
      instance.current.rotation.y,
      0 + mouse.current[0] / 100,
      0.3
    );

    influence.current = Math.sin(a);
    instance.current.morphTargetInfluences[0] = influence.current;
    instance.current.instanceMatrix.needsUpdate = true;
  });

  // useEffect(() => {
  //   if (!instance.current) return;
  //   const sphereFormation = [];
  //   const geometry = instance.current.geometry;
  //   geometry.morphAttributes.position = [];

  //   // create an empty array to  hold targets for the attribute we want to morph
  //   // morphing positions and normals is supported
  //   geometry.morphAttributes.position = [];

  //   // the original positions of the cube's vertices
  //   const positionAttribute = geometry.attributes.position;
  //   // for the second morph target, we'll twist the cubes vertices

  //   for (let i = 0; i < positionAttribute.count; i++) {
  //     const x = positionAttribute.getX(i);
  //     const y = positionAttribute.getY(i);
  //     const z = positionAttribute.getZ(i);

  //     sphereFormation.push(
  //       x * Math.sqrt(1 - (y * y) / 2 - (z * z) / 2 + (y * y * z * z) / 3),
  //       y * Math.sqrt(1 - (z * z) / 2 - (x * x) / 2 + (z * z * x * x) / 3),
  //       z * Math.sqrt(1 - (x * x) / 2 - (y * y) / 2 + (x * x * y * y) / 3)
  //     );

  //     // stretch along the x-axis so we can see the twist better
  //   }
  //   geometry.morphAttributes.position[0] = new THREE.Float32BufferAttribute(
  //     sphereFormation,
  //     3
  //   );

  //   instance.current.updateMorphTargets();
  // });

  const map = useLoader(THREE.TextureLoader, "/images/carbon_normal.jpg");

  return (
    <instancedMesh
      // position={[0.5, 0.5, 0.5]}
      receiveShadow
      castShadow
      ref={instance}
      args={[null, null, TOT]}
      morphTargetInfluences={[1]}
    >
      {onHold ? (
        <sphereBufferGeometry args={[0.5, 32, 32]} />
      ) : (
        <boxBufferGeometry args={[1, 1, 1]} />
      )}

      {/* <meshNormalMaterial morphTargets metalness={0.5} roughness={2} /> */}
      {/* <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      /> */}
      <meshPhongMaterial
        morphTargets
        attach="material"
        vertexColors={THREE.VertexColors}
        // color={new THREE.Color("#1e1e1e")}
        normalMap={map}
        normalScale={[1, 1]}
        normalMap-wrapS={THREE.RepeatWrapping}
        normalMap-wrapT={THREE.RepeatWrapping}
        normalMap-repeat={[10, 10]}
        metalness={5}
        roughness={5}
      />
    </instancedMesh>
  );
}
