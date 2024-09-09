"use client";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center max-w-2xl mb-64">
      <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
        Connecting <span className="gradient-text">brands</span> and{" "}
        <span className="gradient-text">creators</span> with the power of{" "}
        <span className="gradient-text">AI</span>
      </h1>
      <p className="text-center mt-5 mb-16 text-base max-w-xl">
        ShareFluence is a platform for brands to find creators to broadcast
        their business. Using innovative technology, brands can find their
        perfect...
      </p>
      <Link href="/waitlist" className="gradient-button">
        Join Waitlist
      </Link>
    </div>
  );
};

export default HeroSection;
