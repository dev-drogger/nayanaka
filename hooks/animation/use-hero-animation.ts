"use no memo";

import { useRef } from "react";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

const useHeroAnimation = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const videoRef = useRef(null);
  const descRef = useRef(null);
  const heroTitle = useRef(null);
  const letterBoxRef = useRef(null);

  // separate concerns into separate refs
  const entranceTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const pinTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const splitRef = useRef<SplitText | null>(null); // moved out of local scope

  useGSAP(() => {
    gsap.set([videoRef.current, descRef.current, letterBoxRef.current], {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    splitRef.current = new SplitText(heroTitle.current!, {
      type: "lines, chars",
      mask: "lines",
    });

    entranceTimelineRef.current = gsap
      .timeline()
      .fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .to(
        letterBoxRef.current,
        {
          clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
          duration: 2,
          ease: "power4.out",
          immediateRender: true,
        },
      )
      .fromTo(
        splitRef.current.lines,
        { y: 20, autoAlpha: 0 },
        { duration: 0.6, y: 0, autoAlpha: 1, stagger: 0.05 },
      )
      .to(videoRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
        duration: 1,
        ease: "power4.out",
        immediateRender: true,
      })
      .to(
        descRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          duration: 1,
          ease: "power4.out",
          immediateRender: true,
        },
        "<+=0.2",
      );

    entranceTimelineRef.current.then(() => {
      entranceTimelineRef.current?.kill();
      entranceTimelineRef.current = null;
      pinTimelineRef.current?.invalidate();
    });

    pinTimelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 0.5,
        pin: true,
        fastScrollEnd: true,
      },
    });

    pinTimelineRef.current
      ?.fromTo(
        letterBoxRef.current,
        { clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)" },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          immediateRender: false,
          duration: 1,
        },
      )
      .to(
        splitRef.current.chars,
        {
          y: -75,
          opacity: 0,
          immediateRender: false,
          force3D: true,
          stagger: 0.05,
          duration: 2,
        },
        "<1.9",
      )
      .fromTo(
        videoRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
          immediateRender: false,
          duration: 2,
        },
      )
      .fromTo(
        descRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
          immediateRender: false,
          duration: 2,
        },
        "<0.1",
      )
      .to(
        pathRef.current,
        {
          opacity: 0,
          immediateRender: false,
          duration: 2,
        },
        "<0.5",
      );

    return () => {
      pinTimelineRef.current?.kill();
      pinTimelineRef.current = null;
    };
  }, []);

  return { sectionRef, pathRef, videoRef, descRef, heroTitle, letterBoxRef };
};

export default useHeroAnimation;
