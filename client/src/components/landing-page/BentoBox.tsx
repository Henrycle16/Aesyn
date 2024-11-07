"use client";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const features = [
  {
    //Icon: InputIcon, Highlight your platform's ability to connect brands with creators using AI. Briefly describe how your system automates and optimizes collaborations.
    name: "How It Works",
    description:
      "Learn the step-by-step process behind connecting brands with the right creators for successful collaborations.",
    href: "/",
    cta: "Learn more",
    background: "",
    className: "lg:col-start-1 lg:col-end-9 lg:row-start-1 lg:row-end-8",
  },
  {
    //Icon: GlobeIcon, Emphasize the ability to provide real-time data and insights, enabling smarter decision-making. Include key metrics you track (e.g., reach, engagement, conversions).
    name: "Insights That Fuel Growth",
    description:
      "Access actionable data on campaign performance, engagement, and audience reach.",
    href: "/",
    cta: "Learn more",
    background: "",
    className: "lg:col-start-1 lg:col-end-7 lg:row-start-8 lg:row-end-13",
  },
  {
    //Icon: CalendarIcon, This box can be a space for showcasing success stories from brands or creators who have benefitted from ShareFluence. Use a short testimonial or case study preview.
    name: "Resources for Creators & Brands",
    description:
      "Explore tips, strategies, and tools to elevate your digital marketing and content creation game.",
    href: "/",
    cta: "Learn more",
    background: "",
    className: "lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:row-end-8",
  },
  {
    //Icon: BellIcon, This is a whatever box. Not really sure what to put here.
    name: "AI-Powered Matching for Optimal Results",
    description:
      "Let our AI find the perfect creators for your brand, driving targeted, impactful campaigns with ease.",
    href: "/",
    cta: "Learn more",
    background: "",
    className: "lg:col-start-7 lg:col-end-13 lg:row-start-8 lg:row-end-13",
  },
];

const BentoBox = () => {
  return (
    <>
      <div className="flex flex-col items-center max-w-7xl py-40">
        <h1 className="text-[2.5rem] text-center leading-[3rem] font-semibold">
          Empowering Brands & Creators Through AI-Powered Collaboration
        </h1>
        <p className="text-center mt-5 mb-16 text-xl max-w-3xl">
          Harness the power of AI to create meaningful connections, drive
          success, and simplify your social media marketing strategy.
        </p>

        <BentoGrid>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </>
  );
};

export default BentoBox;
