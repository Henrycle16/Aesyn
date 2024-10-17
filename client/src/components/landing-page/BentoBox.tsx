"use client";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { AnimatedBeamMultipleOutputDemo } from "../ui/animated-beam-bento";

const features = [
  {
    //Icon: FileTextIcon,
    name: "Integration",
    description: "Learn the step-by-step process behind connecting.",
    href: "#",
    cta: "Learn more",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 bottom-8 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
    className: "col-span-3 lg:col-span-7",
  },
  {
    //Icon: BellIcon,
    name: "Resources for Creators & Brands",
    description: "Explore tips, strategies, and tools to elevate.",
    href: "#",
    cta: "Learn more",
    background: "",
    className: "col-span-3 lg:col-span-5",
  },
  {
    //Icon: Share2Icon,
    name: "Insights",
    description: "Access actionable data and campaigns.",
    href: "#",
    cta: "Learn more",
    background: "",
    className: "col-span-3 lg:col-span-5",
  },
  {
    //Icon: CalendarIcon,
    name: "Optimal Results",
    description: "Let our AI find the perfect creators for your brand.",
    className: "col-span-3 lg:col-span-7",
    href: "#",
    cta: "Learn more",
    background: "",
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
