import { IMAGE_DATA } from "@/constant";
import AnimatedImage from "./animated-image";
import useProjectAnimation from "@/hooks/animation/use-project-animation";

export default function Carousel() {
  const { imageContainerRef, imageRef } = useProjectAnimation();

  return (
    <>
      {IMAGE_DATA.map((image, index) => (
        <AnimatedImage
          key={`image-${index}`}
          imageContainerRef={(el) => {
            if (el) imageContainerRef.current[index] = el;
          }}
          imageRef={(el) => {
            if (el) imageRef.current[index] = el;
          }}
          src={image.url}
          position={{ top: image.position.top, left: image.position.left }}
          alt={`Project image ${index + 1}`}
          size={image.size}
          className="box"
        />
      ))}
    </>
  );
}
