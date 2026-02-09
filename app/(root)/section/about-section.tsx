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

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const [dpr, setDpr] = useState<[number, number]>([1, 1]);

  useEffect(() => {
    if (typeof window !== undefined)
      setDpr([1, Math.min(window.devicePixelRatio, 2)]);
  }, []);
  const isMobile = useMediaQuery("(max-width: 700px)");

  const boxRef = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const assetRef = useRef<HTMLDivElement>(null);
  const textEnterTimeline = useRef<gsap.core.Timeline>(null);
  const textExitTimeline = useRef<gsap.core.Timeline>(null);
  const textContent = useMemo(() => ABOUT_TEXT, []);

  const getH2Elements =
    useCallback((): NodeListOf<HTMLHeadingElement> | null => {
      if (!textRef.current) return null;
      const elements =
        textRef.current.querySelectorAll<HTMLHeadingElement>("h2");
      return elements.length > 0 ? elements : null;
    }, []);

  useGSAP(() => {
    const h2Elements = getH2Elements();
    if (!h2Elements) return;

    gsap.set(h2Elements, {
      y: 20,
      opacity: 0,
    });

    gsap.to(boxRef.current, {
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top+=395 center",
        end: "center+=2700 center",
        scrub: 0.5,
        pin: true,
      },
    });

    gsap.set(boxRef2.current, {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    gsap.to(boxRef2.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
      ease: "power4.out",
      scrollTrigger: {
        trigger: boxRef2.current,
        start: "center center",
        end: "+=600 center",
        scrub: 0.5,
      },
    });

    gsap.to(boxRef2.current, {
      scaleX: 0.7,
      scaleY: isMobile ? 0.1 : 0.7,
      ease: "power4.out",
      scrollTrigger: {
        trigger: boxRef2.current,
        start: "center+=800 center",
        end: "bottom+=650 center",
        scrub: 0.5,
      },
    });

    gsap.to(boxRef2.current, {
      clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
      immediateRender: false,
      scrollTrigger: {
        trigger: boxRef2.current,
        start: "center+=1700 center",
        end: "+=900",
        scrub: 0.5,
      },
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "center center",
          end: "+=400 center",
          scrub: 0.5,
        },
      })
      .from(titleRef.current, {
        scale: 3,
      })
      .to("#background", { opacity: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "center+=550 center",
          end: "center+=580 center",
          scrub: 0.5,
        },
      })
      .to(titleRef.current, {
        opacity: 0,
      })
      .to(assetRef.current, { opacity: 0 }, "<");

    h2Elements?.forEach((h2: HTMLHeadingElement, index: number) => {
      const reverseIndex = h2Elements.length - 1 - index;

      textEnterTimeline.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: "center+=1000 center",
            end: "+=200",
            scrub: 0.5,
            id: "h2Enter",
            fastScrollEnd: true,
            preventOverlaps: "textSequence",
          },
        })
        .to(
          h2,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            immediateRender: false,
          },
          index * 0.3,
        );

      textExitTimeline.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: textRef.current,
            start: "center+=1400 center",
            end: "+=800",
            scrub: 0.5,
            id: "h2Exit",
            fastScrollEnd: true,
            preventOverlaps: "textSequence",
          },
        })
        .fromTo(
          h2,
          { y: 0, opacity: 1 },
          {
            y: -20,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
            immediateRender: false,
          },
          reverseIndex * 0.3,
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={boxRef}
      className="about h-screen overflow-x-hidden relative py-0"
    >
      <div id="background">
        <div className="absolute top-20 w-screen flex-center">
          <h1 className="text-jet font-amie italic">introducing</h1>
        </div>
        <div className="absolute md:px-40 top-40 w-screen flex flex-col items-center justify-center">
          <h1 className="text-jet text-7xl md:text-9xl font-medium uppercase">
            Nayanaka
          </h1>
          <h1 className="text-jet font-amie tracking-widest uppercase w-full text-center">
            Creative Studio
          </h1>
        </div>

        <div className="bg-jet w-screen flex gap-8 whitespace-nowrap absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-hidden">
          {Array.from({ length: 22 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center leading-none"
            >
              <p className="text-xs m-0 p-0">なやなか</p>
              <p className="text-xs m-0 p-0 -translate-x-8">なやなか</p>
            </div>
          ))}
        </div>
        <div className="absolute font-secondary bottom-30 flex-col-center w-screen">
          <h3 className="text-jet text-center">
            Making your contribution{" "}
            <span className="md:inline block">
              to innovation and development is a true miracle
            </span>
          </h3>
          <h3 className="text-jet">
            Each of us capable of it. you are invited to participate in
          </h3>
          <h3 className="text-jet">turning dreams into reality</h3>
        </div>
      </div>

      <div
        ref={boxRef2}
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
            fontSize={isMobile ? 1.2 : 2}
            className="font-medium leading-none text-white absolute top-8 z-0 left-4 "
          >
            {`about-us • about-us • about-us • `}
          </SpinningText>
          <SpinningText
            radius={5}
            fontSize={isMobile ? 1.2 : 2}
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
                <Planet scale={isMobile ? 0.5 : 1} triggerRef={boxRef} />
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

        <div ref={textRef} className="overflow-hidden">
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
    </section>
  );
}
