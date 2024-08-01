"use client";

import React, { useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Youtube from "@/components/ui/svgs/Youtube";
import Instagram from "@/components/ui/svgs/Instagram";
import X from "@/components/ui/svgs/X";
import Tiktok from "@/components/ui/svgs/Tiktok";
import Facebook from "@/components/ui/svgs/Facebook";
import SocialMediaCard from "./SocialMediaCard";
import Twitch from "@/components/ui/svgs/Twitch";

const socialMediaData = [
  {
    id: 0,
    socialMedia: "Instagram",
    username: "Jane Doe",
    followers: "150k",
    avgPosts: 150,
    component: <Instagram />,
  },
  {
    id: 1,
    socialMedia: "Tiktok",
    username: "Henrayleeee",
    followers: "50M",
    avgPosts: 1,
    component: <Tiktok />,
  },
  {
    id: 2,
    socialMedia: "Youtube",
    username: "Henrie",
    followers: "100",
    avgPosts: 200,
    component: <Youtube />,
  },
];

const SocialMedia = () => {
  const [isModalClosed, setIsModalClosed] = useState(false);

  // !Currently I have type button just so it doesn't close the modal, will need to change later */
  const SocialTiles = ({
    icon,
    text,
  }: {
    icon: React.ReactNode;
    text: string;
  }) => (
    <button type="button" className="border border-gray-300 rounded-lg p-4">
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

  return (
    <>
      <div className="flex-1">
        <div className="flex justify-start">
          <h1 className="text-2xl font-semibold text-[#184465]">
            Social Media{" "}
          </h1>
          <ModeEditOutlineOutlinedIcon
            sx={{ color: "#3798E3", fontSize: 25 }}
            className="border-2 border-[#3798E3] rounded-full p-[.12rem] cursor-pointer ml-3 mt-1"
            onClick={() =>
              (
                document.getElementById(`social_modal`) as HTMLDialogElement
              ).showModal()
            }
          />
        </div>
        <div className="flex flex-col">
          {isModalClosed ? (
            <div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-9">
              {socialMediaData.map((socialMediaData) => (
                <SocialMediaCard
                  key={socialMediaData.id}
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
        <div className="modal-box bg-white text-[#061119] min-w-[58.75rem] pt-8 px-10 pb-6">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Social Media
          </h1>
          <h2 className="py-2 gc-label-color body1">
            Link your social media pages to display on your profile.
          </h2>
          <form method="dialog">
            <div className="grid grid-cols-3 gap-5 mt-6">
              {/* Social Media Tiles */}
              <SocialTiles icon={<Youtube />} text="Youtube" />
              <SocialTiles icon={<Instagram />} text="Instagram" />
              <SocialTiles icon={<X />} text="Twitter/X" />
              <SocialTiles icon={<Tiktok />} text="Tiktok" />
              <SocialTiles icon={<Facebook />} text="Facebook" />
              <SocialTiles icon={<Twitch />} text="Twitch" />
            </div>

            <div className="flex justify-end mt-10">
              {/* if there is a button, it will close the modal */}
              <button
                onClick={closeModal}
                // type="submit"
                className="bg-[#3798E3] text-white ml-auto py-3 px-6 capitalize font-bold rounded-lg hover:bg-[#2C7AB6]"
              >
                Save
              </button>
            </div>
            <button className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default SocialMedia;
