"use client";

import React from "react";
import { NewCarousel } from "./carousel";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("./carousel"), { ssr: false });

const Page = () => {
  return (
    <>
      <div className="h-[700vh] w-screen bg-cardinal">test</div>
      <Carousel />
    </>
  );
};

export default Page;
