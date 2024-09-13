"use client";

import React, { useEffect, useState } from "react";
import Main from "../_components/main/Main";
import Packages from "../_components/packages/Packages";
import Portfolio from "../_components/portfolio/Portfolio";
import UnsavedModal from "@/components/modals/UnsavedModal";

import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { instagramDataInfoV2 } from "@/redux/slices/instagramData-sliceV2";
import { creatorPackagesInfo } from "@/redux/slices/creatorPackages-slice";
import { creatorContentInfo } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getCreatorByUsername } from "@/actions/creatorApi";
import {
  getInstagramDataById,
  updateInstagramData,
} from "@/actions/InstagramApi";

type Params = {
  username: string;
};

export default function CreatorProfile({ params }: { params: Params }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getProfileInfo = async () => {
    try {
      // Getting creator profile data
      const response = await getCreatorByUsername(params.username);

      dispatch(
        profileDataInfo({
          userId: response.data.user._id,
          creatorId: response.data._id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          username: response.data.userName,
          email: response.data.user.email,
          gender: response.data.gender,
          city: response.data.location.city,
          state: response.data.location.state,
          country: response.data.location.country,
          bio: response.data.bio,
          preferences: response.data.preferences,
          interests: response.data.interests,
          avatar: response.data.avatar,
        }),
      );

      // Dispatching creator packages to redux store
      dispatch(
        creatorPackagesInfo({
          packages: response.data.packages,
        }),
      );

      // Dispatching creator portfolio content to redux store
      dispatch(
        creatorContentInfo({
          content: response.data.portfolio,
        }),
      );
      setIsDataLoaded(true);

      // Getting creator instagram data
      const instagramData = await getInstagramDataById(response.data._id);

      console.log(
        "instagram data from profiles page: getInstagramById",
        instagramData,
      );

      // If the user does exist with data get new data and dispatch
      if (instagramData.data) {
        const recentInstagramData = await updateInstagramData(
          instagramData.data.businessID,
        );

        dispatch(
          instagramDataInfoV2({
            _id: recentInstagramData.data._id,
            creatorId: recentInstagramData.data.creatorID,
            pageId: recentInstagramData.data.pageID,
            businessId: recentInstagramData.data.businessID,
            longLivedAccessToken: recentInstagramData.data.longLivedAccessToken,
            username: recentInstagramData.data.userName,
            profilePictureURL: recentInstagramData.data.profilePicURL,
            mediaCount: recentInstagramData.data.media.media_count,
            likeCount: recentInstagramData.data.media.total_like_count,
            followersCount: recentInstagramData.data.insights.followersCount,
            followersTopCities:
              recentInstagramData.data.insights.followersTopCities,
            followersAge: recentInstagramData.data.insights.followersAge,
            followersGender: recentInstagramData.data.insights.followersGender,
            dailyMetrics: recentInstagramData.data.insights.dailyMetrics,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  if (!isDataLoaded) {
    return <div>Loading...</div>; // Placeholder while data is loading
  }

  return (
    <div className="my-10 flex flex-col gap-10 w-[77.5rem]">
      {/* Main Section */}
      <Main />
      {/* Packages Section */}
      <Packages />
      {/* Portfolio Section */}
      <Portfolio />
      {/* Unsaved Modal */}
      <UnsavedModal />
    </div>
  );
}
