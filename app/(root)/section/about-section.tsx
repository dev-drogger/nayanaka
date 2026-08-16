"use client";

import { useMemo, useState, useEffect } from "react";
import { ABOUT_TEXT } from "@/constant";
import { SpinningText } from "@/components/spinning-text";
import { useMediaQuery } from "@/hooks/use-media-query";
import AboutCurtain from "@/components/about-curtain";
import useAboutAnimation from "@/hooks/animation/use-about-animation";
import Planet3D from "@/components/3d-object";
import { useAppSelector } from "@/hooks/redux-hooks";

export default function About() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1]);
  const isMobileHook = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    if (typeof window !== "undefined")
      (() => setDpr([1, Math.min(window.devicePixelRatio, 2)]))();
  }, []);
  const textContent = useMemo(() => ABOUT_TEXT, []);
  const {
    backgroundRef,
    sectionPinRef,
    titleRef,
    assetRef,
    mobileTextRef,
    textRef,
  } = useAboutAnimation();
  const { webGLAttached } = useAppSelector((state) => state.webGL);

  useEffect(() => {
    console.log("web gl attached", webGLAttached)
  }, [webGLAttached])
  return (
    <section
      id="about"
      ref={sectionPinRef}
      className="about h-screen overflow-x-hidden relative py-0 bg-gray-200"
    >
      <AboutCurtain />

      <div
        ref={backgroundRef}
        className="about h-screen relative bg-jet flex-center overflow-hidden"
      >
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-medium absolute text-white font-secondary z-10"
        >
          about <span className="font-amie italic">us</span>
        </h1>

        <div ref={assetRef} className="flex-center">
          <SpinningText
            radius={5}
            fontSize={isMobileHook ? 1.2 : 2}
            className="font-medium leading-none text-white absolute top-8 z-0 left-4 "
          >
            {`about-us • about-us • about-us • `}
          </SpinningText>
          <SpinningText
            radius={5}
            fontSize={isMobileHook ? 1.2 : 2}
            className="font-medium leading-none text-white absolute bottom-8 z-0 right-4 "
          >
            {`nayanaka • creative • studio • `}
          </SpinningText>

          {webGLAttached && (
            <Planet3D
              dpr={dpr}
              isMobileHook={isMobileHook}
              sectionPinRef={sectionPinRef}
            />
          )}
        </div>

        <div ref={textRef} className="overflow-hidden hidden md:block ">
          {textContent.map((text, index) => (
            <h2
              key={index}
              className="uppercase font-medium text-justify text-white text-lg md:text-6xl leading-10 md:leading-20 overflow-hidden"
            >
              {text}
            </h2>
          ))}
        </div>
      </div>
      <div
        ref={mobileTextRef}
        className="overflow-hidden md:hidden absolute md:relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-12 md:px-16 h-full py-56 flex-col flex justify-center items-start w-full"
      >
        {textContent.map((text, index) => (
          <h3
            key={index}
            className="uppercase font-medium justify text-white text-xs leading-6 overflow-hidden"
          >
            {text}
          </h3>
        ))}
      </div>
    </section>
  );
}
