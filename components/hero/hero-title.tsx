import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(useGSAP, SplitText);

export default function HeroTitle({ timeline }: gsap.core.Timeline) {
  const el = useRef(null);
  const split = SplitText.create(el.current, {
    type: "lines, chars",
    mask: "lines",
  });

  useGSAP(() => {
    if (timeline) {
      timeline.from(split.lines, {
        duration: 0.6,
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
      });
    }
  }, [timeline]);

  return (
    <div className="col-span-12 lg:col-span-8 flex-center">
      <div className="flex-col flex">
        <h1
          className="text-4xl lg:text-6xl uppercase font-bold text-black"
          ref={el}
        >
          blend art
          <br />
          and technology
          <br />
          into digital aesthetic
        </h1>
        {/* <TextEffect
          per="char"
          preset="slide"
          className="text-4xl lg:text-6xl uppercase font-bold text-black"
          variants={HERO_TITLE_ANIM_VARIANTS}
        >
          {`BLEND ART`}
        </TextEffect>

        <TextEffect
          per="char"
          preset="slide"
          className="text-4xl lg:text-6xl uppercase font-bold text-black"
          variants={{
            container: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.01,
                  delay: 0.05,
                },
              },
            },
            item: {
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
              },
            },
          }}
        >
          {`AND TECHNOLOGY`}
        </TextEffect>

        <TextEffect
          per="char"
          preset="slide"
          className="text-4xl lg:text-6xl uppercase font-bold text-black"
          variants={{
            container: {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.01,
                  delay: 0.1,
                },
              },
            },
            item: {
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
              },
            },
          }}
        >
          {`INTO DIGITAL AESTHETIC`}
        </TextEffect> */}
      </div>
    </div>
  );
}
