import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image } from "@react-three/drei";

type ImageProps = {
  url: string;
  scale: number | number[];
  position?: number[];
};

export default function ProjectImage({ url, scale, ...props }: ImageProps) {
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
