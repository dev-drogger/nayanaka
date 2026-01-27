import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setCursorType } from "@/state/slices/cursorSlice";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

export const HeroGraphic = () => {
  const dispatch = useAppDispatch();
  const HERO_GRAPHIC_ANIM_VARIANTS = useMemo(
    () => ({
      hidden: { opacity: 0, y: 100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: easeOut,
          delay: 0.3,
        },
      },
    }),
    [],
  );

  return (
    <div className="col-span-12 lg:col-span-4 lg:pl-8">
      <motion.div
        initial="hidden"
        animate={"visible"}
        variants={HERO_GRAPHIC_ANIM_VARIANTS}
        viewport={{ once: true }}
      >
        <div
          className="aspect-square overflow-hidden"
          onMouseEnter={() => dispatch(setCursorType("3d"))}
          onMouseLeave={() => dispatch(setCursorType("default"))}
        >
          <Image
            src="/placeholder.svg?height=800&width=800"
            alt="Creative visual"
            width={800}
            height={800}
            className="object-cover h-full w-full"
          />
        </div>

        <div
          className="absolute -bottom-28 z-6 right-0 bg-white text-black p-6 max-w-xs"
          onMouseEnter={() => dispatch(setCursorType("text"))}
          onMouseLeave={() => dispatch(setCursorType("default"))}
        >
          <p className="text-sm text-black">
            Nayanaka is a creative agency founded in 2025, specializing in 3D
            web design and development.
          </p>
          <div className="mt-4 flex justify-end">
            <Link
              href="#about"
              className="flex items-center gap-2 text-sm uppercase tracking-widest"
              onMouseEnter={() => dispatch(setCursorType("link"))}
              onMouseLeave={() => dispatch(setCursorType("text"))}
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
