"use client";

import { useRef, useCallback, useMemo, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ABOUT_TEXT } from "@/constant";
import { SpinningText } from "@/components/spinning-text";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Canvas } from "@react-three/fiber";
import { Planet } from "@/components/planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutCurtain from "@/components/about-curtain";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1]);
  const isMobileHook = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    if (typeof window !== undefined)
      setDpr([1, Math.min(window.devicePixelRatio, 2)]);
  }, []);

  const backgroundTimeline = useRef<gsap.core.Timeline>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const sectionPinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const assetRef = useRef<HTMLDivElement>(null);
  const mobileTextRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textEnterTimeline = useRef<gsap.core.Timeline>(null);
  const textExitTimeline = useRef<gsap.core.Timeline>(null);
  const textContent = useMemo(() => ABOUT_TEXT, []);
  const scrollTriggerRef = useRef<ScrollTrigger | undefined>(undefined);

  const getH2Elements =
    useCallback((): NodeListOf<HTMLHeadingElement> | null => {
      if (!textRef.current || !mobileTextRef.current) return null;
      const elements = isMobileHook
        ? mobileTextRef.current.querySelectorAll<HTMLDivElement>("h3")
        : textRef.current.querySelectorAll<HTMLHeadingElement>("h2");
      return elements.length > 0 ? elements : null;
    }, [isMobileHook]);

  useGSAP(() => {
    const h2Elements = getH2Elements();
    if (!h2Elements) return;

    gsap.set(h2Elements, {
      y: 20,
      opacity: 0,
    });

    gsap.set(backgroundRef.current, {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 768px", isDesktop: "(min-width: 769px)" },
      (context) => {
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isMobile, isDesktop } = context.conditions as {
          isMobile: boolean;
          isDesktop: boolean;
        };
        backgroundTimeline.current = gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionPinRef.current,
              start: "center center",
              end: "center+=3500 center",
              scrub: 0.5,
              pin: true,
            },
          })
          .to(backgroundRef.current, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
            duration: 1,
          })
          .from(
            titleRef.current,
            {
              scale: isMobile ? 1.5 : 3,
              duration: 1,
            },
            "<",
          )
          .to("#curtain", { opacity: 0, duration: 1 }, "<")
          .to(titleRef.current, {
            opacity: 0,
            delay: 2,
            duration: 0.5,
          })
          .to(assetRef.current, { opacity: 0, duration: 0.5 }, "<");

        // Add a label here to mark where scale animation should start
        backgroundTimeline.current.addLabel("scaleStart");

        backgroundTimeline.current.to(backgroundRef.current, {
          scaleX: isMobile ? 0.8 : 0.7,
          duration: 2,
          delay: 0.3,
          scaleY: isMobile ? 0.3 : 0.7,
        });

        // Add label after scale completes
        backgroundTimeline.current.addLabel("textEnterStart");

        // Create enter timeline
        textEnterTimeline.current = gsap.timeline();
        h2Elements?.forEach((h2: HTMLHeadingElement, index: number) => {
          textEnterTimeline.current!.to(
            h2,
            {
              y: 0,
              opacity: 1,
              duration: 1,
              immediateRender: false,
            },
            index * 0.3,
          );
        });

        // Add enter timeline
        backgroundTimeline.current.add(
          textEnterTimeline.current,
          "textEnterStart",
        );

        // Add label for exit animations
        backgroundTimeline.current.addLabel("textExitStart", "+=3.5");

        // Create exit timeline
        textExitTimeline.current = gsap.timeline();
        h2Elements?.forEach((h2: HTMLHeadingElement, index: number) => {
          const reverseIndex = h2Elements.length - 1 - index;
          textExitTimeline.current!.fromTo(
            h2,
            { y: 0, opacity: 1 },
            {
              y: -20,
              opacity: 0,
              duration: 1,
              immediateRender: false,
            },
            reverseIndex * 0.3,
          );
        });

        // Add exit timeline
        backgroundTimeline.current.add(
          textExitTimeline.current,
          "textExitStart",
        );

        backgroundTimeline.current.to(
          backgroundRef.current,
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
            immediateRender: false,
            duration: 1.5,
          },
          "<+=1.5",
        );

        scrollTriggerRef.current = backgroundTimeline.current.scrollTrigger;
      },
    );

    return () => {
      if (textEnterTimeline.current) {
        textEnterTimeline.current.kill();
      }
      if (textExitTimeline.current) {
        textExitTimeline.current.kill();
      }
      if (backgroundTimeline.current) {
        backgroundTimeline.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      // Clear refs
      backgroundTimeline.current = null;
      textEnterTimeline.current = null;
      textExitTimeline.current = null;
      scrollTriggerRef.current = undefined;
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionPinRef}
      className="about h-screen overflow-x-hidden relative py-0"
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

          <figure
            className="absolute inset-0 -z-50"
            style={{ width: "100vw", height: "100vh" }}
          >
            <Canvas
              shadows
              camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
              gl={{
                powerPreference: "high-performance",
                preserveDrawingBuffer: true,
                antialias: true,
                stencil: false,
                depth: true,
              }}
              dpr={dpr}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener("webglcontextlost", (e) => {
                  e.preventDefault();
                  console.warn(
                    "[R3F] WebGL context lost (tab switch, unmount, or GPU limit). Reload to restore.",
                  );
                });
              }}
            >
              <ambientLight intensity={0.5} />
              <Float speed={0.5}>
                <Planet
                  scale={isMobileHook ? 0.5 : 1}
                  triggerRef={sectionPinRef}
                />
              </Float>
              <Environment resolution={128} backgroundBlurriness={0.5}>
                <group rotation={[-Math.PI / 3, 4, 1]}>
                  <Lightformer
                    form={"circle"}
                    intensity={2}
                    position={[0, 5, -9]}
                    scale={10}
                  />
                  <Lightformer
                    form={"circle"}
                    intensity={2}
                    position={[0, 3, 1]}
                    scale={10}
                  />
                  <Lightformer
                    form={"circle"}
                    intensity={2}
                    position={[-5, -1, -1]}
                    scale={10}
                  />
                  <Lightformer
                    form={"circle"}
                    intensity={2}
                    position={[10, 1, 0]}
                    scale={16}
                  />
                </group>
              </Environment>
            </Canvas>
          </figure>
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
        className="overflow-hidden md:hidden absolute md:relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-16 h-full py-56 flex-col flex justify-center items-start w-full"
      >
        {textContent.map((text, index) => (
          <h3
            key={index}
            className="uppercase font-medium md:text-justify text-white text-xs md:text-6xl leading-6 md:leading-20 overflow-hidden"
          >
            {text}
          </h3>
        ))}
      </div>
    </section>
  );
}
