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
    //Icon: InputIcon,
    name: "1 Lorem ipsum dolor sit amet, consectetur",
    description: "Lorem ipsum dolor sit amet, consectetur",
    href: "/",
    cta: "Learn more",
    background: "",
    className: "lg:col-start-1 lg:col-end-9 lg:row-start-1 lg:row-end-8",
  },
  {
    //Icon: GlobeIcon,
    name: "2 Lorem ipsum dolor sit amet, consectetur",
    description: "Lorem ipsum dolor sit amet, consectetur",
    href: "/",
    cta: "Learn more",
    background: "",
    className: "lg:col-start-1 lg:col-end-7 lg:row-start-8 lg:row-end-13",
  },
  {
    //Icon: CalendarIcon,
    name: "3 Lorem ipsum dolor sit amet, consectetur",
    description: "Lorem ipsum dolor sit amet, consectetur",
    href: "/",
    cta: "Learn more",
    background: "",
    className: "lg:col-start-9 lg:col-end-13 lg:row-start-1 lg:row-end-8",
  },
  {
    //Icon: BellIcon,
    name: "4 Lorem ipsum dolor sit amet, consectetur",
    description: "Lorem ipsum dolor sit amet, consectetur",
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
          Lorem ipsum dolor sit amet, consectetu adipiscing
        </h1>
        <p className="text-center mt-5 mb-16 text-xl max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididun, consectetur adipiscing elit, sed do eiusmod
          tempor incididun
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
