import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin, DrawSVGPlugin);

const useServiceAnimation = () => {
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const plusRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const plusTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const nayanakaRef = useRef(null);
  const textRefs = useRef<(SVGElement | null)[]>([]);
  const titleRef = useRef(null);
  useGSAP(() => {
    const triggers: ScrollTrigger[] = [];
    const titleTimeline = gsap
      .timeline({ scrollTrigger: { trigger: titleRef.current } })
      .from(titleRef.current, {
        duration: 0.6,
        y: 20,
        delay: 0.5,
        autoAlpha: 0,
        stagger: 0.05,
      })
      .from("#desc", { autoAlpha: 0, duration: 0.8, ease: "power2.out" });

    if (titleTimeline.scrollTrigger) {
      triggers.push(titleTimeline.scrollTrigger);
    }

    const initTimeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: "#service-list",
        },
      })
      .from("#service-list", {
        y: 10,
        autoAlpha: 0,
        delay: 0.5,
        duration: 0.3,
        stagger: 0.2,
        ease: "power1.out",
      })
      .from(nayanakaRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
      })
      .from(
        plusRefs.current,
        {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "<",
      );
    if (initTimeline.scrollTrigger) {
      triggers.push(initTimeline.scrollTrigger);
    }

    gsap.to("#services-section", {
      borderBottomRightRadius: 70,
      borderBottomLeftRadius: 70,
      scrollTrigger: {
        trigger: "#services-section",
        start: "center top",
        end: "bottom-=75 top",
        scrub: 0.5,
      },
    });

    svgTimelineRef.current = gsap.timeline({ repeat: -1 });
    svgTimelineRef.current
      .to("#na", {
        morphSVG: "#ya",
        duration: 2,
        ease: "expo.inOut",
        yoyo: true,
      })
      .to("#na", {
        morphSVG: "#na",
        duration: 2,
        ease: "expo.inOut",
        yoyo: true,
      })
      .to("#na", {
        morphSVG: "#ka",
        duration: 2,
        ease: "expo.inOut",
        yoyo: true,
      })
      .to("#na", {
        morphSVG: "#na",
        duration: 2,
        ease: "expo.inOut",
        yoyo: true,
      });

    if (svgTimelineRef.current.scrollTrigger) {
      triggers.push(svgTimelineRef.current.scrollTrigger);
    }

    plusTimelineRef.current = gsap
      .timeline({ repeat: -1, repeatDelay: 2 })
      .set(plusRefs.current, { rotate: 0 })
      .fromTo(
        plusRefs.current,
        { rotate: 0 },
        {
          rotate: 45,
          ease: "power2.out",
          duration: 0.15,
          stagger: 0.5,
        },
      )
      .to(plusRefs.current, {
        rotate: 90,
        ease: "power2.out",
        duration: 0.15,
        stagger: 0.5,
      });

    if (plusTimelineRef.current.scrollTrigger) {
      triggers.push(plusTimelineRef.current.scrollTrigger);
    }

    initTimeline.add(svgTimelineRef.current).add(plusTimelineRef.current, "<");

    return () => {
      svgTimelineRef.current?.kill();
      plusTimelineRef.current?.kill();
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  useGSAP(() => {
    if (window.innerWidth < 768) return;

    const overlayTl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
      defaults: { ease: "power2.out" },
    });

    overlayTl

      .fromTo(
        textRefs.current,
        { color: "#2e2e2e" },
        { color: "#ffffff", duration: 0.3, ease: "power2.out", stagger: 0.2 },
      )
      .to(textRefs.current, {
        color: "#2e2e2e",
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.2,
      });
  });

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );
  };

  const handleMouseLeave = (index: number) => {
    if (window.innerWidth < 768) return;

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );
  };

  return {
    overlayRefs,
    plusRefs,
    nayanakaRef,
    textRefs,
    titleRef,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useServiceAnimation;
