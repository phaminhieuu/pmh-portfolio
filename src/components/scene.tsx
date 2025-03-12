import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import Wobble from "./wobble";
import { Leva } from "leva";

export default function Scene() {
  return (
    <div className="absolute inset-0">
      <Leva />
      <Canvas dpr={[1, 2]}>
        <Suspense fallback="Loading">
          <Wobble />
         {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
