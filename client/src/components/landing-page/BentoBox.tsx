"use client";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { AnimatedBeamMultipleOutputDemo } from "@/components/magicui/animated-beam-bento/animated-beam-bento";
import { AnimatedListDemo } from "../magicui/animated-list-bento/animated-list-bento";
import { MarqueeDemo } from "../magicui/marquee-bento/marquee-bento";
import { Marquee3D } from "../magicui/marquee-3d/marquee-3d-bento";

const features = [
  {
    //Icon: FileTextIcon,
    name: "Fully Integrated",
    description: "Supports all of your favorite social media platforms.",
    href: "#",
    cta: "Learn more",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute bottom-8 h-[400px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
    className: "col-span-3 lg:col-span-7",
  },
  {
    //Icon: BellIcon,
    name: "Insights",
    description: "Access actionable data on your campaign's performance.",
    href: "#",
    cta: "Learn more",
    background: <Marquee3D />,
    className: "col-span-3 lg:col-span-5",
  },
  {
    //Icon: Share2Icon,
    name: "Stay Updated",
    description: "Track new and ongoing campaigns in real-time.",
    href: "#",
    cta: "Learn more",
    background: (
      <AnimatedListDemo className="absolute top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
    className: "col-span-3 lg:col-span-5",
  },
  {
    //Icon: CalendarIcon,
    name: "Optimal Results",
    description: "Let our AI find the perfect creators for your brand.",
    href: "#",
    cta: "Learn more",
    background: <MarqueeDemo />,
    className: "col-span-3 lg:col-span-7",
  },
];

const BentoBox = () => {
  return (
    <>
      <div className="flex flex-col items-center py-40">
        <div className="max-w-[52rem]">
          <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
            Empowering Brands & Creators through AI-Powered Collaboration
          </h1>
          <p className="text-center mt-5 mb-10 text-xl">
            Harness the power of AI to create meaningful connections, drive
            success, and simplify your social media marketing strategy.
          </p>
        </div>

        <BentoGrid className="max-w-5xl">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </>
  );
};

export default BentoBox;
