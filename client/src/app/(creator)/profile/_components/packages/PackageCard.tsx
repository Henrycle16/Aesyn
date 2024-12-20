"use client";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Instagram from "@/components/svgs/Instagram";
import Facebook from "@/components/svgs/Facebook";
import Twitter from "@/components/svgs/X";
import TikTok from "@/components/svgs/Tiktok";
import Youtube from "@/components/svgs/Youtube";

import { creatorPackagesInfo } from "@/redux/slices/creatorPackages-slice";
import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

type Props = {
  _id?: string;
  socialMedia: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
};

const socialMediaIcons: { [key: string]: JSX.Element } = {
  Instagram: <Instagram />,
  Facebook: <Facebook />,
  Twitter: <Twitter />,
  TikTok: <TikTok />,
  Youtube: <Youtube />,
};

const PackageCard = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const socialMediaIcon = socialMediaIcons[props.socialMedia];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="border border-[#D7D7D7] p-4 rounded-2xl w-[17.438rem] h-[10.688rem] flex flex-col">
        {/* Top Section */}
        <div className="flex">
          {/* <Instagram /> */}
          {socialMediaIcon}
          {/* Text Container */}
          <div className="ml-5">
            <p className="font-medium">{props.socialMedia}</p>
            <p className="font-bold mt-4">{`${props.quantity} ${props.type}`}</p>
            <p className="mt-1 text-[#061119]">{props.description}</p>
          </div>
          <ModeEditOutlineOutlinedIcon
            sx={{ fontSize: 25 }}
            className={`border-2 rounded-full p-[.12rem] ml-auto cursor-pointer ${
              isHovered
                ? "text-white border-[#3798E3] bg-[#3798E3]"
                : "text-[#3798E3] border-[#D7D7D7] bg-white"
            }`}
            onClick={() => {
              dispatch(
                profileDataInfo({ previousModalId: "edit_package_modal" })
              );
              dispatch(creatorPackagesInfo({ currentPackage: props }));
              (
                document.getElementById(
                  `edit_package_modal`
                ) as HTMLDialogElement
              ).showModal();
            }}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          />
        </div>
        {/* Bottom Section */}
        <p className="self-end mt-auto text-xl font-normal">
          {"$" + props.price}
        </p>
      </div>
    </>
  );
};

export default PackageCard;
