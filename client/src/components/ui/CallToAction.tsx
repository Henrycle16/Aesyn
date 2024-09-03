"use client";

const CallToAction = () => {
  const gradientButtonStyle =
    "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] rounded-3xl py-2 px-5 text-sm font-bold hover:from-pink-500 hover:to-orange-500";

  return (
    <div className="flex flex-col items-center max-w-2xl pt-32 pb-32">
      <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
        You don't want to miss out!
      </h1>
      <p className="text-center mt-5 mb-16 text-base max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididun, consectetur adipiscing elit. Sed do eiusmod tempor incididun.
      </p>
      <button type="button" className={`${gradientButtonStyle}`}>
        Join Waitlist
      </button>
    </div>
  );
};

export default CallToAction;
