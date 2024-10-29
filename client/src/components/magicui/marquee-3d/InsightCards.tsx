// InsightCards.tsx
import React from "react";

interface InsightCardProps {
  title: string;
  icon: React.ReactNode;
  reach: string;
  impressions: string;
  likes: string;
  shares: string;
  reachIcon: React.ReactNode;
  impressionsIcon: React.ReactNode;
  likesIcon: React.ReactNode;
  sharesIcon: React.ReactNode;
}

const InsightCards: React.FC<InsightCardProps> = ({
  title,
  icon,
  reach,
  impressions,
  likes,
  shares,
  reachIcon,
  impressionsIcon,
  likesIcon,
  sharesIcon,
}) => {
  return (
    <div className="bg-white border border-[#D9D9D9] p-4 rounded-2xl w-[14rem] h-[15rem] flex flex-col shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-md font-semibold text-[#000000] mb-5">{title}</h3>
        <div className="flex mb-5">
          {React.Children.map(icon, (child) =>
            React.cloneElement(child as React.ReactElement, {
              className: "w-[15px] h-[15px]",
            })
          )}
        </div>
      </div>
      <div className="text-[#000000] text-sm space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {reachIcon}
            <span>Reach</span>
          </div>
          <span className="text-[#5B58EB] text-sm font-semibold">{reach}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {impressionsIcon}
            <span>Impressions</span>
          </div>
          <span className="text-[#5B58EB] text-sm font-semibold">
            {impressions}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {likesIcon}
            <span>Likes</span>
          </div>
          <span className="text-[#5B58EB] text-sm font-semibold">{likes}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {sharesIcon}
            <span>Shares</span>
          </div>
          <span className="text-[#5B58EB] text-sm font-semibold">{shares}</span>
        </div>
      </div>
    </div>
  );
};

export default InsightCards;
