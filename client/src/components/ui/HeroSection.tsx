"use client";

const HeroSection = () => {
  const gradientTextStyle =
    "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] text-transparent bg-clip-text";
  const gradientButtonStyle =
    "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] rounded-3xl py-2 px-5 text-sm font-medium hover:from-pink-500 hover:to-orange-500";

  return (
    <div className="flex flex-col items-center max-w-2xl mb-64">
      <h1 className="text-4xl text-center leading-[3rem] font-semibold">
        Connecting <span className={`${gradientTextStyle}`}>brands</span> and{" "}
        <span className={`${gradientTextStyle}`}>creators</span> with the power
        of <span className={`${gradientTextStyle}`}>AI</span>
      </h1>
      <p className="text-center mt-5 mb-16 text-sm max-w-lg">
        ShareFluence is a platform for brands to find creators to broadcast
        their business. Using innovative technology, brands can find their
        perfect...
      </p>
      <button type="button" className={`${gradientButtonStyle}`}>
        Join Waitlist
      </button>
    </div>
  );
};

export default HeroSection;
