import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Instagram from "@/components/svgs/Instagram";
import Tiktok from "@/components/svgs/Tiktok";
import Youtube from "@/components/svgs/Youtube";
import X from "@/components/svgs/X";
import Twitch from "@/components/svgs/Twitch";

const reviews = [
  {
    name: "Vi Le",
    username: "@vile",
    body: "Video Games | Tech | Streamer",
    img: "https://avatar.vercel.sh/jack",
    icon: [<X />, <Youtube />, <Twitch />],
  },
  {
    name: "Kris Walker",
    username: "@kwalker",
    body: "DIY | Creative | Art",
    img: "https://avatar.vercel.sh/jill",
    icon: [<Tiktok />],
  },
  {
    name: "Sash Sloan",
    username: "@sashs",
    body: "Health | Fitness",
    img: "https://avatar.vercel.sh/john",
    icon: [<Instagram />, <Tiktok />, <Youtube />],
  },
  {
    name: "Jacky Pham",
    username: "@jpham",
    body: "Entrepreneur | Finance",
    img: "https://avatar.vercel.sh/jane",
    icon: [<Youtube />],
  },
  {
    name: "Jane Ann",
    username: "@janea",
    body: "Beauty | Health",
    img: "https://avatar.vercel.sh/jenny",
    icon: [<Instagram />, <Youtube />, <Tiktok />],
  },
  {
    name: "Calvin Freeman",
    username: "@IamCaorin",
    body: "LifeStyle | Sports | Health",
    img: "https://avatar.vercel.sh/james",
    icon: [<Instagram />, <Tiktok />],
  },
  {
    name: "Damon Salvatore",
    username: "@dsalvatore",
    body: "Foodie | Travel | Adventure",
    img: "https://avatar.vercel.sh/jenny",
    icon: [<Instagram />, <Tiktok />],
  },
  {
    name: "Sammy James",
    username: "@sammyj",
    body: "Foodie | Travel | Adventure",
    img: "https://avatar.vercel.sh/james",
    icon: [<X />, <Instagram />, <Youtube />],
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
        "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-4 bg-[#FAFAFA] text-black"
      )}>
      <div className="flex flex-row items-start gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-xs font-bold dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs dark:text-white/40">{username}</p>
          <p className="mt-2 text-sm">{body}</p>
        </div>
      </div>
      <div className="mt-2 flex justify-end space-x-2 border-2 border-red-500">{icon}</div>
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
