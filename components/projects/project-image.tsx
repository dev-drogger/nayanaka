import * as THREE from "three";
import { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useIntersect, Image } from "@react-three/drei";

type ImageProps = {
  url: string;
  scale: number | [number, number];
  position?: [number, number, number];
};

export default function ProjectImage({ url, scale, ...props }: ImageProps) {
  const visible = useRef(false);
  const [hovered, setHovered] = useState(false);

  const onIntersect = useCallback(
    (isVisible: boolean) => (visible.current = isVisible),
    []
  );

  const ref = useIntersect<THREE.Mesh>(onIntersect);
  const { height } = useThree((state) => state.viewport);

  const handlePointerOver = useCallback(() => setHovered(true), []);
  const handlePointerOut = useCallback(() => setHovered(false), []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    const mesh = ref.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const material = mesh.material as any;

    mesh.position.y = THREE.MathUtils.damp(
      mesh.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );

    const baseZoom = visible.current ? 1 : 1.5;
    const targetZoom = hovered ? 1.3 : baseZoom;

    material.zoom = THREE.MathUtils.damp(material.zoom, targetZoom, 4, delta);

    material.grayscale = THREE.MathUtils.damp(
      material.grayscale,
      hovered ? 1 : 0,
      4,
      delta
    );
  });

  const normalizedScale: [number, number] = Array.isArray(scale)
    ? [scale[0], scale[1]]
    : [scale, scale];

  return (
    <group {...props}>
      <Image
        ref={ref}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={normalizedScale}
        url={url}
        transparent
        toneMapped={false}
      />
    </group>
  );
}
