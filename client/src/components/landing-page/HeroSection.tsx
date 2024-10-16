"use client";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl mb-64">
      <h1 className="text-[60px] text-center leading-[4rem] font-semibold">
        Connecting <span className="gradient-text">brands</span> and{" "}
        <span className="gradient-text">creators</span> with the power of{" "}
        <span className="gradient-text">AI</span>
      </h1>
      <p className="text-center mt-[2.3rem] mb-16 text-[20px] max-w-2xl">
        Boost your reach, perfect your campaigns, and build your network. All
        powered by AI, all in one place.
      </p>
      <Link href="/waitlist" className="gradient-button">
        Join Waitlist
      </Link>
    </div>
  );
};

export default HeroSection;
