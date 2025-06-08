import { useThree } from "@react-three/fiber";
import { Scroll } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/use-media-query";
import ProjectImage from "@/components/projects/project-image";
import { useMemo, useCallback } from "react";
import { IMAGE_URLS, MOBILE_CONFIG, DESKTOP_CONFIG } from "@/constant";

export function ProjectCarousel() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const imageConfigs = useMemo(() => {
    if (isMobile) {
      return IMAGE_URLS.map((url, index) => {
        const config = MOBILE_CONFIG[index];
        return {
          url,
          scale: config.scale as [number, number],
          position: [config.pos[0], config.pos[1] * h, 0] as [
            number,
            number,
            number
          ],
        };
      });
    }

    const scaleFactor = isTablet ? 0.9 : 1;
    return IMAGE_URLS.map((url, index) => {
      const config = DESKTOP_CONFIG[index];
      return {
        url,
        scale: [
          w * config.scaleX * scaleFactor,
          w * config.scaleY * scaleFactor,
        ] as [number, number],
        position: [
          w * config.posX,
          config.posY === -27
            ? config.posY
            : h * config.posY + (config.offsetY ?? 0),
          0,
        ] as [number, number, number],
      };
    });
  }, [w, h, isMobile, isTablet]);

  const renderImage = useCallback(
    (image: (typeof imageConfigs)[0], index: number) => (
      <ProjectImage
        key={index}
        url={image.url}
        scale={image.scale}
        position={image.position}
      />
    ),
    []
  );

  return <Scroll>{imageConfigs.map(renderImage)}</Scroll>;
}
