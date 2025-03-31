"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  Suspense,
} from "react";
import { Canvas } from "@react-three/fiber";

// Create a context to share Three.js state
type ThreeContextType = {
  mousePosition: { x: number; y: number };
  setMousePosition: (position: { x: number; y: number }) => void;
  is3DEnabled: boolean;
  setIs3DEnabled: (enabled: boolean) => void;
};

const ThreeContext = createContext<ThreeContextType | null>(null);

export const useThreeContext = () => {
  const context = useContext(ThreeContext);
  if (!context) {
    throw new Error("useThreeContext must be used within a ThreeProvider");
  }
  return context;
};

export function ThreeProvider({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [is3DEnabled, setIs3DEnabled] = useState(true);

  return (
    <ThreeContext.Provider
      value={{
        mousePosition,
        setMousePosition,
        is3DEnabled,
        setIs3DEnabled,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
}

// Safe wrapper for 3D content
export function Safe3DComponent({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={<div className="w-full h-full bg-black/20">Loading</div>}
    >
      {children}
    </Suspense>
  );
}

// Shared canvas component
export function SharedCanvas({
  children,
  effects = true,
}: {
  children: ReactNode;
  effects?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        powerPreference: "default",
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      {children}
    </Canvas>
  );
}
