"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import ChangeButton from "../ChangeButton";

import {
  resetCurrentContent,
  editContent,
  creatorContentInfo,
} from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import ReactPlayer from "react-player/lazy";

import { useSession } from "next-auth/react";

import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "../PortfolioSetCanvas";

import { updateImage, updateVideo } from "@/actions/creators3/portfolio";

const ASPECT_RATIO = 5 / 4;
const MIN_DIMENSION = 150;

const EditPersonal = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const session = useSession();
  const userId = session.data?.user.id;

  const dispatch = useDispatch<AppDispatch>();
  const currentContent = useAppSelector(
    (state) => state.creatorContentReducer.value.currentContent
  );

  const [resetContentButton, setResetContentButton] = useState(false);

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
      document.getElementById(`edit_content_modal`) as HTMLDialogElement
    ).close();
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentContent.mediaType === "video") {
      try {
        const response = await updateVideo(userId, currentContent);
        dispatch(editContent(currentContent));
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
        const response = await updateImage(
          userId,
          currentContent._id!,
          formData
        );
        dispatch(
          editContent({
            ...currentContent,
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
      document.getElementById(`edit_content_modal`) as HTMLDialogElement
    ).close();
  };

  return (
    <dialog id="edit_content_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Edit Personal Content
          </h1>
          <p className="pb-4 pt-2 text-sm">
            Display your personal content for brands to see. You can either
            paste a URL or upload your content.
          </p>
        </div>
        <form method="dialog" onSubmit={onFormSubmit}>
          <div className="flex flex-col">
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
                    <p className="g5-text text-sm">
                      Crop the image for your portfolio thumbnail.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="">Image not available</div>
            )}
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center flex-col min-h-28">
                <ChangeButton
                  resetTrigger={resetContentButton}
                  onResetComplete={handleResetComplete}
                />
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
                      contentType: "personal",
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

export default EditPersonal;
