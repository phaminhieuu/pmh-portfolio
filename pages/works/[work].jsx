/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";

const StackTag = () => {
  return (
    <a className="relative p-2 mr-3 mb-3 bg-gray-500 inline-block">
      <span className="ease-linear duration-200">ReactJS</span>
    </a>
  );
};

export default function Tagent() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen z-[1000] overflow-y-auto flex justify-center py-[20vh] bg-[rgba(20,20,20,.6)]">
      <div className="w-[80%] md:w-[60%]">
        <div className="flex items-center mb-10">
          <Link href="/works">
            <div className="flex p-2 bg-[#1e1e1e] border-4 uppercase cursor-pointer mr-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Works
            </div>
          </Link>
          <h1 className="text-5xl font-bold uppercase mr-2">Tagent</h1>
          <div className="font-bold bg-gray-500 p-1 rounded-lg">2021</div>
        </div>

        <div className="my-10 ml-1">
          {/* Website */}
          <div className="flex items-center gap-5 mb-5">
            <p>Website:</p>
            <Link href="https://tagent.vn">
              <div className="flex cursor-pointer bg-[#1e1e1e] p-1 border-4 hover:bg-slate-400]">
                <p>https://tagent.vn</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
              </div>
            </Link>
          </div>

          {/* Description */}
          <div className="flex gap-5 mb-5">
            <p>Description:</p>
            <span>A platform for job hutting for developer</span>
          </div>

          {/* Stack */}
          <div className="flex items-start gap-5 w-full max-h-full">
            <p className="py-2">Stack:</p>
            <div className="">
              {new Array(20).fill(null).map((_, index) => (
                <StackTag key={index} />
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
        <div className="pb-20">
          {new Array(3).fill(null).map((_, index) => (
            <img
              key={index}
              src="/images/works/tagent_01.jpg"
              alt="tagent"
              className="w-full object-cover my-10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
