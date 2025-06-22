import * as THREE from "three";
import { useRef, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image } from "@react-three/drei";

type ImageProps = {
  url: string;
  scale: number | [number, number];
  position?: [number, number, number];
};

export default function ProjectImage({ url, scale, ...props }: ImageProps) {
  const visible = useRef(false);

  const onIntersect = useCallback(
    (isVisible: boolean) => (visible.current = isVisible),
    []
  );

  const ref = useIntersect<THREE.Mesh>(onIntersect);
  const { height } = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const mesh = ref.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const material = mesh.material as any;

    mesh.position.y = THREE.MathUtils.damp(
      mesh.position.y,
      visible.current ? 0 : -height / 2 + 1,
      2,
      delta
    );

    const baseZoom = visible.current ? 1 : 1.5;

    material.zoom = THREE.MathUtils.damp(material.zoom, baseZoom, 2, delta);
  });

  const normalizedScale: [number, number] = Array.isArray(scale)
    ? [scale[0], scale[1]]
    : [scale, scale];

  return (
    <group {...props}>
      <Image
        ref={ref}
        scale={normalizedScale}
        url={url}
        transparent
        toneMapped={false}
      />
    </group>
  );
}
