import React, { Fragment, useCallback, useEffect, useState } from "react";
import useStore from "../store";

export default function Home() {
  // const [alpha, setAlpha] = useState("asdasdasd");
  const setHaveBg = useStore((state) => state.setHaveBg);
  useEffect(() => {
    setHaveBg(false);
  }, [setHaveBg]);

  const handleOrientation = useCallback((e) => {
    // console.log(e.alpha);
    // setAlpha(e.alpha);
  }, []);

  useEffect(() => {
    window.addEventListener("deviceorientation", handleOrientation, true);

    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [handleOrientation]);
  return <div className="fixed"></div>;
}
