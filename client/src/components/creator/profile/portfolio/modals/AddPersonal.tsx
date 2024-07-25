"use client";

import Image from "next/image";
import {
  addContent,
  resetCurrentContent,
} from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import React, { useState, useRef } from "react";
import ContentButton from "../ContentButton";
import ChangeButton from "../ChangeButton";
import ReactPlayer from "react-player/lazy";

import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "../PortfolioSetCanvas";

const ASPECT_RATIO = 5 / 4;
const MIN_DIMENSION = 150;

const AddPersonal = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

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
    (document.getElementById(`add_content_modal`) as HTMLDialogElement).close();
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addContent(currentContent));
    dispatch(resetCurrentContent());

    setResetContentButton(true);
    (document.getElementById(`add_content_modal`) as HTMLDialogElement).close();
  };

  return (
    <dialog id="add_content_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Add New Personal Content
          </h1>
          <p className="pb-4 pt-2 text-sm">
            Display your personal content for brands to see. You can either
            paste a URL or upload your content.
          </p>
        </div>
        <form method="dialog" onSubmit={onFormSubmit}>
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
              <div className="border-dotted border-2 rounded-md border-gray-300 p-8 flex justify-center items-center flex-col w-5/12 h-96">
                <ContentButton
                  resetTrigger={resetContentButton}
                  onResetComplete={handleResetComplete}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#3798E3] text-white font-bold py-3 px-6 capitalize rounded-md hover:bg-[#2C7AB6]"
              onClick={() => {
                if (imgRef.current) {
                  setCanvasPreview(
                    previewCanvasRef.current as HTMLCanvasElement,
                    imgRef.current as HTMLImageElement,
                    convertToPixelCrop(
                      crop!,
                      imgRef.current.width,
                      imgRef.current.height
                    )
                  );
                }
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

export default AddPersonal;
