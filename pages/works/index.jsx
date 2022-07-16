import React, { useCallback, useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { listWorks } from "../../constants/listWorks";
import useStore from "../../store";

const Item = ({ work, index }) => {
  const setIndex = useStore((state) => state.setIndex);
  const itemRef = useRef();
  const [hover, setHover] = useState(false);
  const constraint = 25;
  const router = useRouter();
  //animate
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setIndex(index);
      controls.start({
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.8,
          type: "spring",
        },
      });
    } else {
      controls.start({
        scale: 0,
        opacity: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, controls]);

  const [calc, setCalc] = useState([0, 0]);

  const handleMouseMove = useCallback(
    (e) => {
      let box = itemRef.current.getBoundingClientRect();
      let calcX = (e.clientY - box.y - box.height / 2) / 20;
      let calcY = (e.clientX - box.x - box.width / 2) / 20;
      if (inView) {
        setCalc([calcX, calcY]);
      }
    },
    [inView]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className="relative w-full h-full" onMouseMove={handleMouseMove}>
      <motion.div
        ref={ref}
        animate={controls}
        className="w-full h-full flex justify-center items-center snap-center"
      >
        <Link href={work.link}>
          <div
            ref={itemRef}
            className={`${
              !isMobile && "work-item"
            } transform-3d relative h-[200px] sm:h-[300px] lg:h-[500px] w-[80%] md:w-[60%] overflow-hidden`}
            style={{
              transform: `rotateX(${calc[0]}deg) rotateY(${calc[1]}deg)`,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            //   onClick={() => router.push(work.link)}
          >
            <Image src={work.image} alt="item" layout="fill" />

            <div
              className={`absolute bottom-0 left-0 w-full p-4 ease-in-out duration-500 bg-[rgba(0,0,0,.6)] ${
                isMobile
                  ? "translate-y-0"
                  : hover
                  ? "translate-y-0"
                  : "translate-y-full"
              }`}
            >
              <h1 className="text-2xl md:text-4xl uppercase">{work.name}</h1>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

const Carousel = () => {
  const scrollRef = useRef();
  const { query: queryParams } = useRouter();
  console.log(queryParams.current);

  const [viewportRef, embla] = useEmblaCarousel({
    axis: "y",
    skipSnaps: false,
    loop: true,
    align: "end",
  });

  useEffect(() => {
    if (!queryParams.current) return;
    embla && embla.scrollTo(queryParams.current);
  }, [embla, queryParams]);

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
        {listWorks.map((work, index) => (
          <Item work={work} key={index} index={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default function Works() {
  const index = useStore((state) => state.index);
  return (
    <div className="absolute top-0 left-0 w-full h-screen z-[1000] overflow-hidden">
      <Carousel />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl py-7 ease-in-out duration-300">
        {index.toString().padStart(2, "0")}/
        {listWorks.length.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
