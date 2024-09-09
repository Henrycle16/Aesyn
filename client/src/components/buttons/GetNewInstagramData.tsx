import React from "react";
import { instagramUserCheck } from "@/../../../server/src/lib/instagram/instagramCheck";

import { getInsights } from "@/../../../server/src/lib/instagram/instagramCheck";
import { useAppSelector } from "@/redux/store";

const GetNewInstagramDataBtn = ({ bussinessId, longLive, creatorId }) => {
  const data = useAppSelector((state) => state.instagramDataReducer.value);
  return (
    <button
      type="button"
      onClick={() => {
        console.log("From redux: ", data);
      }}
    >
      Get More Data
    </button>
  );
};

export default GetNewInstagramDataBtn;
