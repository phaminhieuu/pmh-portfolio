/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { listWorkDetail } from "../../constants/listWorks";

const StackTag = ({ stack }) => {
  return (
    <a className="relative p-2 mr-3 mb-3 bg-gray-500 inline-block">
      <span className="ease-linear duration-200">{stack}</span>
    </a>
  );
};

const WorkImage = ({ image }) => {
  //animate
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.6,
          type: "easeInOut",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, controls]);

  return (
    <motion.img
      initial={{ scale: 0, opacity: 0 }}
      ref={ref}
      animate={controls}
      src={`/images/works${image}`}
      alt="tagent"
      className="w-full object-cover my-10"
      lazy="true"
    />
  );
};

export default function WorkDetail() {
  const router = useRouter();
  const [work, setWork] = useState(listWorkDetail[0]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  useEffect(() => {
    if (!router.query) return;
    const currentWork = router.query.work;
    const workItem = listWorkDetail.find((w) => w.path === currentWork);
    setWork(workItem);
  }, [router]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[1000] text-xs sm:text-base overflow-hidden overflow-y-auto py-[20vh] bg-[rgba(20,20,20,.6)]">
      <motion.article
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.6, type: "easeInOut" }}
        className="w-full h-screen flex justify-center"
      >
        <div className="w-[80%] md:w-[60%]">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center mb-10">
            <Link href="/works">
              <div className="relative flex p-1 sm:p-2 bg-[#1e1e1e] border-4 uppercase cursor-pointer mr-10 hover-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  style={{ zIndex: 2000 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="relative z-[2000]">Works</span>
              </div>
            </Link>
            <div className="flex items-center">
              <h1 className="text-4xl sm:text-5xl font-bold uppercase mr-2">{work.name}</h1>
              <div className="font-bold bg-gray-500 p-1 rounded-lg">
                {work.year}
              </div>
            </div>
          </div>

          <div className="my-10 ml-1">
            {/* Website */}
            <div className="flex items-center gap-5 mb-5">
              <p>Website:</p>
              <Link
                href={
                  work.website === "Private"
                    ? "javascript: void(0)"
                    : work.website
                }
                target="_blank"
              >
                <div className="relative flex cursor-pointer bg-[#1e1e1e] p-1 border-4 hover-btn">
                  <span className="relative z-[2000]">{work.website}</span>
                  {work.website !== "Private" && (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-6 sm:w-6 relative z-[2000]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Description */}
            <div className="flex gap-5 mb-5">
              <p>Description:</p>
              <span>{work.description}</span>
            </div>

            {/* Stack */}
            <div className="flex items-start gap-5 w-full max-h-full">
              <p className="py-2">Stack:</p>
              <div className="">
                {work.stack.map((stack, index) => (
                  <StackTag stack={stack} key={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          {/* {new Array(3).fill(null).map((_, index) => (
          <Image
            key={index}
            src="/images/works/tagent_01.jpg"
            alt="item"
            width={600}
            height={300}
            layout="intrinsic"
            objectFit="cover"
            priority
          />
        ))} */}
          <div className="pb-10">
            {work.image.map((image, index) => (
              <WorkImage key={index} image={image} />
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
