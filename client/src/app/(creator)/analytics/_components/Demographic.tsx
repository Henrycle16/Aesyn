import GenderPieChart from "@/components/charting/GenderPieChart";
import AgeHistogram from "@/components/charting/AgeHistogram";
import React from "react";

export type GenderData = {
  dimension_values: string[];
  value: number;
};

export type AgeData = {
  dimension_values: string[];
  value: number;
};

type IGDemographicData = {
  insights: {
    followersGender: GenderData[];
    followersAge: AgeData[];
  };
};

const Demographic = ({
  instagramData,
}: {
  instagramData: IGDemographicData | null;
}) => {
  console.log("InstagramData Into Demographic:", instagramData);

  return (
    <div className="border border-gray-300 rounded-badge min-h-[35.125rem] px-10 pt-10 pb-4">
      <div className="heading1">Followers Demographics</div>

      {/* Top Row */}
      <div className="grid grid-cols-2 gap-6 gap-y-8 mt-8">
        <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
          <div className="body2 ts5-text mb-4">FOLLOWERS: BY CITIES</div>
          {/* Placeholder for Age Distribution content */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>
        <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
          <div className="body2 ts5-text mb-4">FOLLOWERS: BY AGE</div>
          {/* Placeholder for Gender Distribution content */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <AgeHistogram data={instagramData?.insights.followersAge} />
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-3 gap-6 mt-8 pb-8">
        <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
          <div className="body2 ts5-text mb-4">FOLLOWERS: BY GENDER</div>
          {/* Placeholder for Location content */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <GenderPieChart data={instagramData?.insights.followersGender} />
          </div>
        </div>
        <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
          <div className="body2 ts5-text mb-4">FOLLOWERS: BY COCK SIZE</div>
          {/* Placeholder for Interests content */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>
        <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
          <div className="body2 ts5-text mb-4">FOLLOWERS: BY GAYNESS</div>
          {/* Placeholder for Language content */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demographic;
