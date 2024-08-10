"use client";

import React from "react";
import Image from "next/image";

import Youtube from "@/components/svgs/Youtube";
import Instagram from "@/components/svgs/Instagram";
import Facebook from "@/components/svgs/Facebook";
import X from "@/components/svgs/X";

import { resetCurrentContent } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import ReactPlayer from "react-player/lazy";

const ViewCampaign = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentContent = useAppSelector(
    (state) => state.creatorContentReducer.value.currentContent
  );

  const renderSocialMediaContent = (socialMedia: string) => {
    switch (socialMedia) {
      case "instagram":
        return <Instagram />;
      case "facebook":
        return <Facebook />;
      case "twitter":
        return <X />;
      case "youtube":
        return <Youtube />;
      default:
        return null;
    }
  };

  const handleCloseModal = () => {
    dispatch(resetCurrentContent());
    (
      document.getElementById(`view_campaign_modal`) as HTMLDialogElement
    ).close();
  };

  return (
    <dialog id="view_campaign_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            <div className="flex gap-5">
              {renderSocialMediaContent(currentContent.socialMedia)}{" "}
              <h1 className="text-[#184465] font-semibold text-2xl">
                {currentContent.campaignTitle}
              </h1>
            </div>
            <p className="pb-4 pt-2 text-sm mt-5">
              {currentContent.description}
            </p>
          </div>
          <div className="flex flex-col mt-6">
            {currentContent.uri ? (
              <>
                {currentContent.mediaType === "video" ? (
                  <div className="flex justify-center items-center">
                    <ReactPlayer
                      url={currentContent.uri}
                      light={true}
                      width={854}
                      height={470}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <Image
                      src={currentContent.uri}
                      alt="content"
                      width={500}
                      height={450}
                      style={{
                        maxHeight: "450px",
                        objectFit: "contain",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="">Image not available</div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            handleCloseModal();
          }}
          type="button"
          className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg"
        >
          ✕
        </button>
      </div>
    </dialog>
  );
};

export default ViewCampaign;
