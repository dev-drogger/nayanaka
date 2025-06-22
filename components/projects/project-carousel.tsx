import { Scroll } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/use-media-query";
import ProjectImage from "@/components/projects/project-image";
import { useMemo, useCallback } from "react";
import {
  IMAGE_URLS,
  MOBILE_CONFIG,
  DESKTOP_CONFIG,
  TABLET_CONFIG,
} from "@/constant";

export function ProjectCarousel() {
  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // const imageConfigs = useMemo(() => {
  //   if (isMobile) {
  //     return IMAGE_URLS.map((url, index) => {
  //       const config = MOBILE_CONFIG[index];
  //       return {
  //         url,
  //         scale: config.scale as [number, number],
  //         position: [config.pos[0], config.pos[1] * h, 0] as [
  //           number,
  //           number,
  //           number
  //         ],
  //       };
  //     });
  //   }

  //   return IMAGE_URLS.map((url, index) => {
  //     const config = DESKTOP_CONFIG[index];
  //     return {
  //       url,
  //       scale: [config.scaleX, config.scaleY] as [number, number],
  //       position: [config.posX, config.posY, 0] as [number, number, number],
  //     };
  //   });
  // }, [, h, isMobile]);

  const imageConfigs = useMemo(() => {
    const getConfig = (config) => {
      return IMAGE_URLS.map((url, index) => {
        const configData = config[index];
        return {
          url,
          scale: [configData.scaleX, configData.scaleY as [number, number]],
          position: [configData.posX, configData.posY, 0] as [
            number,
            number,
            number
          ],
        };
      });
    };

    switch (true) {
      case isMobile:
        return getConfig(MOBILE_CONFIG);
      case isTablet:
        return getConfig(TABLET_CONFIG);
      default:
        return getConfig(DESKTOP_CONFIG);
    }
  }, [isTablet, isMobile]);

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
