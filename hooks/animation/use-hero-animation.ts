import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const useHeroAnimation = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const videoRef = useRef(null);
  const descRef = useRef(null);
  const heroTitle = useRef(null);
  const scrollTimeline = useRef<gsap.core.Timeline>(null);
  const heroTimeline = useRef<gsap.core.Timeline>(null);

  useGSAP(() => {
    gsap.set(["#hero", videoRef.current, descRef.current], {
      willChange: "clip-path",
    });
    gsap.set("#hero", {
      clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    });

    const split = new SplitText(heroTitle.current!, {
      type: "lines, chars",
      mask: "lines",
    });

    heroTimeline.current = gsap.timeline();

    heroTimeline.current
      .fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(
        "#hero",
        { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" },
        {
          clipPath: "polygon(0 85%, 100% 85%, 100% 15%, 0 15%)",
          duration: 2,
          ease: "power4.out",
        },
      )
      .fromTo(
        split.lines,
        { y: 20, autoAlpha: 0 },
        {
          duration: 0.6,
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
        },
      )
      .fromTo(
        videoRef.current,
        { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          duration: 1,
          ease: "power4.out",
        },
      )
      .fromTo(
        descRef.current,
        { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)" },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
          duration: 1,
          ease: "power4.out",
        },
        "<+=0.2",
      )
      .to("#hero", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .to(split.chars, {
        y: -75,
        opacity: 0,
        immediateRender: false,
        force3D: true,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=600 top",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .to(pathRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=600 top",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .to(videoRef.current, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
        immediateRender: false,
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=650 top",
          end: "+=200",
          scrub: 0.5,
        },
      })
      .to(descRef.current, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
        immediateRender: false,
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=600 top",
          end: "+=200",
          scrub: 0.5,
        },
      });

    scrollTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 0.5,
        pin: true,
      },
    });

    return () => {
      if (scrollTimeline.current) scrollTimeline.current.scrollTrigger?.kill();
      if (heroTimeline.current) {
        heroTimeline.current.scrollTrigger?.kill();
        heroTimeline.current.kill();
      }
      split.revert();
      scrollTimeline.current = null;
      heroTimeline.current = null;
    };
  }, []);

  return { sectionRef, pathRef, videoRef, descRef, heroTitle };
};

export default useHeroAnimation;
