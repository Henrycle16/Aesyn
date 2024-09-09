import React from "react";
import {
  getLastMonthData,
  getFollowerDemographics_GenderFormatted,
  getBusinessId,
} from "@/../../../server/src/services/instagramGraphAPI";
import { instagramUserCheck } from "@/../../../server/src/lib/instagram/instagramCheck";

import { getInsights } from "@/../../../server/src/lib/instagram/instagramCheck";

import mongoose from "mongoose";
import InstagramDB from "@/../../server/src/models/InstagramData";

const getNewInsights = async (businessID: string, accessToken: string) => {
  try {
    const genderDemographics = await getFollowerDemographics_GenderFormatted(
      businessID,
      accessToken,
    );
    const dailyMetrics = await getLastMonthData(businessID, accessToken);

    return {
      genderDemographics,
      dailyMetrics,
    };
  } catch (error) {
    console.log(error);
  }
};

async function updateInsights(
  creatorId: number,
  businessId: string,
  newInsights: any,
) {
  try {
    const updatedUser = await InstagramDB.findOneAndUpdate(
      { creatorID: creatorId },
      { $set: { insights: newInsights } },
      { new: true, upsert: false },
    );

    if (updatedUser) {
      console.log("User's insights updated: ", updatedUser);
    } else {
      console.log("User not found with");
    }
  } catch (error) {
    console.log("Error updating: ", error);
  }
}

const handleGetNewData = (creatorID, businessID, longLive) => {
  const newInsights = getNewInsights(businessID, longLive);
  updateInsights(creatorID, businessID, newInsights);
};

const GetNewInstagramDataBtn = ({ bussinessId, longLive, creatorId }) => {
  console.log("This is the db", InstagramDB);
  return (
    <button
      type="button"
      onClick={() => {
        // console.log("bussinessId", bussinessId);
        // console.log("longLive", longLive);
        // let test = getLast30DaysMetrics(bussinessId, longLive);
        let daily = getLastMonthData(bussinessId, longLive);
        let gender = getFollowerDemographics_GenderFormatted(
          bussinessId,
          longLive,
        );
        // getInsights(bussinessId);
        // instagramUserCheck(longLive, creatorId);
        // handleGetNewData(creatorId, bussinessId, longLive);
        console.log("Daily Metric", daily)
        console.log("gender", gender)
      }}
    >
      Get More Data
    </button>
  );
};

export default GetNewInstagramDataBtn;
