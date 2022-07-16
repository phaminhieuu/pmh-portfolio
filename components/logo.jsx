import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Logo({ path }) {
  const [line, setLine] = useState("Pham Minh Hieu");
  const [subLine, setSubline] = useState("--Creative/Front-end Developer--");
  

  useEffect(() => {
    if (path === "/") {
      setLine("Pham Minh Hieu");
      setSubline("--Creative/Front-end Developer--");
    } else if (path.includes("works")) {
      setLine("Works");
      setSubline("--Projects and Clients--");
    } else if (path === "/about") {
      setLine("About");
      setSubline("--My profile--");
    }
  }, [path]);

  

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 2,
        staggerChildren: 0.1,
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
    <div className="flex-col gap-5 p-3">
      <Link href="/">
        <a>
          <div className="font-bold text-2xl md:text-3xl uppercase flex items-center gap-3 ease-in-out duration-300">
            <Image
              src="/images/square-dark.png"
              width={30}
              height={30}
              alt="logo"
              style={{ color: "white" }}
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
      <motion.p
        variants={sentence}
        initial="hidden"
        animate="visible"
        className="my-2 text-sm md:text-xl"
      >
        {subLine.split("").map((char, index) => {
          return (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          );
        })}
      </motion.p>
      {/* <div className="my-2 text-sm md:text-xl ease-in-out duration-300"></div> */}
    </div>
  );
}
