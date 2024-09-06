"use client";

const Showcase = () => {
  return (
    <>
      <div className="flex flex-col items-center max-w-7xl py-40 border-2 border-red-500">
        <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
          Lorem ipsum dolor sit amet, consectetu adipiscing
        </h1>
        <p className="text-center mt-5 mb-16 text-xl max-w-3xl text-[#4A4A4A]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididun, consectetur adipiscing elit, sed do eiusmod
          tempor
        </p>

        <div className="grid grid-cols-[45%_55%] gap-10 items-center justify-center w-[80rem]">
          <div className="border-2 border-red-500 min-h-[250px] bg-gradient-to-br from-[#FDE9FF] to-[#F3EAFF] from-0% to-100% p-3 flex flex-col gap-y-5">
            <h3 className="font-semibold text-2xl">Lorem ipsum dolor sit amet, consectetu</h3>
            <p className="text-[#4A4A4A] text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun</p>
          </div>
          <div className="border-2 border-blue-500 min-h-[250px] bg-gradient-to-br from-[#FDE9FF] to-[#F3EAFF] from-0% to-100%"></div>
        </div>
      </div>
    </>
  );
};

export default Showcase;
