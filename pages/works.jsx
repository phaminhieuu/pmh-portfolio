import React, { useCallback, useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";

const Item = ({ item }) => {
  //animate
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 2,
          type: "spring",
        },
      });
    } else {
      controls.start({
        y: 100,
        opacity: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, controls]);

  return (
    <div className="relative w-full h-full ">
      <motion.div
        ref={ref}
        animate={controls}
        className="w-full h-full flex justify-center items-center snap-center"
      >
        <div className="h-[200px] sm:h-[300px] lg:h-[500px] w-[80%] md:w-[60%] bg-orange-50 opacity-70 flex justify-center items-center">
          <h1 className="text-3xl text-red-400">Section {item}</h1>
        </div>
      </motion.div>
    </div>
  );
};

const Carousel = () => {
  const scrollRef = useRef();

  const [viewportRef, embla] = useEmblaCarousel(
    {
      axis: "y",
      skipSnaps: false,
      loop: true,
      align: "end",
    }
  );

  const handleScroll = useCallback(
    (e) => {
      if (scrollRef) {
        clearTimeout(scrollRef.current);
      }

      scrollRef.current = setTimeout(() => {
        if (e.deltaY < 0) {
          embla && embla.scrollPrev();
        } else if (e.deltaY > 0) {
          embla && embla.scrollNext();
        }
      }, 100);
    },
    [embla]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="w-full overflow-hidden" ref={viewportRef}>
      <div className="h-screen">
        {new Array(20).fill(null).map((_, index) => (
          <Item key={index} item={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default function Works() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen z-[1000] overflow-hidden">
      <Carousel />
    </div>
  );
}
