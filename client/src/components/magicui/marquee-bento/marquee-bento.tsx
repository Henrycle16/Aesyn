import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee-bento/marquee";
import Instagram from "@/components/svgs/Instagram";
import Tiktok from "@/components/svgs/Tiktok";
import Youtube from "@/components/svgs/Youtube";
import X from "@/components/svgs/X";
import Twitch from "@/components/svgs/Twitch";
import React from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Vi Le",
    username: "@vile",
    body: "Video Games | Tech | Streamer",
    img: "/person-1.jpg",
    icon: [<X key="x" />, <Youtube key="youtube" />, <Twitch key="twitch" />],
  },
  {
    name: "Kris Walker",
    username: "@kwalker",
    body: "DIY | Creative | Art",
    img: "/person-3.jpg",
    icon: [<Tiktok key="tiktok" />],
  },
  {
    name: "Sash Sloan",
    username: "@sashs",
    body: "Health | Fitness",
    img: "/person-4.jpg",
    icon: [<Instagram key="instagram" />, <Tiktok key="tiktok" />, <Youtube key="youtube" />],
  },
  {
    name: "Jacky Pham",
    username: "@jpham",
    body: "Entrepreneur | Finance",
    img: "/person-2.jpg",
    icon: [<Youtube key="youtube" />],
  },
  {
    name: "Jane Ann",
    username: "@janea",
    body: "Beauty | Health",
    img: "/person-5.jpg",
    icon: [<Instagram key="instagram" />, <Youtube key="youtube" />, <Tiktok key="tiktok" />],
  },
  {
    name: "Calvin Freeman",
    username: "@IamCaorin",
    body: "LifeStyle | Sports | Health",
    img: "/person-6.jpg",
    icon: [<Instagram key="instagram" />, <Tiktok key="tiktok" />],
  },
  {
    name: "Damon Salvatore",
    username: "@dsalvatore",
    body: "Foodie | Travel | Adventure",
    img: "/person-7.jpg",
    icon: [<Instagram key="instagram" />, <Tiktok key="tiktok" />],
  },
  {
    name: "Sammy James",
    username: "@sammyj",
    body: "Foodie | Travel | Adventure",
    img: "/person-8.jpg",
    icon: [<X key="x" />, <Instagram key="instagram" />, <Youtube key="youtube" />],
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
  icon,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  icon: React.ReactNode;
}) => {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-xl border pt-4 px-4 pb-1 bg-[#FAFAFA] text-black border-gray-500"
      )}>
      <div className="flex flex-row items-start gap-2">
        <Image className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-xs font-bold dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs dark:text-white/40">{username}</p>
          <p className="mt-2 text-sm">{body}</p>
        </div>
      </div>
      <div className="mt-2 flex justify-end space-x-2">
        {React.Children.map(icon, (child) =>
          React.cloneElement(child as React.ReactElement, {
            className: "w-[15px] h-[15px]",
          })
        )}
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="absolute flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl -bottom-1/3">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
