import React, { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import ScrollTopBtn from "../ScrollTopBtn";
import useStore from "../../store";

export default function Article({ children }) {
  const top = useRef();
  const container = useRef();
  const setHaveBg = useStore((state) => state.setHaveBg);
  const haveBg = useStore((state) => state.haveBg);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const handleScrollToTop = () => {
    container.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = useCallback(() => {
    if (!top.current) return;
    const offsetY = top.current.getBoundingClientRect().y;
    if (offsetY < 87) {
      setHaveBg(true);
    } else {
      setHaveBg(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="absolute top-0 left-0 w-full h-screen z-[1000] text-sm sm:text-xl overflow-hidden overflow-y-auto py-[15vh] bg-[rgba(20,20,20,.6)]"
      onScroll={handleScroll}
      ref={container}
    >
      <div ref={top}></div>
      <motion.article
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.6, type: "easeInOut" }}
        className="w-full h-screen flex justify-center"
      >
        {children}
      </motion.article>
      <ScrollTopBtn show={haveBg} scrollTop={handleScrollToTop} />
    </div>
  );
}
