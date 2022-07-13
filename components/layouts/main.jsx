import Head from "next/head";
import React from "react";
import Model from "../Model";
import Navbar from "../navbar";
import { useProgress } from "@react-three/drei";
import Loader from "../Loader";

export default function Main({ children, router }) {
  const { progress, active, loaded, total } = useProgress();
  console.log(total);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pham Minh Hieu</title>
        <link rel="icon" href="/images/square-dark.png" />
      </Head>

      {loaded === 1 && (
        <>
          <Navbar path={router.asPath} />
          {children}
        </>
      )}
      <Model />

      {loaded === 0 && <Loader />}
    </>
  );
}
