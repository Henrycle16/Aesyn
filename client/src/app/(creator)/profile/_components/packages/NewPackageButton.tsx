"use client";

import AddIcon from '@mui/icons-material/Add';
import React, { useState } from "react";

import { resetCurrentPackage } from "@/redux/slices/creatorPackages-slice";
import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const NewPackageButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        dispatch(profileDataInfo({ previousModalId: "add_package_modal" }));
        dispatch(resetCurrentPackage());
        (document.getElementById('add_package_modal') as HTMLDialogElement).showModal()}
      }
      className=""
    >
      <AddIcon
        className={`cursor-pointer rounded-full border-2 ${isHovered ? "text-[#F5F5F5] border-[#3798E3] bg-[#3798E3]" : "text-[#3798E3] border-[#D7D7D7]"}`}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      />
    </button>
  );
};

export default NewPackageButton;
