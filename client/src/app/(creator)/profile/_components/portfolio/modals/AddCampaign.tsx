"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ChangeButton from "../ChangeButton";
import ContentButton from "../ContentButton";

import {
  creatorContentInfo,
  addContent,
  resetCurrentContent,
} from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import ReactPlayer from "react-player/lazy";

import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "../PortfolioSetCanvas";

import { uploadImage, uploadVideo } from "@/actions/creators3/portfolio";
import { useSession } from "next-auth/react";

const ASPECT_RATIO = 5 / 4;
const MIN_DIMENSION = 150;

const AddCampaign = () => {
  const session = useSession();
  const userId = session.data?.user.id;

  const [charCount, setCharCount] = useState(100);
  const dispatch = useDispatch<AppDispatch>();
  const currentContent = useAppSelector(
    (state) => state.creatorContentReducer.value.currentContent
  );

  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [resetContentButton, setResetContentButton] = useState(false);

  useEffect(() => {
    setCharCount(100 - currentContent.description?.length);
  }, [currentContent.description]);

  const onImageLoad = (e: React.ChangeEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleResetComplete = () => {
    setResetContentButton(false);
  };

  const handleCloseModal = () => {
    dispatch(resetCurrentContent());
    setResetContentButton(true);
    (
      document.getElementById(`add_campaign_modal`) as HTMLDialogElement
    ).close();
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentContent.mediaType === "video") {
      try {
        const response = await uploadVideo(userId, currentContent);

        const portfolio = response.data.data.portfolio;
        const newestPortfolioContent = portfolio[portfolio.length - 1];
        const newestPortfolioId = newestPortfolioContent._id;

        dispatch(
          addContent({
            ...currentContent,
            _id: newestPortfolioId,
          })
        );

      } catch (error) {
        console.log(error);
      }
    } else {
      let thumbnailUri = "";

      if (imgRef.current) {
        setCanvasPreview(
          previewCanvasRef.current as HTMLCanvasElement,
          imgRef.current as HTMLImageElement,
          convertToPixelCrop(crop!, imgRef.current.width, imgRef.current.height)
        );

        thumbnailUri = previewCanvasRef.current!.toDataURL("image/jpeg");
      }

      const blob = await fetch(currentContent.uri).then((res) => res.blob());
      const file = new File([blob], currentContent.name, {
        type: "image/jpeg",
      });

      const thumbnailBlob = thumbnailUri
        ? await fetch(thumbnailUri).then((res) => res.blob())
        : new Blob();
      const thumbnailFile = new File([thumbnailBlob], currentContent.name, {
        type: "image/jpeg",
      });

      const appendFormData = (
        formData: FormData,
        data: Record<string, any>
      ) => {
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
      };

      const data = {
        contentType: currentContent.contentType,
        uri: file,
        userId: userId,
        thumbnailUri: thumbnailFile,
        mediaType: currentContent.mediaType,
        socialMedia: currentContent.socialMedia,
        name: currentContent.name,
        campaignTitle: currentContent.campaignTitle,
        description: currentContent.description,
      };

      const formData = new FormData();
      appendFormData(formData, data);

      try {
        const response = await uploadImage(userId, formData);

        const portfolio = response.data.data.portfolio;
        const newestPortfolioContent = portfolio[portfolio.length - 1];
        const newestPortfolioId = newestPortfolioContent._id;

        dispatch(
          addContent({
            ...currentContent,
            _id: newestPortfolioId,
            thumbnailUri: thumbnailUri,
          })
        );
      } catch (error) {
        console.error(error);
      }
    }

    dispatch(resetCurrentContent());

    setResetContentButton(true);
    (
      document.getElementById(`add_campaign_modal`) as HTMLDialogElement
    ).close();
  };

  return (
    <dialog id="add_campaign_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[100rem] pt-10 pl-14 pr-10 pb-8">
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Add New Campaign Project
          </h1>
          <p className="pb-4 pt-2 text-sm">
            Display your past campaign work for brands to see. You can either
            paste a URl or upload your work.
          </p>
        </div>
        <form method="dialog" onSubmit={onFormSubmit}>
          <div className="grid grid-cols-2 gap-y-5 items-start grid-rows-1 gap-x-14">
            <div className="col-start-1 row-start-1">
              <div className="mb-4">
                <label
                  htmlFor="campaignTitle"
                  className="text-[#4A4A4A] block font-bold pr-5"
                >
                  Campaign Title
                </label>
                <input
                  id="campaignTitle"
                  name="campaignTitle"
                  maxLength={50}
                  onChange={(e) => {
                    dispatch(
                      creatorContentInfo({
                        currentContent: {
                          ...currentContent,
                          campaignTitle: e.target.value,
                        },
                      })
                    );
                  }}
                  className="w-full h-11 mt-1 px-2 pl-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm resize-none"
                  placeholder="Enter a brief but descriptive title"
                  value={currentContent.campaignTitle}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="social_media"
                  className="text-[#4A4A4A] block font-bold"
                >
                  *Social Media
                </label>
                <select
                  id="social_media"
                  name="social_media"
                  value={currentContent.socialMedia}
                  onChange={(e) =>
                    dispatch(
                      creatorContentInfo({
                        currentContent: {
                          ...currentContent,
                          socialMedia: e.target.value,
                        },
                      })
                    )
                  }
                  className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:border-[#3798E3] sm:text-sm"
                >
                  <option value="">[Select]</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                </select>
              </div>

              <div className="">
                <label
                  htmlFor="description"
                  className="text-[#4A4A4A] block font-bold pr-5"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={100}
                  onChange={(e) => {
                    setCharCount(100 - e.target.value.length);
                    dispatch(
                      creatorContentInfo({
                        currentContent: {
                          ...currentContent,
                          description: e.target.value,
                        },
                      })
                    );
                  }}
                  className="pt-3 w-full h-20 mt-1 px-3 pl-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm resize-none"
                  placeholder="Briefly describe your work on this campaign"
                  value={currentContent.description}
                />
                <p className="flex justify-end">{charCount} characters left</p>
              </div>
            </div>

            <div className="col-start-2 row-start-1">
              <div className="flex flex-col mt-6">
                {currentContent.uri ? (
                  <>
                    {currentContent.mediaType === "video" ? (
                      <div className="flex justify-center items-center my-1">
                        <ReactPlayer
                          url={currentContent.uri}
                          light={true}
                          width={854}
                          height={470}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center h-full my-1">
                          <ReactCrop
                            crop={crop}
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                            onChange={(pixelCrop, percentCrop) =>
                              setCrop(percentCrop)
                            }
                          >
                            <Image
                              src={currentContent.uri}
                              ref={imgRef}
                              alt="content"
                              width={500}
                              height={450}
                              onLoad={onImageLoad}
                              style={{
                                maxHeight: "450px",
                                objectFit: "contain",
                                width: "auto",
                                height: "auto",
                              }}
                            />
                          </ReactCrop>
                        </div>
                        <p className="text-gray-400 text-xs">
                          Crop the image for your portfolio thumbnail.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center flex-col min-h-28">
                        <ChangeButton
                          resetTrigger={resetContentButton}
                          onResetComplete={handleResetComplete}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center mb-12 mt-2">
                    <div className="border-dotted border-2 rounded-md border-gray-300 p-8 flex justify-center items-center flex-col w-8/12 h-[32rem]">
                      <ContentButton
                        resetTrigger={resetContentButton}
                        onResetComplete={handleResetComplete}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#3798E3] text-white font-bold py-3 px-6 capitalize rounded-md hover:bg-[#2C7AB6]"
              onClick={() => {
                dispatch(
                  creatorContentInfo({
                    currentContent: {
                      ...currentContent,
                      contentType: "campaign",
                    },
                  })
                );
              }}
            >
              Save
            </button>
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
          {crop && (
            <canvas
              ref={previewCanvasRef}
              className="mt-4"
              style={{
                display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: 150,
                height: 150,
              }}
            />
          )}
        </form>
      </div>
    </dialog>
  );
};

export default AddCampaign;
