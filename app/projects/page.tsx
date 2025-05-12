"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Html } from "@react-three/drei";
import * as THREE from "three";

// Main App component
export default function Page() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Canvas>
        <Suspense fallback={<Html center>Loading...</Html>}>
          <ScrollControls pages={7} damping={0.1}>
            <Scene />
            <Scroll html>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  pointerEvents: "none",
                }}
              >
                <Navigation />
                <PageContent />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Navigation component
function Navigation() {
  const [activePage, setActivePage] = useState(0);
  const scroll = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (scroll) {
        const currentPage = Math.floor(scroll.offset * 7);
        setActivePage(currentPage);
      }
    };

    // Initial page calculation
    handleScroll();

    // Listen for scroll changes
    return scroll.el.addEventListener("scroll", handleScroll);
  }, [scroll]);

  const goToPage = (pageIndex) => {
    if (scroll) {
      scroll.el.scrollTo({
        top: scroll.el.scrollHeight * (pageIndex / 7),
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        pointerEvents: "all",
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6].map((pageIndex) => (
        <div
          key={pageIndex}
          onClick={() => goToPage(pageIndex)}
          style={{
            width: "12px",
            height: "12px",
            margin: "8px 0",
            borderRadius: "50%",
            backgroundColor: activePage === pageIndex ? "#000" : "#ccc",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
}

// Scene component containing 3D elements
function Scene() {
  const scroll = useScroll();
  const boxRef = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (!boxRef.current || !scroll) return;

    const currentScroll = scroll.offset;

    // Precise calculation for page visibility
    const pageHeight = 1 / 7; // Height of one page
    const page2Start = pageHeight; // Start of page 2
    const page2End = 2 * pageHeight; // End of page 2

    // Normalize scroll offset to 0-1 range
    const normalizedScroll = (currentScroll - page2Start) / pageHeight;

    // Box visibility and position logic
    if (currentScroll < page2Start) {
      // Before page 2, hide the box
      boxRef.current.visible = true;
    } else if (currentScroll >= page2Start && currentScroll < page2End) {
      // On page 2, start showing and scaling the box
      boxRef.current.visible = true;

      // Start scaling when 1% of page 2 is visible
      const scaleProgress = Math.max(0, normalizedScroll);

      // Scale from full viewport to 45vh
      const startScale = Math.max(viewport.width, viewport.height);
      const endScale = viewport.height * 0.45;
      const currentScale = startScale - (startScale - endScale) * scaleProgress;

      boxRef.current.scale.set(currentScale, currentScale, 1);

      // Box is fixed to center of the screen
      boxRef.current.position.x = 0;
      boxRef.current.position.y = 0;
    } else if (currentScroll >= page2End && currentScroll < 4 * pageHeight) {
      // On pages 3-4, box is sticky at 45vh size
      boxRef.current.visible = true;
      const boxSize = viewport.height * 0.45;
      boxRef.current.scale.set(boxSize, boxSize, 1);
      boxRef.current.position.x = 0;
      boxRef.current.position.y = 0;
    } else if (
      currentScroll >= 4 * pageHeight &&
      currentScroll < 5 * pageHeight
    ) {
      // On page 4, make the box scrollable
      boxRef.current.visible = true;
      const boxSize = viewport.height * 0.45;
      boxRef.current.scale.set(boxSize, boxSize, 1);

      // Calculate vertical offset based on scroll within page 4
      const page4Progress = (currentScroll - 4 * pageHeight) / pageHeight;
      const verticalOffset = page4Progress * viewport.height - boxSize / 2;

      boxRef.current.position.x = 0;
      boxRef.current.position.y = -verticalOffset;
    } else if (currentScroll >= 5 * pageHeight) {
      // After page 4, continue to show the box
      boxRef.current.visible = true;
      const boxSize = viewport.height * 0.45;
      boxRef.current.scale.set(boxSize, boxSize, 1);
      boxRef.current.position.x = 0;
      boxRef.current.position.y = 0;
    }
  });

  return (
    <group>
      <mesh ref={boxRef} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
}

// Content for each page
function PageContent() {
  return (
    <>
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          pointerEvents: "all",
        }}
      >
        <h1>Page One</h1>
      </section>

      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          pointerEvents: "all",
        }}
      >
        <h1>Page Two</h1>
      </section>

      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          pointerEvents: "all",
        }}
      >
        <h1>Page Three</h1>
      </section>

      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          pointerEvents: "all",
        }}
      >
        <h1>Page Four</h1>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "200px",
            height: "200px",
            backgroundColor: "red",
            zIndex: 10,
          }}
        >
          Scrollable Content
        </div>
      </section>

      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          pointerEvents: "all",
        }}
      >
        <h1>Page Five</h1>
      </section>

      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          pointerEvents: "all",
        }}
      >
        <h1>Page Six</h1>
      </section>

      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          pointerEvents: "all",
        }}
      >
        <h1>Page Seven</h1>
      </section>
    </>
  );
}
