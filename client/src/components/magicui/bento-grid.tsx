import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-rows-12 grid-cols-12 gap-x-8 gap-y-5",
        className
      )}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative min-h-[225px] col-span-13 flex flex-col justify-between overflow-hidden rounded-xl border-[1px] border-transparent",
      // light styles
      "bg-gradient-to-br from-[#ffffff4d] to-[#ffffff26] from-0% to-100%",
      className
    )}>
    <div className="flex flex-col gap-1 p-6 relative z-10">
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="max-w-lg text-[#D9D9D9]">{description}</p>
    </div>
    <BorderBeam className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute inset-0 rounded-xl pointer-events-none" />
  </div>
);

export { BentoCard, BentoGrid };
