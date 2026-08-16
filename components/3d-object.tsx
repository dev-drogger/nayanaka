import { Canvas } from "@react-three/fiber";
import { Planet } from "@/components/planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { type RefObject, useCallback } from "react";
import type { WebGLRenderer } from "three";

type PlanetProps = {
  dpr: [number, number];
  isMobileHook: boolean;
  sectionPinRef: RefObject<HTMLDivElement | null>;
};

const Planet3D = ({ dpr, isMobileHook, sectionPinRef }: PlanetProps) => {
  const handleCreated = useCallback(({ gl }: { gl: WebGLRenderer }) => {
    const canvas = gl.domElement;

    const onContextLost = (e: Event) => {
      e.preventDefault();
      console.warn("[R3F] WebGL context lost.");
    };

    canvas.addEventListener("webglcontextlost", onContextLost);

    // R3F exposes no direct cleanup here, so we return a teardown via a ref
    return () => {
      canvas.removeEventListener("webglcontextlost", onContextLost);
    };
  }, []);

  return (
    <figure
      className="absolute inset-0 -z-50"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        gl={{
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
          antialias: true,
          stencil: false,
          depth: true,
        }}
        dpr={dpr}
        onCreated={handleCreated}
      >
        <ambientLight intensity={0.5} />
        <Float speed={0.5}>
          <Planet scale={isMobileHook ? 0.5 : 1} triggerRef={sectionPinRef} />
        </Float>
        <Environment resolution={128} backgroundBlurriness={0.5}>
          <group rotation={[-Math.PI / 3, 4, 1]}>
            <Lightformer
              form="circle"
              intensity={2}
              position={[0, 5, -9]}
              scale={10}
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[0, 3, 1]}
              scale={10}
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[-5, -1, -1]}
              scale={10}
            />
            <Lightformer
              form="circle"
              intensity={2}
              position={[10, 1, 0]}
              scale={16}
            />
          </group>
        </Environment>
      </Canvas>
    </figure>
  );
};

export default Planet3D;
