"use client";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import React, { useState } from "react";
import ImageCropper from "@/components/creator/profile/main/ImageCropper/ImageCropper";
import { uploadAvatar } from "@/actions/creators3/avatar";
import { useSession } from "next-auth/react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { useDispatch } from "react-redux";

const ProfileCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const avatarUrl = "/static/images/avatar/1.jpg";
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { avatar: avatarDisplay, ...profileData } = useAppSelector(
    (state) => state.profileDataReducer.value
  );

  const session = useSession();
  const userId = session.data?.user.id;

  // Function to handle avatar submission
  const onSubmit = async (imgSrc: string, imageName: string) => {
    // Fetching the image as a blob
    const blob = await fetch(imgSrc).then((res) => res.blob());
    const file = new File([blob], imageName, { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userId);

    try {
      // Attempting to upload the avatar
      const response = await uploadAvatar(userId, formData);
      console.log("Avatar uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading avatar", error);
    }
  };

  // Function to update the avatar state and close the modal
  const updateAvatar = (imgSrc: string, imageName: string) => {
    dispatch(
      profileDataInfo({
        avatar: imgSrc,
      })
    );
    setModalOpen(false);
    onSubmit(imgSrc, imageName);
  };

  // Function to open & close the modal
  const openModal = () => {
    setModalOpen(true);
    (document.getElementById("avatar_modal") as HTMLDialogElement).showModal();
  };

  const closeModal = () => {
    setModalOpen(false);
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
                    sx={{ fontSize: 25 }}
                    className={`border-2 rounded-full p-[.12rem] ml-auto cursor-pointer ${
                      isHovered
                        ? "text-white border-[#3798E3] bg-[#3798E3]"
                        : "text-[#3798E3] border-[#D7D7D7] bg-white"
                    }`}
                    onClick={openModal}
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  />
                }
              >
                <Avatar
                  alt="Avatar"
                  src={avatarDisplay ? avatarDisplay : avatarUrl}
                  sx={{ width: 150, height: 150 }}
                />
              </Badge>{" "}
            </div>
          </div>

          {/* Name, location and Verification button*/}
          <div className="flex flex-col justify-items-start flex-1 mb-12 pl-10">
            <div className="flex items-center">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold text-[#184465]">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-sm text-[#061119] flex-grow">
                  @{profileData.username}
                </p>
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
                {profileData.city}, {profileData.state}
              </span>
            </div>
          </div>

          {/* Public View Button */}
          <div className="flex flex-col ml-auto mb-24">
            {" "}
            <button className="border-solid border-2 border-[#3798E3] py-2 px-6 rounded-md flex items-center justify-center hover:bg-[#F5F5F5]">
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
        <div className="modal-box bg-white text-[#061119] min-w-[42rem] min-h-[32.1rem] pt-8 px-10 pb-6 flex flex-col">
          <div className="flex flex-col mr-auto">
            <h1 className="heading-text-color heading1">Profile</h1>
            <h2 className="py-2 gc-label-color body1">
              Upload and crop your photo to display on your profile
            </h2>
          </div>

          {/* Upload box */}
          <form method="dialog">
            <div className="pt-6">
              <ImageCropper updateAvatar={updateAvatar} />
            </div>
            <button
              onClick={closeModal}
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
