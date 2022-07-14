import React, { useEffect } from "react";
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
          bounce: 0.3,
        },
      });
    } else {
      controls.start({
        y: "100%",
        opacity: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, controls]);
  return (
    // <motion.div ref={ref} animate={controls} className="w-full">
    <div className="w-full h-screen flex justify-center items-center snap-start">
      <div className="h-[80%] w-[60%] bg-orange-50 opacity-70 flex justify-center items-center">
        <h1 className="text-3xl text-red-400">Section {item}</h1>
      </div>
    </div>
    // </motion.div>
  );
};

const Carousel = () => {
  const [viewportRef, embla] = useEmblaCarousel({
    axis: "y",
    skipSnaps: false,
  });
  return <div className="w-full overflow-hidden" ref={viewportRef}></div>;
};

export default function Works() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen z-[1000] snap-y snap-mandatory overflow-y-auto">
      {/* <Carousel /> */}
      {new Array(20).fill(null).map((_, index) => (
        <Item key={index} item={index + 1} />
      ))}
    </div>
  );
}
