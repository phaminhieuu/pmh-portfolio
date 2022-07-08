import Head from "next/head";
import React from "react";
import Navbar from "../navbar";

export default function Main({ children, router }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pham Minh Hieu</title>
      </Head>

      <Navbar path={router.asPath} />
      {children}
    </>
  );
}
