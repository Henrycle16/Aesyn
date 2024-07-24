"use client";

import React from "react";
import Image from "next/image";

import { resetCurrentContent } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import ReactPlayer from "react-player/lazy";

const ViewPersonal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentContent = useAppSelector(
    (state) => state.creatorContentReducer.value.currentContent
  );

  const handleCloseModal = () => {
    dispatch(resetCurrentContent());
    (
      document.getElementById(`view_content_modal`) as HTMLDialogElement
    ).close();
  };

  return (
    <dialog id="view_content_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
          <div className="flex flex-col my-12">
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

export default ViewPersonal;
