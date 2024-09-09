"use client";

import React, { useEffect, useState } from "react";
import Main from "../_components/main/Main";
import Packages from "../_components/packages/Packages";
import Portfolio from "../_components/portfolio/Portfolio";
import UnsavedModal from "@/components/modals/UnsavedModal";

import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { instagramDataInfo } from "@/redux/slices/instagramData-slice";
import { creatorPackagesInfo } from "@/redux/slices/creatorPackages-slice";
import { creatorContentInfo } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getCreatorByUsername } from "@/actions/creatorApi";
import { getInstagramDataById } from "@/actions/InstagramApi";

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

      if (instagramData.data) {
        const followersGenderMap: { [gender: string]: number } = {};
        const followersAgeMap: { [age: string]: number } = {};
        const followersTopCitiesMap: { [city: string]: number } = {};

        // Map followersGender into an object
        instagramData.data.insights.followersGender.forEach(
          (item: { dimension_values: string[]; value: number }) => {
            const gender = item.dimension_values[0];
            const value = item.value;
            followersGenderMap[gender] = value;
          },
        );

        // Map followersAge into an object
        instagramData.data.insights.followersAge.forEach(
          (item: { dimension_values: string[]; value: number }) => {
            const age = item.dimension_values[0];
            const value = item.value;
            followersAgeMap[age] = value;
          },
        );

        // Map followersAge into an object
        instagramData.data.insights.followersTopCities.forEach(
          (item: { dimension_values: string[]; value: number }) => {
            const city = item.dimension_values[0];
            const value = item.value;
            followersTopCitiesMap[city] = value;
          },
        );

        // Dispatching creator instagram data to redux store
        dispatch(
          instagramDataInfo({
            _id: instagramData.data._id,
            creatorId: instagramData.data.creatorID,
            pageId: instagramData.data.pageID,
            businessId: instagramData.data.businessID,
            longLivedAccessToken: instagramData.data.longLivedAccessToken,
            username: instagramData.data.userName,
            profilePictureURL: instagramData.data.profilePicURL,
            // followersCount: instagramData.data.followers_count,
            // followersTopCities: followersTopCitiesMap,
            // followersAge: followersAgeMap,
            // followersGender: followersGenderMap,
            // monthlyImpressions:
            //   instagramData.data.insights.monthylyImpressionsAndReach
            //     .impressions[0].value,
            // monthlyReach:
            //   instagramData.data.insights.monthylyImpressionsAndReach.reach[0]
            //     .value,

            followersCount: instagramData.data.followers_count,
            followersTopCities: followersTopCitiesMap,
            followersAge: followersAgeMap,
            followersGender: followersGenderMap,
            monthlyImpressions:
              instagramData.data.insights.monthylyImpressionsAndReach
                .impressions[0].value,
            monthlyReach:
              instagramData.data.insights.monthylyImpressionsAndReach.reach[0]
                .value,
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
