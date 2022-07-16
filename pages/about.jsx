/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

import Article from "../components/layouts/article";

const Wrapper = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 mb-32">
      {children}
    </div>
  );
};

const Title = ({ children }) => {
  return (
    <h1 className="text-2xl md:text-4xl font-medium uppercase">{children}</h1>
  );
};

const Paragraph = ({ children }) => {
  return <p className="text-sm md:text-xl">{children}</p>;
};

const SocialBtn = ({ children }) => {
  return (
    <div className="relative border-4 w-full p-4 text-sm md:text-xl cursor-pointer hover-btn">
      <span className="relative z-[2000]">{children}</span>
    </div>
  );
};

export default function About() {
  return (
    <Article>
      <div className="w-[80%] md:w-[50%]">
        <Wrapper>
          <img
            src="/images/square-dark.png"
            alt="logo"
            className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]  "
          />
          <Title>Pham Minh Hieu</Title>

          <Paragraph>
            Hi, I&apos;m a Vietnamese creative/front-end developer. I love to
            experiment, with a passion for building and creating cool things.
          </Paragraph>
        </Wrapper>

        <Wrapper>
          <Title>My skills</Title>
          <Paragraph>
            Javascript / HTML / CSS / SASS / SCSS / ReactJS / NextJS / NodeJS /
            ThreeJS / WebGL / SQLServer / MongoDB / Git / Blender / Photoshop
          </Paragraph>
        </Wrapper>

        <Wrapper>
          <Title>Contact</Title>
          <div className="w-full grid grid-cols-2 gap-4">
            <SocialBtn>Facebook</SocialBtn>
            <SocialBtn>Facebook</SocialBtn>
            <SocialBtn>Facebook</SocialBtn>
            <SocialBtn>Facebook</SocialBtn>
          </div>
        </Wrapper>
        <div className="pb-10"></div>
      </div>
    </Article>
  );
}
