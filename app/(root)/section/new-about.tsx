export const NewAbout = () => {
  return (
    <section className="about">
      <div className="flex-col-center gap-5">
        <div className="min-w-screen relative flex-center items-start overflow-visible">
          <div className="flex-center">
            <h1 className="text-[135px] md:text-[15rem] text-black">
              ABOUT US
            </h1>
          </div>
        </div>

        <div className="flex-center ">
          <div className="bg-jet h-[60vh] w-[80vw] flex-center px-8 justify-start">
            <p className="text-2xl md:text-5xl mb-6 text-white text-justify">
              Nayanaka Creative Studio is a dynamic collective of designers,
              developers, and strategists, united by a shared passion for
              creating exceptional digital experiences. We seamlessly blend
              creativity with functionality, crafting websites that are not only
              visually captivating but also strategically designed to drive
              meaningful results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
