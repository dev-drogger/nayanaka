import { Canvas } from "@react-three/fiber";
import { Square } from "@/components/3d/scene";

export const NewAbout = () => {
  return (
    <section id="new" className="about">
      <div className="min-w-screen h-[20vh] md:h-[50vh] relative flex-center items-start overflow-visible">
        <div className="absolute w-[200vw] flex-center">
          <h1 className="text-[135px] md:text-[400px]">ABOUT US</h1>
        </div>
      </div>

      <div className=" flex-center ">
        <div className="bg-jet h-[60vh] w-[80vw] flex-center px-8 justify-start">
          <p className="text-2xl md:text-5xl mb-6 text-white text-justify">
            Nayanaka Creative Studio is a dynamic collective of designers,
            developers, and strategists, united by a shared passion for creating
            exceptional digital experiences. We seamlessly blend creativity with
            functionality, crafting websites that are not only visually
            captivating but also strategically designed to drive meaningful
            results.
          </p>
        </div>
      </div>
    </section>
  );
};
