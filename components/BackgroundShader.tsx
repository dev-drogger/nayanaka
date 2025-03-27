"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Create a custom shader material
const NoiseShaderMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    mouse: new THREE.Vector2(),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    varying vec2 vUv;
    
    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Adjust UV coordinates
      vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
      
      // Mouse interaction
      float mouseEffect = length(p - mouse * 2.0) * 0.5;
      
      // Create noise pattern
      float n1 = snoise(uv * 3.0 + time * 0.1) * 0.5 + 0.5;
      float n2 = snoise(uv * 6.0 - time * 0.15) * 0.5 + 0.5;
      float n3 = snoise(uv * 9.0 + time * 0.2) * 0.5 + 0.5;
      
      // Combine noise layers
      float finalNoise = mix(n1, n2, 0.5) * 0.8 + n3 * 0.2;
      
      // Add mouse interaction
      finalNoise = mix(finalNoise, 1.0, smoothstep(0.5, 0.0, mouseEffect));
      
      // Create gradient
      vec3 color1 = vec3(0.05, 0.05, 0.05);
      vec3 color2 = vec3(0.1, 0.1, 0.1);
      vec3 gradient = mix(color1, color2, uv.y);
      
      // Final color
      vec3 finalColor = mix(gradient, vec3(0.15, 0.15, 0.15), finalNoise * 0.3);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Extend Three.js with our custom shader
extend({ NoiseShaderMaterial });

export default function BackgroundShader() {
  return (
    <div className="h-full w-full">
      <Canvas>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}

function ShaderPlane() {
  const materialRef = useRef<any>();
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useFrame(({ clock, mouse, size }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime();
      materialRef.current.resolution.set(size.width, size.height);

      // Smooth mouse following
      mouseRef.current.x += (mouse.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouse.y - mouseRef.current.y) * 0.05;
      materialRef.current.mouse.set(mouseRef.current.x, mouseRef.current.y);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[20, 20]} />
      {/* @ts-ignore */}
      <noiseShaderMaterial ref={materialRef} />
    </mesh>
  );
}
