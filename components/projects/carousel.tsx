import AnimatedImage from "./animated-image";
import useProjectAnimation from "@/hooks/animation/use-project-animation";

export default function Carousel() {
  const imageData = [
    {
      url: "/pictures/DSC00128.webp",
      position: { top: 55, left: 30 },
      size: { width: 480, height: 470 },
    },
    {
      url: "/pictures/img6.webp",
      position: { top: 157, left: 26 },
      size: { width: 480, height: 290 },
    },

    {
      url: "/pictures/DSC09892.webp",
      position: { top: 158, left: 56 },
      size: { width: 165, height: 485 },
    },

    {
      url: "/pictures/img3.webp",
      position: { top: 177, left: 80 },
      size: { width: 290, height: 290 },
    },
    {
      url: "/pictures/img5.webp",
      position: { top: 231, left: 61 },
      size: { width: 290, height: 290 },
    },
    {
      url: "/pictures/IMG_0918.webp",
      position: { top: 255, left: 23 },
      size: { width: 480, height: 470 },
    },
    {
      url: "/pictures/IMG_1402.webp",
      position: { top: 316, left: 23 },
      size: { width: 480, height: 470 },
    },
    {
      url: "/pictures/IMG_1849.webp",
      position: { top: 361, left: 73 },
      size: { width: 700, height: 650 },
    },
    {
      url: "/pictures/DSC00212.webp",
      position: { top: 465, left: 33 },
      size: { width: 575, height: 670 },
    },
    {
      url: "/pictures/IMG_5501.webp",
      position: { top: 552, left: 32 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/IMG_1867.webp",
      position: { top: 557, left: 85 },
      size: { width: 650, height: 450 },
    },
    {
      url: "/pictures/IMG_5299.webp",
      position: { top: 640, left: 23 },
      size: { width: 550, height: 550 },
    },
    {
      url: "/pictures/DSC09949.webp",
      position: { top: 666, left: 77 },
      size: { width: 550, height: 550 },
    },
  ];

  const { imageContainerRef, imageRef } = useProjectAnimation();

  return (
    <>
      {imageData.map((image, index) => (
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
