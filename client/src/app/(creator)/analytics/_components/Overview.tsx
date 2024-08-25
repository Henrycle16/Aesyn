import React, { useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

type ImpressionsAndReach = {
  value: number;
  end_time: string;
};

type InstagramData = {
  followers_count: number;
  // This might be wrong with how I am parsing through the object
  insights: {
    impressions: ImpressionsAndReach[];
    reach: ImpressionsAndReach[];
  };
};

const Overview = ({
  instagramData,
}: {
  instagramData: InstagramData | null;
}) => {
  console.log("Instagram Data:", instagramData); // Log Instagram Data

  return (
    <div className="border border-gray-300 rounded-badge min-h-[35.125rem] px-10 pt-10 pb-4">
      <div className="flex justify-between">
        <div className="heading1">Overview</div>
        <div className="relative flex items-center body2 ts7-text">
          <CalendarTodayIcon
            sx={{ color: "#6D6D6D", position: "absolute", left: "10px" }}
          />
          <select
            defaultValue="this-month"
            className="border border-black rounded-md p-2 pl-10 gap-2 body2 ts7-text">
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
      </div>
      {/* First Row */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="border border-black rounded p-4 heading3 ts7-text flex flex-col items-start gap-2">
          <div className="flex items-center">
            <PeopleAltOutlinedIcon className="mr-4" />
            Followers
          </div>
          <div className="text-[#3798E3]">
            {instagramData ? instagramData.followers_count : "Loading..."}
          </div>
        </div>

        {/* All the following divs are placeholders for the actual data that will be displayed in the future. */}
        <div className="border border-black rounded p-4 heading3 ts7-text flex flex-col items-start gap-2">
          <div className="flex items-center">
            <VisibilityIcon className="mr-4" />
            View
          </div>
          <div className="text-[#3798E3]">111,111</div>
        </div>
        <div className="border border-black rounded p-4 heading3 ts7-text flex flex-col items-start gap-2">
          <div className="flex items-center">
            <ThumbUpAltOutlinedIcon className="mr-4" />
            Likes
          </div>
          <div className="text-[#3798E3]">111,111</div>
        </div>
        <div className="border border-black rounded p-4 heading3 ts7-text flex flex-col items-start gap-2">
          <div className="flex items-center">
            <CommentOutlinedIcon className="mr-4" />
            Comments
          </div>
          <div className="text-[#3798E3]">111,111</div>
        </div>

        {/* Graphs */}
        <div className="col-span-2 border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
          <div className="body2 ts5-text mb-4">REACH</div>
          {/* Placeholder for Gender Distribution content */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>
        <div className="col-span-2 border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
          <div className="body2 ts5-text mb-4">IMPRESSIONS</div>
          {/* Placeholder for Gender Distribution content */}
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
