import React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

interface AnalyticsProfileCardProps {
  profileData: {
    avatar?: string;
    user: {
      firstName: string;
      lastName: string;
    };
    userName: string;
    location: {
      city: string;
      state: string;
    };
  } | null;
  initials: string;
  username: string;
}

const TopProfileCard: React.FC<AnalyticsProfileCardProps> = ({
  profileData,
  initials,
  username,
}) => {
  return (
    <>
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
        <p className="text-sm text-[#061119] mt-1">@{profileData?.userName}</p>
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
          href={`/profile/${username}`}
          className="border-2 ts1-border py-[10px] px-[25px] rounded-md text-[#3798E3] font-semibold hover:bg-[#F5F5F5]">
          See Profile View
        </Link>
      </div>
    </>
  );
};

export default TopProfileCard;
