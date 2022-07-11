import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Logo() {
  const line = "Pham Minh Hieu";

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.04,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div className="flex-col gap-5 p-5">
      <Link href="/">
        <a>
          <div className="font-bold text-2xl md:text-3xl uppercase flex items-center gap-3 ease-in-out duration-300">
            <Image
              src="/images/footprint-dark.png"
              width={30}
              height={30}
              alt="logo"
            />
            <motion.p variants={sentence} initial="hidden" animate="visible">
              {line.split("").map((char, index) => {
                return (
                  <motion.span key={index} variants={letter}>
                    {char}
                  </motion.span>
                );
              })}
            </motion.p>
          </div>
        </a>
      </Link>
      <div className="my-2 text-sm md:text-xl ease-in-out duration-300">--Creative/Front-end Developer--</div>
    </div>
  );
}
