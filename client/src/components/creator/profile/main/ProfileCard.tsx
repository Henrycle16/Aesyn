"use client";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import FileUpload from "../portfolio/FileUpload";
import React, { useState } from "react";
import Image from "next/legacy/image";

interface Avatar {
  uri: string;
  name: string;
}

const ProfileCard = () => {
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileUpload = ({ uri, name }: Avatar) => {
    setAvatar({ uri, name });
  };

  const openModal = () => {
    (document.getElementById("avatar_modal") as HTMLDialogElement).showModal();
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (document.getElementById(`avatar_modal`) as HTMLDialogElement).close();
  };

  return (
    <>
      <div className="border-b border-gray-300 col-span-2 py-5 px-10">
        <div className="flex items-center h-full">
          {/* Avatar */}
          <div className="ml-8">
            <div>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <ModeEditOutlineOutlinedIcon
                    sx={{ color: "#3798E3", fontSize: 25 }}
                    className="border-2 border-[#3798E3] rounded-full p-[.12rem] ml-auto cursor-pointer bg-white"
                    onClick={openModal}
                  />
                }
              >
                <Avatar sx={{ width: 150, height: 150 }} />
              </Badge>{" "}
            </div>
          </div>

          {/* Name, location and Verification button*/}
          <div className="flex flex-col justify-items-start flex-1 mb-12 pl-10">
            <div className="flex items-center">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold text-[#184465]">
                  Jane Doe{" "}
                </h1>
                <span className="text-sm text-[#061119] flex-grow">
                  @blahblah
                </span>
              </div>

              <div className="flex flex-col mb-2.5 pl-6">
                <button className="border-dashed border-2 border-[#3798E3] py-2 px-5 rounded-md flex items-center justify-center">
                  <span className="text-[#3798E3] font-semibold">
                    {" "}
                    Verify Now
                  </span>
                  <VerifiedUserOutlinedIcon
                    sx={{ color: "#3798E3", fontSize: 22 }}
                    className="ml-3"
                  />
                </button>{" "}
              </div>
            </div>

            <div className="flex items-center mt-2.5 gap-1 ml-[-0.3rem]">
              <LocationOnOutlinedIcon sx={{ color: "#6D6D6D" }} />
              <span className="text-sm text-[#061119] flex-grow">
                Narnia, Houston
              </span>
            </div>
          </div>

          {/* Public View Button */}
          <div className="flex flex-col ml-auto mb-24">
            {" "}
            <button className="border-solid border-2 border-[#3798E3] py-2 px-6 rounded-md flex items-center justify-center">
              <span className="text-[#3798E3] font-semibold">
                {" "}
                See Public View
              </span>
            </button>{" "}
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="avatar_modal" className="modal">
        <div className="modal-box bg-white text-[#061119] min-w-[40rem] min-h-[31.1rem] pt-8 px-10 pb-6 flex flex-col">
          <div className="flex flex-col mr-auto">
            <h1 className="heading-text-color heading1">Profile</h1>
            <h2 className="py-2 gc-label-color body1">
              Upload and crop your photo to display on your profile
            </h2>
          </div>

          {/* Upload box */}
          <form method="dialog" className="flex flex-col flex-1">
            <div className="flex flex-1">
              <div className="pt-6 px-24 w-full">
                {avatar && avatar.uri ? (
                  <div className="relative w-[100%] h-[264px] bg-gray-50 ">
                    <Image
                      src={avatar.uri}
                      alt="image"
                      width={368}
                      height={264}
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                ) : (
                  <FileUpload
                    paddingY="py-28"
                    onFileUpload={handleFileUpload}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-[#3798E3] text-white font-bold py-3 px-6 capitalize rounded-md hover:bg-[#2C7AB6]"
              >
                Save
              </button>
            </div>
            <button
              onClick={() => {
                (
                  document.getElementById(`avatar_modal`) as HTMLDialogElement
                ).close();
              }}
              type="button"
              className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg"
            >
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ProfileCard;
