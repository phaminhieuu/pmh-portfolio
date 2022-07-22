import React from "react";
import { EffectComposer, DotScreen, Glitch } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Effect = () => {
  return (
    <EffectComposer>
      {/* <DotScreen
        blendFunction={BlendFunction.NORMAL}
        angle={Math.PI * 0.5}
        scale={1.0}
      /> */}
      <Glitch />
    </EffectComposer>
  );
};

export default React.memo(Effect);
