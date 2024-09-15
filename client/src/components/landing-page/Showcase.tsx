"use client";

import Image from "next/image";

interface ShowcaseProps {
  feature: number;
  scrollDirection: string;
}

const Showcase = ({feature}: ShowcaseProps) => {
  //going up 17-5, going down 8-21

  // Feature 1: < 11
  // Feature 2: 11-14
  // Feature 3: > 14

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
              <div className={`${feature < 11 ? "text-blue-500" : ""} border-[1px] border-[#F153FF] px-20 py-4 rounded-xl`}>
                Section 1
              </div>
              <div className={`${(feature >= 11 && Number(feature) <= 14) ? "text-blue-500" : ""} border-[1px] border-[#F153FF] px-20 py-4 rounded-xl`}>
                Section 2
              </div>
              <div className={`${feature > 14 ? "text-blue-500" : ""} border-[1px] border-[#F153FF] px-20 py-4 rounded-xl`}>
                Section 3
              </div>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="">
            <Image
              src="/showcase_analytics.png"
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