"use client";

import React, { useEffect, useState } from "react";
import Main from "../_components/main/Main";
import Packages from "../_components/packages/Packages";
import Portfolio from "../_components/portfolio/Portfolio";
import UnsavedModal from "@/components/modals/UnsavedModal";

import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { creatorPackagesInfo } from "@/redux/slices/creatorPackages-slice";
import { creatorContentInfo } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getCreatorByUsername } from "@/actions/creatorApi";

type Params = {
  username: string;
};

export default function CreatorProfile({ params }: { params: Params }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const getProfileInfo = async () => {
    try {
      const response = await getCreatorByUsername(params.username);

      dispatch(
        profileDataInfo({
          userId: response.data._id,
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
        })
      );

      dispatch(
        creatorPackagesInfo({
          packages: response.data.packages,
        })
      );

      dispatch(
        creatorContentInfo({
          content: response.data.portfolio,
        })
      );
      setIsDataLoaded(true);
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
