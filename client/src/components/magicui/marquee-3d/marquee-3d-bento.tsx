// marquee-3d-bento.tsx
import { Marquee } from "@/components/magicui/marquee-3d/marquee-3d";
import Facebook from "@/components/svgs/Facebook";
import Instagram from "@/components/svgs/Instagram";
import Tiktok from "@/components/svgs/Tiktok";
import InsightCards from "./InsightCards";

// MUI Icons
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
interface Insight {
  title: string;
  icon: React.ReactNode;
  reach: string;
  impressions: string;
  likes: string;
  shares: string;
}

const insights: Insight[] = [
  {
    title: "Boba Ad",
    icon: <Instagram />,
    reach: "12.6k",
    impressions: "14.1k",
    likes: "10k",
    shares: "5.7k",
  },
  {
    title: "Fitness Clothing Ad",
    icon: <Instagram />,
    reach: "15k",
    impressions: "15.7k",
    likes: "9.6k",
    shares: "3.8k",
  },
  {
    title: "Restaurant Review",
    icon: <Tiktok />,
    reach: "8.2k",
    impressions: "9.1k",
    likes: "5.9k",
    shares: "2k",
  },
  {
    title: "Pho Campaign",
    icon: <Instagram />,
    reach: "10.4k",
    impressions: "14.7k",
    likes: "8k",
    shares: "5.3k",
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
          {insights.map((data, idx) => (
            <InsightCards
              key={idx}
              title={data.title}
              icon={data.icon}
              reach={data.reach}
              impressions={data.impressions}
              likes={data.likes}
              shares={data.shares}
              reachIcon={
                <VisibilityOutlinedIcon className="w-4 h-4 text-[#000000] mr-1" />
              }
              impressionsIcon={
                <SentimentSatisfiedOutlinedIcon className="w-4 h-4 text-[#000000] mr-1" />
              }
              likesIcon={
                <ThumbUpOutlinedIcon className="w-4 h-4 text-[#000000] mr-1" />
              }
              sharesIcon={
                <ShareOutlinedIcon className="w-4 h-4 text-[#000000] mr-1" />
              }
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
