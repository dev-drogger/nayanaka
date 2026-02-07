import React, { useMemo } from "react";
import { InfiniteSlider } from "../ui/infinite-slider";

// Memoized slider items to prevent re-renders
const SliderItems = React.memo(() => {
  const items = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => (
        <React.Fragment key={i}>
          <div className="rotate-90">PROJECTS</div>
          <div className="rotate-90 mt-52">&bull;</div>
        </React.Fragment>
      )),
    []
  );

  return <>{items}</>;
});

SliderItems.displayName = "SliderItems";

export const ProjectsSlider = React.memo(() => {
  return (
    <>
      <InfiniteSlider
        direction="vertical"
        duration={60}
        className="text-white absolute border-cardinal border-2 left-1 z-20 lg:left-0 h-full w-[50px] lg:w-[80px] flex-center bg-jet text-2xl lg:text-5xl"
      >
        <SliderItems />
      </InfiniteSlider>
      <InfiniteSlider
        reverse
        direction="vertical"
        duration={60}
        className="text-white absolute border-cardinal border-2 z-20 right-1 lg:right-0 h-full w-[50px] lg:w-[80px] flex-center bg-jet text-2xl lg:text-5xl"
      >
        <SliderItems />
      </InfiniteSlider>
    </>
  );
});

ProjectsSlider.displayName = "ProjectsSlider";
