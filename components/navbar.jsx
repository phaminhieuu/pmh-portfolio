import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Logo from "./logo";
import NextLink from "next/link";
import { useInView } from "react-intersection-observer";
import { checkPath } from "../utils/function";

const LinkItem = ({ href, path, children }) => {
  let active = false;
  if (href === "/") {
    active = href === path;
  } else {
    active = checkPath(href, path);
  }

  return (
    <NextLink href={href} replace>
      <div className="relative text-xl">
        <div className={`custom-link ${active && "active-link"}`}>
          <a className="cursor-pointer">{children}</a>
        </div>
      </div>
    </NextLink>
  );
};

const LinkItemAnimate = ({ href, path, children, duration, setIsOpen }) => {
  let active = false;
  if (href === "/") {
    active = href === path;
  } else {
    active = checkPath(href, path);
  }
  //animate
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: duration,
          type: "spring",
          bounce: 0.3,
        },
      });
    } else {
      controls.start({
        y: 20,
        opacity: 0,
      });
    }
  }, [inView, duration, controls]);

  return (
    <NextLink href={href}>
      <motion.div ref={ref} animate={controls}>
        <div
          className="relative text-xl"
          ref={ref}
          onClick={() => setIsOpen(false)}
        >
          <div className={`custom-link ${active && "active-link"}`}>
            <a className="cursor-pointer">{children}</a>
          </div>
        </div>
      </motion.div>
    </NextLink>
  );
};

const Drawer = ({ href, path, children, isOpen, setIsOpen }) => {
  return (
    <div
      className={`top-0 right-0 fixed bg-[#222222] opacity-80 w-screen sm:w-[180px] h-full ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } ease-in-out duration-300 md:hidden flex flex-col justify-end items-end gap-8 pr-10 pb-24`}
    >
      <LinkItemAnimate href="/" path={path} duration={1} setIsOpen={setIsOpen}>
        Home
      </LinkItemAnimate>
      <LinkItemAnimate
        href="/works"
        path={path}
        duration={1.4}
        setIsOpen={setIsOpen}
      >
        Works
      </LinkItemAnimate>
      <LinkItemAnimate
        href="/about"
        path={path}
        duration={1.8}
        setIsOpen={setIsOpen}
      >
        About
      </LinkItemAnimate>
    </div>
  );
};

export default function Navbar({ path }) {
  const [isOpen, setIsOpen] = useState(false);
  const [background, setBackground] = useState(false);

  const handleScroll = useCallback(() => {
    console.log(window.scrollY);
    if (window.scrollY > 25) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  }, []);

  useEffect(() => {
    // Handler to call on window scroll

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScroll]);

  return (
    <div
      className={`fixed z-[2000] w-full flex justify-between ${
        background && "bg-[rgb(20,20,20)]"
      }`}
      as="nav"
    >
      <Logo path={path} />

      <div className="md:block hidden">
        <div className="flex p-6 gap-10">
          <LinkItem href="/" path={path}>
            Home
          </LinkItem>
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/about" path={path}>
            About
          </LinkItem>
        </div>
      </div>

      <button
        className={`fixed z-[1001] md:hidden w-7 h-7 mr-10 mb-8 bottom-0 right-0 ${
          isOpen && "menu-opened"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p id="btnMenu">
          <span className="menu_line"></span>
          <span className="menu_line"></span>
          <span className="menu_line"></span>
        </p>
      </button>

      <Drawer isOpen={isOpen} path={path} setIsOpen={setIsOpen} />
    </div>
  );
}
