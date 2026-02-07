"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface BarcodeGlitchProps {
  intensity?: "low" | "medium" | "high";
  autoGlitchInterval?: number;
  width?: number;
  height?: number;
  barWidth?: number;
  onGlitchStart?: () => void;
  onGlitchEnd?: () => void;
  triggerMode?: "auto" | "hover" | "click" | "manual";
}

export function BarcodeGlitch({
  intensity = "medium",
  width = 300,
  height = 100,
  onGlitchStart,
  onGlitchEnd,
}: BarcodeGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentBarcode, setCurrentBarcode] = useState("978020137962");
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Generate random 12-digit barcode
  const generateRandomBarcode = () => {
    return Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 10),
    ).join("");
  };

  // Glitch intensity parameters
  const glitchParams = {
    low: {
      duration: 400,
      flickerChance: 0.3,
      shiftRange: 2,
      pixelSize: 1,
      offsetIntensity: 0.5,
    },
    medium: {
      duration: 600,
      flickerChance: 0.5,
      shiftRange: 4,
      pixelSize: 2,
      offsetIntensity: 1,
    },
    high: {
      duration: 900,
      flickerChance: 0.8,
      shiftRange: 8,
      pixelSize: 3,
      offsetIntensity: 2,
    },
  };

  // Convert barcode value to binary pattern
  const encodeBarcodePattern = (value: string): boolean[] => {
    const bars: boolean[] = [true, false, true]; // Start guard
    const digits = value.substring(0, 12).split("");

    const oddPatterns: { [key: string]: string } = {
      "0": "0001101",
      "1": "0011001",
      "2": "0010011",
      "3": "0111101",
      "4": "0100011",
      "5": "0110001",
      "6": "0101111",
      "7": "0111011",
      "8": "0110111",
      "9": "0001011",
    };

    const evenPatterns: { [key: string]: string } = {
      "0": "0100111",
      "1": "0110011",
      "2": "0011011",
      "3": "0100001",
      "4": "0011101",
      "5": "0111001",
      "6": "0000101",
      "7": "0010001",
      "8": "0001001",
      "9": "0010111",
    };

    // Encode digits
    digits.forEach((digit, idx) => {
      const pattern = idx % 2 === 0 ? oddPatterns[digit] : evenPatterns[digit];
      if (pattern) {
        pattern.split("").forEach((bit) => bars.push(bit === "1"));
      }
    });

    bars.push(false, true, false); // Middle guard
    bars.push(true, false, true); // End guard

    return bars;
  };

  // Draw normal barcode

  const drawBarcode = useCallback(
    (ctx: CanvasRenderingContext2D, pattern: boolean[]) => {
      const padding = 10;
      const barHeight = height - padding * 2;
      const barSpacing = (width - padding * 2) / pattern.length;

      ctx.fillStyle = "#2e2e2e";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";
      pattern.forEach((isBar, idx) => {
        if (isBar) {
          const x = padding + idx * barSpacing;
          ctx.fillRect(x, padding, barSpacing, barHeight);
        }
      });
    },
    [height, width],
  );

  // Apply glitch effect
  const drawGlitch = (
    ctx: CanvasRenderingContext2D,
    pattern: boolean[],
    progress: number,
  ) => {
    const params = glitchParams[intensity];

    // First, draw the normal barcode
    drawBarcode(ctx, pattern);

    // Then apply glitch layers on top
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Flickering effect
    if (Math.random() < params.flickerChance) {
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.3) {
          data[i + 3] = Math.random() > 0.5 ? 0 : 255; // Random transparency
        }
      }
    }

    // Horizontal shift glitch
    if (Math.random() < 0.6) {
      const shiftAmount = Math.floor(
        (Math.random() - 0.5) * params.shiftRange * 2,
      );

      const tempImageData = ctx.createImageData(width, height);
      const tempData = tempImageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let sourceX = x + shiftAmount;

          // Handle wrapping
          if (sourceX < 0) sourceX += width;
          if (sourceX >= width) sourceX -= width;

          // Only apply shift to random scanlines
          if (Math.random() < 0.3) {
            const sourceIdx = (y * width + sourceX) * 4;
            const destIdx = (y * width + x) * 4;

            if (
              sourceIdx >= 0 &&
              sourceIdx < data.length &&
              destIdx >= 0 &&
              destIdx < data.length
            ) {
              tempData[destIdx] = data[sourceIdx];
              tempData[destIdx + 1] = data[sourceIdx + 1];
              tempData[destIdx + 2] = data[sourceIdx + 2];
              tempData[destIdx + 3] = data[sourceIdx + 3];
            }
          }
        }
      }

      // Blend shifted scanlines
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.15) {
          data[i] = tempData[i];
          data[i + 1] = tempData[i + 1];
          data[i + 2] = tempData[i + 2];
          data[i + 3] = tempData[i + 3];
        }
      }
    }

    // Pixelation/block distortion
    if (Math.random() < 0.5) {
      const blockSize = Math.max(
        2,
        Math.floor(params.pixelSize * (1 + progress)),
      );

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.2) {
          // Get pixel position
          const pixelIdx = i / 4;
          const y = Math.floor(pixelIdx / width);
          const x = pixelIdx % width;

          // Get average color from block
          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
            for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              if (idx < data.length) {
                r += data[idx];
                g += data[idx + 1];
                b += data[idx + 2];
                count++;
              }
            }
          }

          if (count > 0) {
            data[i] = Math.floor(r / count);
            data[i + 1] = Math.floor(g / count);
            data[i + 2] = Math.floor(b / count);
          }
        }
      }
    }

    // Add color offset (RGB separation)
    if (Math.random() < 0.4) {
      const offsetAmount = Math.floor(params.offsetIntensity * progress * 2);

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.1) {
          const offset = Math.random() > 0.5 ? offsetAmount : -offsetAmount;
          const idx = i / 4;
          const y = Math.floor(idx / width);
          const x = idx % width;

          // Red channel shift
          if (x + offset >= 0 && x + offset < width) {
            const offsetIdx = (y * width + (x + offset)) * 4;
            if (offsetIdx < data.length) {
              data[i] = data[offsetIdx];
            }
          }

          // Blue channel shift
          if (x - offset >= 0 && x - offset < width) {
            const offsetIdx = (y * width + (x - offset)) * 4;
            if (offsetIdx < data.length) {
              data[i + 2] = data[offsetIdx + 2];
            }
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  // Animation loop
  const animate = (timestamp: number) => {
    if (!canvasRef.current) return;

    const progress =
      (timestamp - startTimeRef.current) / glitchParams[intensity].duration;

    if (progress >= 1) {
      // Glitch complete, draw final barcode
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const pattern = encodeBarcodePattern(currentBarcode);
        drawBarcode(ctx, pattern);
      }
      setIsGlitching(false);
      onGlitchEnd?.();
      animationRef.current = null;
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Generate new random barcode for each frame during glitch
    const glitchBarcode = generateRandomBarcode();
    const pattern = encodeBarcodePattern(glitchBarcode);

    if (progress < 0.5) {
      // Apply glitch
      drawGlitch(ctx, pattern, progress * 2);
    } else if (progress < 0.75) {
      // Reduce glitch intensity
      drawGlitch(ctx, pattern, (1 - progress) * 4);
    } else {
      // Return to normal with final barcode
      drawBarcode(ctx, pattern);
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  // Trigger glitch
  const triggerGlitch = useRef(() => {
    if (isGlitching) return;

    setIsGlitching(true);
    onGlitchStart?.();
    startTimeRef.current = performance.now();

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  });

  // Auto glitch trigger - 3 flickers total with 1.5s intervals
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];

    const scheduleGlitches = () => {
      // Schedule 3 glitches with 1.5 second intervals
      for (let i = 0; i < 3; i++) {
        const timeoutId = setTimeout(() => {
          // Generate new barcode that will persist during this glitch
          const newBarcode = generateRandomBarcode();
          setCurrentBarcode(newBarcode);
          triggerGlitch.current();
        }, i * 1500);

        timeoutIds.push(timeoutId);
      }

      // After 3 glitches complete (3 * 1.5s = 4.5s), wait before restarting
      const restartTimeoutId = setTimeout(scheduleGlitches, 3 * 1500 + 3000);
      timeoutIds.push(restartTimeoutId);
    };

    // Start the glitch sequence
    scheduleGlitches();

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Initial draw
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const pattern = encodeBarcodePattern(currentBarcode);
    drawBarcode(ctx, pattern);
  }, [currentBarcode, drawBarcode]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        role="img"
        aria-label={`Barcode ${currentBarcode} glitching automatically`}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border border-border"
        />
      </div>
    </div>
  );
}
