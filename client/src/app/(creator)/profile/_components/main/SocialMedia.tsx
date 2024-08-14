"use client";

import React, { useState, useEffect } from 'react';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Youtube from "@/components/svgs/Youtube";
import Instagram from "@/components/svgs/Instagram";
import X from "@/components/svgs/X";
import Tiktok from "@/components/svgs/Tiktok";
import Facebook from "@/components/svgs/Facebook";
import SocialMediaCard from "./SocialMediaCard";
import Twitch from "@/components/svgs/Twitch";

import InstagramTile from "@/components/buttons/InstagramTile";
import { useAppSelector } from "@/redux/store";

const testData = [
  {
    _id: "1",
    socialMedia: "Tiktok",
    username: "Henrayleeee",
    followersCount: 50,
    profilePictureURL: "",
    component: <Tiktok />,
  },
  {
    _id: "2",
    socialMedia: "Youtube",
    username: "Henrie",
    followersCount: 100,
    profilePictureURL: "",
    component: <Youtube />,
  },
];

type SocialMediaData = {
  _id: string;
  username: string;
  followersCount: number;
  profilePictureURL: string;
  socialMedia: string;
  component: React.JSX.Element;
};

const SocialMedia = () => {
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [socialMediaData, setSocialMediaData] = useState<SocialMediaData[]>([]);;

  const { _id, username, followersCount, profilePictureURL} = useAppSelector(
    (state) => state.instagramDataReducer.value
  );

  // This useEffect is temporary to display testData
  useEffect(() => {
    setSocialMediaData(testData);
  }, []);

  useEffect(() => {
    const instagramData = { 
      _id, 
      username, 
      followersCount, 
      profilePictureURL, 
      socialMedia: "Instagram", 
      component: <Instagram /> 
    };

    setSocialMediaData((prevData) => [
      ...prevData.filter(data => data.socialMedia !== "Instagram"),
      instagramData
    ]);
  }, [_id, username, followersCount, profilePictureURL]);

  // !Currently I have type button just so it doesn't close the modal, will need to change later */
  const SocialTiles = ({
    icon,
    text,
  }: {
    icon: React.ReactNode;
    text: string;
  }) => (
    <button type="button" className="border border-gray-300 rounded-[15px] py-4 px-7">
      <div className="flex items-center text-[#184465] font-semibold space-x-4">
        <div>{icon}</div>
        <div>{text}</div>
      </div>
    </button>
  );

  const closeModal = () => {
    setIsModalClosed(true);
    (document.getElementById(`social_modal`) as HTMLDialogElement).close();
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="flex-1">
        <div className="flex justify-start">
          <h1 className="text-2xl font-semibold text-[#184465]">
            Social Media{" "}
          </h1>
          <ModeEditOutlineOutlinedIcon
            sx={{ fontSize: 25 }}
            className={`border-2 rounded-full p-[.12rem] cursor-pointer ml-3 mt-1 ${
              isHovered
                ? "text-white border-[#3798E3] bg-[#3798E3]"
                : "text-[#3798E3] border-[#D7D7D7] bg-white"
            }`}
            onClick={() =>
              (
                document.getElementById(`social_modal`) as HTMLDialogElement
              ).showModal()
            }
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          />
        </div>
        <div className="flex flex-col">
          {socialMediaData.length > 0 ? (
            <div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-9">
              {socialMediaData.map((socialMediaData) => (
                <SocialMediaCard
                  key={socialMediaData._id}
                  {...socialMediaData}
                />
              ))}
            </div>
          ) : (
            <p className="text-[#4A4A4A] text-md mt-4 mb-10 flex-grow">
              Link your social media accounts to display here.
            </p>
          )}
        </div>
      </div>

      <dialog id="social_modal" className="modal">
        <div className="modal-box bg-white text-[#061119] min-w-[58.875rem] min-h-[23.125rem] pr-8 pt-10 pl-14">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Social Media
          </h1>
          <h2 className="py-2 gc-label-color body1">
            Link your social media pages to display on your profile.
          </h2>
          <form method="dialog">
            <div className="grid grid-cols-[repeat(3,_minmax(0,_16.188rem))] gap-7 mt-4">
              {/* Social Media Tiles */}
              <SocialTiles icon={<Youtube />} text="Youtube" />
              {/* <SocialTiles icon={<Instagram />} text="Instagram" /> */}
              <InstagramTile />
              <SocialTiles icon={<X />} text="Twitter/X" />
              <SocialTiles icon={<Tiktok />} text="Tiktok" />
              <SocialTiles icon={<Facebook />} text="Facebook" />
              <SocialTiles icon={<Twitch />} text="Twitch" />
            </div>

            <div className="flex justify-end mt-7">
              {/* if there is a button, it will close the modal */}
              <button
                onClick={closeModal}
                // type="submit"
                className="bg-[#3798E3] text-white ml-auto py-[10px] px-[25px] text-sm font-bold rounded-lg hover:bg-[#2C7AB6]"
              >
                Save
              </button>
            </div>
            <button className="btn btn-lg btn-circle btn-ghost outline-none absolute right-3 top-2 text-lg">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default SocialMedia;
