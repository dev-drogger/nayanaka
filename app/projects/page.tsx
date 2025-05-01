"use client";

import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image, ScrollControls, Scroll } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/use-media-query";

type ImageProps = {
  url: string;
  scale: number | number[];
  position?: number[];
};

function Item({ url, scale, ...props }: ImageProps) {
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    const material = ref.current.material;
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    material.zoom = THREE.MathUtils.damp(
      material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );
    material.grayscale = THREE.MathUtils.damp(
      material.grayscale,
      hovered ? 1 : 0,
      4,
      delta
    );
  });

  return (
    <group {...props}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={
          Array.isArray(scale) && scale.length === 2
            ? [scale[0], scale[1]]
            : (scale as [number, number])
        }
        url={url}
        alt="image"
      />
    </group>
  );
}

export function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Adjust scale factors based on device size
  const scaleFactor = isMobile ? 0.8 : isTablet ? 0.9 : 1;

  return (
    <Scroll>
      <Item
        url="/pictures/DSC00128.webp"
        scale={
          isMobile
            ? [3, 3, 3]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [0, 1, 0] : [-w / 6, -27, 0]}
      />
      <Item
        url="/pictures/DSC09892.webp"
        scale={
          isMobile ? [2, 2, 2] : [2 * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 0.7, 0] : [w / 30, -h * 1 - 27, 0]}
      />
      <Item
        url="/pictures/img6.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 0.7, 0] : [-w / 4, -h * 1 - 27, 0]}
      />
      <Item
        url="/pictures/img3.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 5) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 1.3, 0] : [w / 4, -h * 1.2 - 27, 0]}
      />
      <Item
        url="/pictures/img5.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 5) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 1.3, 0] : [w / 10, -h * 1.75 - 27, 0]}
      />
      <Item
        url="/pictures/IMG_0918.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 1.8, 0] : [-w / 4, -h * 2 - 27, 0]}
      />
      <Item
        url="/pictures/IMG_1402.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 1.8, 0] : [-w / 4, -h * 2.6 - 27, 0]}
      />
      <Item
        url="/pictures/IMG_1849.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 2) * scaleFactor, (w / 2) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 2.3, 0] : [w / 4.5, -h * 3.1 - 27, 0]}
      />
      <Item
        url="/pictures/DSC00212.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 2.5) * scaleFactor, (w / 2) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 2.3, 0] : [-w / 6, -h * 4.1 - 27, 0]}
      />
      <Item
        url="/pictures/IMG_5501.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 2.8, 0] : [-w / 6, -h * 4.9 - 27, 0]}
      />
      <Item
        url="/pictures/IMG_1867.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 4) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 2.8, 0] : [w / 3.5, -h * 5.1 - 27, 0]}
      />
      <Item
        url="/pictures/IMG_1868.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 3.3, 0] : [-w / 4, -h * 5.4 - 27, 0]}
      />
      <Item
        url="/pictures/IMG_5299.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 3.3, 0] : [-w / 6, -h * 5.9 - 27, 0]}
      />
      <Item
        url="/pictures/DSC09949.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [0, -h * 3.8, 0] : [w / 4, -h * 6 - 27, 0]}
      />
    </Scroll>
  );
}

export function ResponsiveText() {
  const { width: w } = useThree((state) => state.viewport);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Adjust font sizes based on device size
  const titleSize = isMobile ? "4em" : isTablet ? "8em" : "12em";
  const headingSize = isMobile ? "3em" : isTablet ? "6em" : "13em";

  return (
    <>
      <h1
        style={{
          position: "absolute",
          top: `${isMobile ? 70 * 7.9 : 90 * 4.55}vh`,
          right: isMobile ? "50%" : "5vw",
          transform: isMobile
            ? "translate3d(50%,-100%,0)"
            : "translate3d(0,-100%,0)",
          fontSize: titleSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          zIndex: 0,
          textAlign: isMobile ? "center" : "right",
        }}
      >
        projects
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 145 * 7.9 : 180 * 3}vh`,
          left: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(-50%)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        hail
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 200 * 7.9 : 260 * 2.4}vh`,
          right: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(50%)" : "none",
          textAlign: isMobile ? "center" : "right",
        }}
      >
        thee,
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 250 * 7.9 : 350 * 2.03}vh`,
          left: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(-50%)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        thoth
      </h1>
      <h1
        style={{
          fontSize: headingSize,
          color: "black",
          fontWeight: "normal",
          letterSpacing: "-0.05em",
          position: "absolute",
          top: `${isMobile ? 300 * 7.9 : 450 * 1.76}vh`,
          right: isMobile ? "50%" : "10vw",
          transform: isMobile ? "translateX(50%)" : "none",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {isMobile ? (
          "her mes."
        ) : (
          <>
            her
            <br />
            mes.
          </>
        )}
      </h1>
    </>
  );
}

export default function Carousel() {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate appropriate pages based on screen size
  const isMobile = useMediaQuery("(max-width: 768px)");
  const totalPages = isMobile ? 4.6 : 7;

  if (!mounted) return <div className="h-screen w-full bg-[#f0f0f0]"></div>;

  return (
    <div className="h-screen w-full">
      <Canvas
        gl={{
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={["#f0f0f0"]} />
        <ScrollControls damping={0.75} pages={totalPages} distance={1}>
          <Items />
          <ResponsiveText />
        </ScrollControls>
      </Canvas>

      {/* Mobile instructions overlay */}
      <div className="fixed bottom-4 left-0 right-0 md:hidden text-center text-sm text-black/70 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full mx-auto w-max">
        Scroll to explore images
      </div>
    </div>
  );
}
