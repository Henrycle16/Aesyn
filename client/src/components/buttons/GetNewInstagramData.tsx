import React from "react";
import { useAppSelector } from "@/redux/store";

const GetNewInstagramDataBtn = () => {
  const data = useAppSelector((state) => state.instagramDataReducerV2.value);
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
