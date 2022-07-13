import React from "react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed bg-black w-screen h-screen top-0 left-0 flex justify-center items-center z-[2000]">
      <Image
        src="/images/square-dark.png"
        width={60}
        height={60}
        alt="logo"
        className="animate-spin"
      />
    </div>
  );
}
