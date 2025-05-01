import { useThree } from "@react-three/fiber";
import { Scroll } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/use-media-query";
import ProjectImage from "@/components/projects/project-image";

export function ProjectCarousel() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Adjust scale factors based on device size
  const scaleFactor = isMobile ? 0.8 : isTablet ? 0.9 : 1;

  return (
    <Scroll>
      <ProjectImage
        url="/pictures/DSC00128.webp"
        scale={
          isMobile
            ? [3, 3, 3]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [0, 1, 0] : [-w / 6, -27, 0]}
      />
      <ProjectImage
        url="/pictures/DSC09892.webp"
        scale={
          isMobile ? [2, 2, 2] : [2 * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 0.7, 0] : [w / 30, -h * 1 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/img6.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 0.7, 0] : [-w / 4, -h * 1 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/img3.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 5) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 1.3, 0] : [w / 4, -h * 1.2 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/img5.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 5) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 1.3, 0] : [w / 10, -h * 1.75 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/IMG_0918.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 1.8, 0] : [-w / 4, -h * 2 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/IMG_1402.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 1.8, 0] : [-w / 4, -h * 2.6 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/IMG_1849.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 2) * scaleFactor, (w / 2) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 2.3, 0] : [w / 4.5, -h * 3.1 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/DSC00212.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 2.5) * scaleFactor, (w / 2) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 2.3, 0] : [-w / 6, -h * 4.1 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/IMG_5501.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 2.8, 0] : [-w / 6, -h * 4.9 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/IMG_1867.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 4) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 2.8, 0] : [w / 3.5, -h * 5.1 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/IMG_1868.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 5) * scaleFactor, 1]
        }
        position={isMobile ? [-1, -h * 3.3, 0] : [-w / 4, -h * 5.4 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/IMG_5299.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [1, -h * 3.3, 0] : [-w / 6, -h * 5.9 - 27, 0]}
      />
      <ProjectImage
        url="/pictures/DSC09949.webp"
        scale={
          isMobile
            ? [2, 2, 2]
            : [(w / 3) * scaleFactor, (w / 3) * scaleFactor, 1]
        }
        position={isMobile ? [0, -h * 3.8, 0] : [w / 4, -h * 6 - 27, 0]}
      />
    </Scroll>
  );
}
