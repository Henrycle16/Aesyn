"use client";

import { useAppSelector } from "@/redux/store";
import Avatar from "@mui/material/Avatar";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

type Params = {
  username: string;
};

export default function Page({ params }: { params: Params }) {
  const avatarUrl = "/static/images/avatar/1.jpg";

  const { ...profileData } = useAppSelector(
    (state) => state.profileDataReducer.value
  );

  return (
    <div className="py-10 w-[77.5rem] mx-auto">
      {/* Top Profile Card */}
      <section className="h-[12.75rem] py-5 px-10 border border-gray-300 rounded-badge flex">
        <Avatar
          alt="Avatar"
          src={profileData.avatar ? profileData.avatar : avatarUrl}
          sx={{ width: 150, height: 150 }}
          className="ml-8 self-center"
        />
        {/* name, username, location Container */}
        <div className="ml-10 mt-3">
          {/* Name */}
          <h1 className="text-2xl font-semibold text-[#184465]">
            {profileData.firstName} {profileData.lastName}
            <span className="ml-2">
              <VerifiedUserOutlinedIcon
                sx={{ color: "#3798E3", fontSize: 22 }}
                className="mb-1.5"
              />
            </span>
          </h1>
          {/* Username */}
          <p className="text-sm text-[#061119] mt-1">@{profileData.username}</p>
          {/* Location */}
          <div className="flex gap-1 items-center mt-2.5 ml-[-0.3rem]">
            <LocationOnOutlinedIcon sx={{ color: "#6D6D6D" }} />
            <p className="text-sm text-[#061119]">
              {profileData.city}, {profileData.state}
            </p>
          </div>
        </div>
      </section>
      {/* Analytics Section */}
      <section className="mt-8">Analytics Section</section>
    </div>
  );
}
