"use client";

const CallToAction = () => {
  const gradientButtonStyle =
    "bg-gradient-to-r from-[#5B58EB] to-[#BB63FF] rounded-3xl py-2 px-5 text-sm font-bold hover:from-pink-500 hover:to-orange-500";

  return (
    <div className="flex flex-col items-center max-w-5xl pt-32 pb-32">
      <h1 className="text-[60px] text-center leading-[4rem] font-semibold">
        You don&apos;t want to miss out!
      </h1>
      <p className="text-center mt-5 mb-16 text-[20px] max-w-4xl">
        Joining the waitlist grants you priority access and exclusive benefits,
        ensuring you&apos;re among the first to experience our innovative
        features and updates.
      </p>
      <button type="button" className="gradient-button">
        Join Waitlist
      </button>
    </div>
  );
};

export default CallToAction;
