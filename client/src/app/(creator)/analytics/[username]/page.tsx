"use client";

import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useGetCreatorByUsernameQuery } from "@/services/creatorApi";
import Instagram from "@/components/svgs/Instagram";
import Tiktok from "@/components/svgs/Tiktok";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useState } from "react";

type Params = {
  username: string;
};

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export default function CreatorAnalytics({ params }: { params: Params }) {
  const {
    data: profileData,
    error,
    isLoading,
  } = useGetCreatorByUsernameQuery(params.username);
  const [selectedButton, setSelectedButton] = useState("instagram");

  const initials = profileData
    ? getInitials(profileData.user.firstName, profileData.user.lastName)
    : "";

  const SocialTiles = ({
    icon,
    text,
    name,
  }: {
    icon: React.ReactNode;
    text: string;
    name: string;
  }) => (
    <button
      type="button"
      onClick={() => setSelectedButton(name)}
      className={`flex justify-center items-center border-2 rounded-lg h-[3.5rem] w-[11.281rem] ${
        selectedButton === name ? "border-[#3798E3]" : "border-gray-300"
      }`}>
      <div className="flex items-center text-[#184465] font-semibold space-x-4">
        <div>{icon}</div>
        <div>{text}</div>
      </div>
    </button>
  );

  return (
    <div className="py-10 w-[77.5rem] mx-auto">
      {/* Top Profile Card */}
      <section className="h-[12.75rem] py-5 px-10 border border-gray-300 rounded-badge flex">
        <Avatar
          alt="Avatar"
          src={profileData?.avatar ? profileData.avatar : ""}
          sx={{ width: 150, height: 150 }}
          className="ml-8 self-center">
          {!profileData?.avatar && initials}
        </Avatar>
        {/* name, username, location Container */}
        <div className="ml-10 mt-3">
          {/* Name */}
          <h1 className="text-2xl font-semibold text-[#184465]">
            {profileData?.user.firstName} {profileData?.user.lastName}
            <span className="ml-2">
              <VerifiedUserOutlinedIcon
                sx={{ color: "#3798E3", fontSize: 22 }}
                className="mb-1.5"
              />
            </span>
          </h1>
          {/* Username */}
          <p className="text-sm text-[#061119] mt-1">
            @{profileData?.userName}
          </p>
          {/* Location */}
          <div className="flex gap-1 items-center mt-2.5 ml-[-0.3rem]">
            <LocationOnOutlinedIcon sx={{ color: "#6D6D6D" }} />
            <p className="text-sm text-[#061119]">
              {profileData?.location.city}, {profileData?.location.state}
            </p>
          </div>
        </div>
        {/* See Profile View Button */}
        <div className="ml-auto mt-[1.375rem]">
          <Link
            href={`/profile/${params.username}`}
            className="border-2 ts1-border py-[10px] px-[25px] rounded-md text-[#3798E3] font-semibold hover:bg-[#F5F5F5]">
            See Profile View
          </Link>
        </div>
      </section>
      {/* Tab Section */}
      <section className="mt-4">
        <div className="flex gap-x-4">
          <SocialTiles icon={<Instagram />} text="Instagram" name="instagram" />
          <SocialTiles icon={<Tiktok />} text="TikTok" name="tiktok" />
        </div>
      </section>

      {/* Main Section */}
      <section className="mt-4 mb-10 flex flex-col gap-10 w-[77.5rem]">
        {/* Overview Section */}
        <div className="border border-gray-300 rounded-badge min-h-[35.125rem] px-10 pt-10 pb-4">
          <div className="flex justify-between">
            <div className="heading1">Overview</div>
            <div className="relative flex items-center body2 ts7-text">
              <CalendarTodayIcon
                sx={{ color: "#6D6D6D", position: "absolute", left: "10px" }}
              />
              <select
                defaultValue="this-week"
                className="border border-black rounded-md p-2 pl-10 gap-2 body2 ts7-text">
                <option value="this-week">This Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-8">
            {/* First Row */}
            <div className="border border-black rounded p-4 heading3 ts7-text flex flex-col items-start gap-2">
              <div className="flex items-center">
                <PeopleAltOutlinedIcon className="mr-4" />
                Followers
              </div>
              <div className="text-[#3798E3]">1,234</div>
            </div>
            <div className="border border-black rounded p-4 heading3 ts7-text flex flex-col items-start gap-2">
              <div className="flex items-center">
                <VisibilityIcon className="mr-4" />
                View
              </div>
              <div className="text-[#3798E3]">5,678</div>
            </div>
            <div className="border border-black rounded p-4 heading3 ts7-text flex flex-col items-start gap-2">
              <div className="flex items-center">
                <ThumbUpAltOutlinedIcon className="mr-4" />
                Likes
              </div>
              <div className="text-[#3798E3]">91,011</div>
            </div>
            <div className="border border-black rounded p-4 heading3 ts7-text flex flex-col items-start gap-2">
              <div className="flex items-center">
                <CommentOutlinedIcon className="mr-4" />
                Comments
              </div>
              <div className="text-[#3798E3]">1,213</div>
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

        {/* Demographic Section */}
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
                Chart Placeholder
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[17.625rem]">
              <div className="body2 ts5-text mb-4">FOLLOWERS: BY GENDER</div>
              {/* Placeholder for Location content */}
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                Map Placeholder
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

        {/* Recent Post */}
        <div className="border border-gray-300 rounded-badge min-h-[35.125rem] px-10 pt-10 pb-4">
          <div className="heading1 mb-6">Recent Posts </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left text-[#061119] font-semibold">
                  <th className="pb-4">Post Image</th>
                  <th className="pb-4">Post Caption</th>
                  <th className="pb-4">Date Posted</th>
                  <th className="pb-4">Reach</th>
                  <th className="pb-4">Likes</th>
                  <th className="pb-4">Shares</th>
                  <th className="pb-4">Comments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {/* Repeat this block for each post */}
                <tr className="border-b">
                  <td className="py-4">
                    <div className="w-24 h-24 bg-gray-300" />
                  </td>
                  <td className="py-4 max-w-xs">
                    <p className="line-clamp-2 overflow-hidden">
                      My name is Henry Le and I am a software engineer at General Motors
                    </p>
                  </td>
                  <td className="py-4">Jul 2, 2024</td>
                  <td className="py-4">2.3k</td>
                  <td className="py-4">1.6k</td>
                  <td className="py-4">32.6k</td>
                  <td className="py-4">45k</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">
                    <div className="w-24 h-24 bg-gray-300" />
                  </td>
                  <td className="py-4 max-w-xs">
                    <p className="line-clamp-2 overflow-hidden">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua...
                    </p>
                  </td>
                  <td className="py-4">Jul 2, 2024</td>
                  <td className="py-4">2.3k</td>
                  <td className="py-4">1.6k</td>
                  <td className="py-4">32.6k</td>
                  <td className="py-4">45k</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">
                    <div className="w-24 h-24 bg-gray-300" />
                  </td>
                  <td className="py-4 max-w-xs">
                    <p className="line-clamp-2 overflow-hidden">
                      BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAHBLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH BLAH
                    </p>
                  </td>
                  <td className="py-4">Jul 2, 2024</td>
                  <td className="py-4">2.3k</td>
                  <td className="py-4">1.6k</td>
                  <td className="py-4">32.6k</td>
                  <td className="py-4">45k</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
