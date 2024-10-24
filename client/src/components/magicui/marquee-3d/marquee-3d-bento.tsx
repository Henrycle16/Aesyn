import { Marquee } from "@/components/magicui/marquee-3d/marquee-3d";
import Facebook from "@/components/svgs/Facebook";
import Instagram from "@/components/svgs/Instagram";
import Tiktok from "@/components/svgs/Tiktok";
import Image from "next/image";

const logos = [
  {
    name: "BobaAd",
    body: <Facebook />,
  },
  {
    name: "Instagram",
    body: <Instagram />,
  },
  {
    name: "TikTok",
    body: <Tiktok />,
  },
];

export function Marquee3D() {
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg px-20 md:shadow-xl">
      <div className="flex flex-row gap-4 [perspective:300px] z-0">
        <Marquee
          className="h-96 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
          vertical
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
          }}>
          {logos.map((data, idx) =>
            typeof data.body === "string" ? (
              <Image
                key={idx}
                src={data.body}
                alt={data.name}
                className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 "
              />
            ) : (
              <div
                key={idx}
                className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 ">
                {data.body}
              </div>
            )
          )}
        </Marquee>
      </div>
    </div>
  );
}
