"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


interface ShowcaseProps {
  feature: number;
  scrollDirection: string;
}

const Showcase = ({feature}: ShowcaseProps) => {
  // Scrolling up goes from feature-17 to feature-5
  // Scrolling down goes from feature-8 to feature-21

  // Feature 1: < 11
  // Feature 2: 11-14
  // Feature 3: > 14
  // Need to adjust scrolling amount (can be done by changing height of parent container)

  const [imgSrc, setImgSrc] = useState<string>("/showcase_analytics.png");
  const [section, setSection] = useState<string>("feature-1");

  useEffect(() => {
    if (feature < 11) {
      setSection("feature-1");
      setImgSrc("/showcase_analytics.png");

    } else if (feature >= 11 && feature <= 14) {
      setSection("feature-2");
      setImgSrc("/showcase_analytics_2.png");

    } else if (feature > 14) {
      setSection("feature-3");
      setImgSrc("/showcase_analytics_3.png");
    }
  }, [feature]);
  

  return (
    <>
      <div className="flex flex-col items-center max-w-7xl">
        <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
          Lorem ipsum dolor sit amet, consectetu
        </h1>
        <p className="text-center mt-5 mb-16 text-xl max-w-3xl text-[#4A4A4A]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididun, consectetur adipiscing elit, sed do eiusmod
          tempor
        </p>

        {/* Left Side: Description */}
        <div className="grid grid-cols-[45%_55%] gap-10 items-center justify-center w-[62rem]">
          <div className="border-[1px] border-[#F153FF] min-h-[250px] bg-gradient-to-br from-[#ffffff4d] to-[#ffffff26] from-0% to-100% px-10 py-10 flex flex-col gap-y-5 rounded-xl">
            <h3 className="font-semibold text-2xl">Lorem ipsum dolor sit amet, consectetu</h3>
            <p className="text-[#4A4A4A] text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun</p>
            <div className="gap-y-5 flex flex-col font-semibold my-10">
              <div className={`${section === "feature-1" ? "text-blue-500" : ""} border-[1px] border-[#F153FF] px-20 py-4 rounded-xl`}>
                Section 1
              </div>
              <div className={`${section === "feature-2" ? "text-blue-500" : ""} border-[1px] border-[#F153FF] px-20 py-4 rounded-xl`}>
                Section 2
              </div>
              <div className={`${section === "feature-3" ? "text-blue-500" : ""} border-[1px] border-[#F153FF] px-20 py-4 rounded-xl`}>
                Section 3
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="">
            <Image
              src={imgSrc}
              alt="Showcase"
              width={600}
              height={600} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Showcase;