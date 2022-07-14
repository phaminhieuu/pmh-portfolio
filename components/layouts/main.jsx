import { useProgress } from "@react-three/drei";
import Head from "next/head";
import React from "react";
import Loader from "../Loader";
import Scene from "../Scene";
import Navbar from "../navbar";

export default function Main({ children, router }) {
  const { loaded } = useProgress();
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
      <Scene path={router.asPath} />

      {loaded === 0 && <Loader />}
    </>
  );
}
