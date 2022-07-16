/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { listWorkDetail } from "../../constants/listWorks";
import useStore from "../../store";
import ScrollTopBtn from "../../components/ScrollTopBtn";
import Article from "../../components/layouts/article";

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
      className="w-full object-cover my-10 cursor-pointer"
      lazy="true"
    />
  );
};

export default function WorkDetail() {
  const backBtn = useRef();
  const container = useRef();
  const router = useRouter();
  const [work, setWork] = useState(listWorkDetail[0]);
  const setHaveBg = useStore((state) => state.setHaveBg);

  useEffect(() => {
    if (!router.query) return;
    const currentWork = router.query.work;
    const workItem = listWorkDetail.find((w) => w.path === currentWork);
    setWork(workItem);
  }, [router]);

  return (
    <Article>
      <div className="w-[80%] md:w-[60%]">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center mb-10">
          <Link href={{ pathname: "/works", query: { current: work.index } }}>
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
            <h1 className="text-3xl sm:text-5xl font-bold uppercase mr-2">
              {work.name}
            </h1>
            <div className="font-bold bg-gray-500 p-1 rounded-lg">
              {work.year}
            </div>
          </div>
        </div>

        <div className="my-10 ml-1 w-full">
          {/* Website */}
          <div className="flex items-center gap-5 mb-5">
            <p>Website:</p>
            <Link
              href={
                work.website === "Private"
                  ? "javascript: void(0)"
                  : work.website
              }
            >
              <a target="_blank">
                <div className="relative flex items-center gap-2 cursor-pointer bg-[#1e1e1e] p-1 border-4 hover-btn">
                  <span className="relative z-[2000] flex-grow break-all">
                    {work.website}
                  </span>
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
              </a>
            </Link>
          </div>

          {/* Description */}
          <div className="flex gap-5 mb-5">
            <p>Description:</p>
            <span>{work.description}</span>
          </div>

          {/* Role */}
          <div className="flex items-start gap-5 mb-5">
            <p className="py-2">Role:</p>
            <div>
              {work.role.map((r, index) => (
                <StackTag stack={r} key={index} />
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="flex gap-5">
            <p className="py-2">Stack:</p>
            <div>
              {work.stack.map((stack, index) => (
                <StackTag stack={stack} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="pb-10">
          {work.image.map((image, index) => (
            <WorkImage key={index} image={image} />
          ))}
        </div>
      </div>
    </Article>
  );
}
