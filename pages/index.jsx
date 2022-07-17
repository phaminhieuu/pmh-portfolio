import React, { Fragment, useEffect } from "react";
import useStore from "../store";

export default function Home() {
  const setHaveBg = useStore((state) => state.setHaveBg);
  useEffect(() => {
    setHaveBg(false);
  }, [setHaveBg]);
  return <Fragment></Fragment>;
}
