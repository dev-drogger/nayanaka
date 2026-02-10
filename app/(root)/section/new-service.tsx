"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/constant";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus } from "lucide-react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { useMediaQuery } from "@/hooks/use-media-query";
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  MorphSVGPlugin,
  DrawSVGPlugin,
  SplitText,
);

const Services = () => {
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
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

  return (
    <section
      id="services-section"
      className="h-screen bg-jet relative py-20 overflow-x-hidden grid grid-rows-12"
    >
      {!isMobile &&
        [
          "top-20 left-10",
          "top-20 right-10",
          "bottom-20 right-10",
          "bottom-20 left-10",
        ].map((pos, i) => (
          <div
            key={i}
            ref={(el) => {
              plusRefs.current[i] = el;
            }}
            className={`absolute ${pos}`}
          >
            <Plus color="#fff" size={50} />
          </div>
        ))}

      <div className="row-span-6 w-full grid grid-cols-12 container mx-auto px-4">
        <div
          className="col-span-8 md:col-span-7 flex-col-center"
          ref={titleRef}
        >
          <h1 className="text-7xl md:text-8xl font-amie">WHAT</h1>
          <h1 className="italic font-primary font-light text-7xl md:text-8xl">
            WE DO
          </h1>
        </div>

        <div className="col-span-5 col-start-6 md:col-span-4 md:col-start-7 flex-center">
          <h2 id="desc" className="text-justify text-sm md:text-lg">
            we combine our love and jjsna nnvai sjnvais insifse jbkajased cakn
            bnjabnfcuiewb
          </h2>
        </div>
      </div>

      <div className="row-span-6 grid grid-cols-12  w-full">
        <div className="col-span-12 md:col-span-7 w-full relative flex flex-col px-6 md:px-0  md:pl-64 items-start justify-start pt-10 md:justify-center font-light z-5">
          {SERVICES.map((project, index) => (
            <div
              key={index}
              id="service-list"
              className="relative w-full flex flex-col gap-1  cursor-pointer group md:gap-8"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* overlay */}
              <div
                ref={(el) => {
                  overlayRefs.current[index] = el;
                }}
                className="absolute inset-0 hidden md:block duration-200 bg-gray-200 -z-10 clip-path"
              />

              {/* title */}
              <div className="flex justify-between text-white transition-all duration-500 md:group-hover:px-4 md:group-hover:text-black">
                <h2 className="lg:text-[26px] text-[18px] font-medium font-amie uppercase md:group-hover:text-black transition-all duration-500">
                  {project.title}
                </h2>
                <ArrowUpRight
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="md:size-6 size-5"
                />
              </div>
            </div>
          ))}
        </div>

    <div className="col-span-5 absolute md:relative bottom-32 left-1/2 md:left-0 md:translate-x-0 -translate-x-1/2 md:flex-center md:bottom-0">
          <div className="relative">
            <svg
              viewBox="0 0 300 300"
              ref={nayanakaRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1"
              fill="none"
              width={isMobile ? 150 : 300}
              height={isMobile ? 150 : 300}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="na"
                d="M5.4 49.2C11.8 50 18.6 50.6 25.8 51C33.2 51.2 39.7 51.3 45.3 51.3C57.7 51.3 70.2 50.6 82.8 49.2C95.6 47.8 107.9 46 119.7 43.8C131.5 41.4 142.2 38.7 151.8 35.7L153 70.5C144.4 72.7 134.1 75 122.1 77.4C110.3 79.6 97.8 81.5 84.6 83.1C71.4 84.5 58.4 85.2 45.6 85.2C39.6 85.2 33.5 85.1 27.3 84.9C21.1 84.7 14.7 84.4 8.1 84L5.4 49.2ZM122.1 4.2C120.9 9.20001 119.3 15.7 117.3 23.7C115.3 31.7 113 40.1 110.4 48.9C108 57.7 105.4 66.4 102.6 75C98.2 89.4 92.4 104.7 85.2 120.9C78 137.1 70.2 152.9 61.8 168.3C53.4 183.7 44.9 197.4 36.3 209.4L0 190.8C6.8 182.4 13.5 173.1 20.1 162.9C26.7 152.7 32.9 142.2 38.7 131.4C44.5 120.6 49.7 110.2 54.3 100.2C59.1 90 62.9 80.8 65.7 72.6C69.5 62 72.8 50.2 75.6 37.2C78.6 24 80.3 11.6 80.7 0L122.1 4.2ZM192.3 97.5C191.9 103.9 191.7 110.3 191.7 116.7C191.9 122.9 192.1 129.3 192.3 135.9C192.5 140.5 192.7 146.4 192.9 153.6C193.3 160.6 193.7 168.1 194.1 176.1C194.5 183.9 194.8 191.4 195 198.6C195.4 205.6 195.6 211.2 195.6 215.4C195.6 224.6 193.7 233 189.9 240.6C186.1 248 180 253.9 171.6 258.3C163.4 262.7 152.1 264.9 137.7 264.9C125.3 264.9 114.1 263 104.1 259.2C94.1 255.6 86.1 250.2 80.1 243C74.1 235.6 71.1 226.4 71.1 215.4C71.1 205.6 73.7 196.8 78.9 189C84.1 181 91.6 174.8 101.4 170.4C111.4 165.8 123.4 163.5 137.4 163.5C155 163.5 171.2 166 186 171C200.8 175.8 214.1 182 225.9 189.6C237.7 197.2 247.8 204.8 256.2 212.4L236.1 244.5C230.7 239.7 224.5 234.3 217.5 228.3C210.7 222.3 203 216.7 194.4 211.5C186 206.3 176.8 202 166.8 198.6C157 195.2 146.4 193.5 135 193.5C126.4 193.5 119.5 195.2 114.3 198.6C109.1 202 106.5 206.4 106.5 211.8C106.5 217.4 108.7 221.9 113.1 225.3C117.7 228.7 124.1 230.4 132.3 230.4C139.1 230.4 144.5 229.3 148.5 227.1C152.5 224.7 155.3 221.4 156.9 217.2C158.5 212.8 159.3 207.9 159.3 202.5C159.3 197.9 159.1 191.4 158.7 183C158.3 174.6 157.8 165.3 157.2 155.1C156.8 144.9 156.4 134.7 156 124.5C155.6 114.3 155.2 105.3 154.8 97.5H192.3ZM243.9 113.4C238.1 108.6 230.9 103.5 222.3 98.1C213.7 92.7 204.8 87.6 195.6 82.8C186.6 77.8 178.7 73.8 171.9 70.8L191.1 41.1C196.5 43.5 202.6 46.5 209.4 50.1C216.4 53.5 223.4 57.1 230.4 60.9C237.6 64.7 244.2 68.5 250.2 72.3C256.4 75.9 261.4 79.1 265.2 81.9L243.9 113.4Z"
                fill="#cfae70"
              />
              <path
                id="ya"
                d="M146.4 59.1C143 55.3 138.7 50.9 133.5 45.9C128.3 40.7 123 35.7 117.6 30.9C112.2 25.9 107.5 22 103.5 19.2L131.1 0C134.9 2.6 139.5 6.3 144.9 11.1C150.3 15.7 155.7 20.5 161.1 25.5C166.7 30.3 171.2 34.6 174.6 38.4L146.4 59.1ZM64.8 27C65.8 28.8 67 31.2 68.4 34.2C69.8 37.2 71.3 40.2 72.9 43.2C74.5 46 75.8 48.4 76.8 50.4C83 62 89.3 74.8 95.7 88.8C102.1 102.6 108 115.8 113.4 128.4C116.8 136.6 120.7 146.4 125.1 157.8C129.7 169.2 134.2 181.1 138.6 193.5C143 205.9 147.1 217.8 150.9 229.2C154.9 240.6 158.1 250.5 160.5 258.9L119.4 269.7C116.4 257.1 112.7 243.4 108.3 228.6C103.9 213.8 99.2 199.2 94.2 184.8C89.2 170.2 84.2 156.9 79.2 144.9C75.2 135.5 71.2 126.3 67.2 117.3C63.4 108.3 59.5 99.7 55.5 91.5C51.7 83.1 47.7 75.4 43.5 68.4C41.5 64.6 38.8 60.2 35.4 55.2C32.2 50.2 29 45.8 25.8 42L64.8 27ZM0 114.9C6 113.5 11.8 111.8 17.4 109.8C23.2 107.8 27.3 106.3 29.7 105.3C40.7 100.9 51.8 96.2 63 91.2C74.4 86.2 85.8 81.2 97.2 76.2C108.8 71 120.1 66.4 131.1 62.4C142.3 58.2 153.2 54.9 163.8 52.5C174.6 49.9 184.7 48.6 194.1 48.6C209.7 48.6 223 51.4 234 57C245.2 62.6 253.7 70.2 259.5 79.8C265.5 89.4 268.5 100 268.5 111.6C268.5 125.6 265.5 137.8 259.5 148.2C253.5 158.4 244.9 166.3 233.7 171.9C222.5 177.5 209.2 180.3 193.8 180.3C185.8 180.3 177.5 179.4 168.9 177.6C160.5 175.8 153.4 173.9 147.6 171.9L148.5 134.1C155.3 137.1 162.3 139.6 169.5 141.6C176.7 143.4 183.6 144.3 190.2 144.3C197.6 144.3 204.2 143 210 140.4C216 137.6 220.7 133.7 224.1 128.7C227.5 123.7 229.2 117.6 229.2 110.4C229.2 105.4 227.7 100.8 224.7 96.6C221.9 92.4 217.8 89.1 212.4 86.7C207.2 84.1 200.8 82.8 193.2 82.8C183.4 82.8 172.3 84.7 159.9 88.5C147.7 92.1 134.8 96.8 121.2 102.6C107.6 108.4 94.3 114.6 81.3 121.2C68.3 127.6 56.3 133.7 45.3 139.5C34.3 145.1 25.1 149.6 17.7 153L0 114.9Z"
                fill="#cfae70"
                visibility="hidden"
              />
              <path
                id="ka"
                d="M121.8 4.50001C120.8 8.30001 119.8 12.5 118.8 17.1C118 21.5 117.2 25.6 116.4 29.4C115.6 33.8 114.6 38.8 113.4 44.4C112.2 49.8 111 55.3 109.8 60.9C108.8 66.3 107.7 71.6 106.5 76.8C104.5 85.4 102 95.4 99 106.8C96 118.2 92.5 130.5 88.5 143.7C84.5 156.7 80 169.8 75 183C70 196.2 64.7 209.1 59.1 221.7C53.5 234.1 47.5 245.3 41.1 255.3L2.10004 239.7C9.10004 230.3 15.6 219.8 21.6 208.2C27.8 196.4 33.4 184.3 38.4 171.9C43.4 159.5 47.8 147.3 51.6 135.3C55.6 123.3 59 112.1 61.8 101.7C64.6 91.3 66.8 82.4 68.4 75C71.2 61.4 73.4 48.3 75 35.7C76.6 23.1 77.3 11.2 77.1 0L121.8 4.50001ZM225 32.7C229.8 39.1 234.7 47.2 239.7 57C244.9 66.6 249.9 76.8 254.7 87.6C259.7 98.4 264.2 108.8 268.2 118.8C272.4 128.8 275.6 137.3 277.8 144.3L239.7 162C237.7 153.6 234.9 144.3 231.3 134.1C227.9 123.7 223.9 113.2 219.3 102.6C214.9 91.8 210.1 81.6 204.9 72C199.9 62.4 194.7 54.4 189.3 48L225 32.7ZM0 66C5.4 66.4 10.7 66.6 15.9 66.6C21.1 66.4 26.5 66.2 32.1 66C36.9 65.8 42.8 65.5 49.8 65.1C57 64.5 64.5 63.9 72.3 63.3C80.3 62.7 88.3 62.1 96.3 61.5C104.3 60.7 111.7 60.1 118.5 59.7C125.3 59.3 130.9 59.1 135.3 59.1C145.9 59.1 155.2 60.9 163.2 64.5C171.4 67.9 177.8 73.8 182.4 82.2C187.2 90.6 189.6 102 189.6 116.4C189.6 128.2 189 141 187.8 154.8C186.8 168.6 185.1 181.8 182.7 194.4C180.3 207 176.9 217.7 172.5 226.5C167.7 236.9 161.1 244.1 152.7 248.1C144.5 252.1 134.7 254.1 123.3 254.1C117.5 254.1 111.3 253.6 104.7 252.6C98.3 251.8 92.5 250.9 87.3 249.9L80.7 210.3C84.7 211.3 89 212.3 93.6 213.3C98.4 214.3 102.9 215.1 107.1 215.7C111.5 216.3 115 216.6 117.6 216.6C122.6 216.6 127 215.7 130.8 213.9C134.6 211.9 137.7 208.5 140.1 203.7C142.9 197.9 145.1 190.4 146.7 181.2C148.5 172 149.8 162.1 150.6 151.5C151.6 140.7 152.1 130.4 152.1 120.6C152.1 112.6 151 106.7 148.8 102.9C146.6 99.1 143.3 96.6 138.9 95.4C134.7 94 129.4 93.3 123 93.3C118.6 93.3 112.4 93.7 104.4 94.5C96.6 95.1 88.3 95.9 79.5 96.9C70.7 97.7 62.4 98.6 54.6 99.6C47 100.6 41.1 101.3 36.9 101.7C32.7 102.5 27.2 103.4 20.4 104.4C13.8 105.2 8.20004 106 3.60004 106.8L0 66Z"
                fill="#cfae70"
                visibility="hidden"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
