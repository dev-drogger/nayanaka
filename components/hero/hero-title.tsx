import { TextEffect } from "../ui/text-effect";
import { useMemo } from "react";

export default function HeroTitle({ state }: { state: boolean }) {
  const HERO_TITLE_ANIM_VARIANTS = useMemo(
    () => ({
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.01,
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
    }),
    []
  );

  return (
    <div className="col-span-12 lg:col-span-8 flex-center">
      <div className="flex-col flex">
        <TextEffect
          per="char"
          preset="slide"
          trigger={state}
          className="text-4xl lg:text-6xl uppercase font-bold text-black"
          variants={HERO_TITLE_ANIM_VARIANTS}
        >
          {`BLEND ART`}
        </TextEffect>

        <TextEffect
          per="char"
          preset="slide"
          trigger={state}
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
          trigger={state}
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
        </TextEffect>
      </div>
    </div>
  );
}
