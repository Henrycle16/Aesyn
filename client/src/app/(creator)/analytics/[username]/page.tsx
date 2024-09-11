"use client";

import { useGetCreatorByUsernameQuery } from "@/services/creatorApi";
import Instagram from "@/components/svgs/Instagram";
import Tiktok from "@/components/svgs/Tiktok";
import { useEffect, useState } from "react";
import Overview from "../_components/Overview";
import Demographic from "../_components/Demographic";
import RecentPost from "../_components/RecentPost";
import AnalyticsProfileCard from "../_components/AnalyticsProfileCard";
import { getInstagramDataById } from "@/actions/InstagramApi";
import { useAppSelector } from "@/redux/store";
import GetNewInstagramDataBtn from "@/components/buttons/GetNewInstagramData";

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
  const [instagramData, setInstagramData] = useState(null);

  //Remove
  const bussinessId = useAppSelector(
    (state) => state.instagramDataReducer.value.businessId,
  );
  const longLived = useAppSelector(
    (state) => state.instagramDataReducer.value.longLivedAccessToken,
  );

  const creatorId = useAppSelector(
    (state) => state.instagramDataReducer.value.creatorId,
  );

  const instaStore = useAppSelector(
    (state) => state.instagramDataReducerV2.value
  );

  console.log("InstaStore: ", instaStore)

  console.log("Raw Insta Data: ", instagramData)

  const initials = profileData
    ? getInitials(profileData.user.firstName, profileData.user.lastName)
    : "";

  useEffect(() => {
    const fetchInstagramData = async () => {
      if (profileData) {
        const instagramDataResponse = await getInstagramDataById(
          profileData._id,
        );
        setInstagramData(instagramDataResponse.data);
      }
    };

    fetchInstagramData();
  }, [profileData]);

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
      }`}
    >
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
        <AnalyticsProfileCard
          profileData={profileData}
          initials={initials}
          username={params.username}
        />
      </section>

      {/* Tab Section */}
      {/* In the future this will dynamically about to load data from different social Medias. */}
      <section className="mt-4">
        <div className="flex gap-x-4">
          <SocialTiles icon={<Instagram />} text="Instagram" name="instagram" />
          <SocialTiles icon={<Tiktok />} text="TikTok" name="tiktok" />
          <GetNewInstagramDataBtn
            bussinessId={bussinessId}
            longLive={longLived}
            creatorId={creatorId}
          />
        </div>
      </section>

      {/* Main Section */}
      <section className="mt-4 mb-10 flex flex-col gap-10 w-[77.5rem]">
        {/* Overview Section */}
        <Overview instagramData={instaStore} />
        {/* Demographic Section */}
        <Demographic />
        {/* Recent Post */}
        <RecentPost />
      </section>
    </div>
  );
}
