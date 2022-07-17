import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollTopBtn = ({ scrollTop, show }) => {
  //animate
  const controls = useAnimation();

  useEffect(() => {
    if (show) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          type: "spring",
        },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 50,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, controls]);
  return (
    <motion.div
      onClick={scrollTop}
      animate={controls}
      className="fixed bottom-0 right-0 text-base cursor-pointer md:text-2xl flex flex-col justify-center items-center mb-20 mr-10 md:mb-5 md:mr-10 border-2 p-1 bg-[rgba(20,20,20,.8)] hover:bg-black ease-linear duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 md:h-10 md:w-10 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      Top
    </motion.div>
  );
};

export default ScrollTopBtn;
