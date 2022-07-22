/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Article from "../components/layouts/article";

const Wrapper = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 mb-24 md:mb-28">
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

const SocialBtn = ({ style, text, icon, altIcon, link }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`relative border-4 w-full p-4 text-sm md:text-xl cursor-pointer bg-[rgba(20,20,20,0.9)] hover-btn ${style}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={link}>
        <a target="_blank">
          <div className="relative z-[2000] flex items-center gap-5 p-0">
            <Image
              src={hover ? `/images/icons/${altIcon}` : `/images/icons/${icon}`}
              alt={text}
              width={30}
              height={30}
              style={{ color: "white" }}
            />
            <p>{text}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default function About() {
  return (
    <Article>
      <div className="w-[80%] md:w-[60%] lg:w-[50%]">
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
            ThreeJS / WebGL / SQLServer / MongoDB / Jest / Git / Blender
          </Paragraph>
        </Wrapper>

        <Wrapper>
          <Title>Contact</Title>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialBtn
              icon="email-light.png"
              altIcon="email-dark.png"
              text="Email"
              link="mailto:minhhieupham851999@gmail.com"
              // style="text-gray-400 border-gray-400 hover:text-black before:bg-gray-400 after:bg-gray-400"
            />
            <SocialBtn
              icon="facebook-light.png"
              altIcon="facebook-dark.png"
              text="Facebook"
              link="https://www.facebook.com/harry.pham.3760"
              style="text-blue-500 border-blue-500 hover:text-black before:bg-blue-500 after:bg-blue-500"
            />
            <SocialBtn
              icon="twitter-light.png"
              altIcon="twitter-dark.png"
              text="Twitter"
              link="https://twitter.com/novaaeraa"
              style="text-[#04A9F3] border-[#04A9F3] hover:text-black before:bg-[#04A9F3] after:bg-[#04A9F3]"
            />

            <SocialBtn
              icon="github-dark.png"
              altIcon="github-light.png"
              text="Github"
              link="https://github.com/phamminhhieu85"
            />
          </div>
        </Wrapper>
        <div className="pb-10"></div>
      </div>
    </Article>
  );
}
