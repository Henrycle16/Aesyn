"use client";

const BentoBox = () => {
  const gradientTextStyle =
    "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] text-transparent bg-clip-text";
  const gradientButtonStyle =
    "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] rounded-3xl py-2 px-5 text-sm font-bold hover:from-pink-500 hover:to-orange-500";

  return (
    <div className="flex flex-col items-center max-w-4xl mb-64">
      <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
        Lorem ipsum dolor sit amet, consectetu
      </h1>
      <p className="text-center mt-5 mb-16 text-xl max-w-3xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun, consectetur adipiscing elit, sed do eiusmod tempor incididun
      </p>
    </div>
  );
};

export default BentoBox;
