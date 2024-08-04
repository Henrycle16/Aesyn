"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/legacy/image";

import { creatorContentInfo } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

type Props = {
  _id?: string;
  contentType: string;
  mediaType: string;
  socialMedia: string;
  uri: string;
  thumbnailUri: string;
  name: string;
  campaignTitle: string;
  description: string;
  date: string;
};

const PersonalPortfolioCard = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const imageStyle = isHovered ? { filter: "grayscale(0.65)" } : {};
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative">
      {props.uri && isClient ? (
        props.mediaType === "image" ? (
          <Image
            src={props.thumbnailUri}
            alt="personal content"
            width={500}
            height={400}
            objectFit="cover"
            className="rounded"
            style={{ ...imageStyle, cursor: "pointer" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              dispatch(creatorContentInfo({ currentContent: props }));
              (
                document.getElementById(
                  `view_content_modal`
                ) as HTMLDialogElement
              ).showModal();
            }}
          />
        ) : (
          <div className="w-[17.35rem] h-[13.88rem] max-w-full max-h-full rounded overflow-hidden">
            <ReactPlayer
              url={props.uri}
              light={true}
              width="100%"
              height="100%"
              playIcon={<></>}
              style={imageStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                dispatch(creatorContentInfo({ currentContent: props }));
                (
                  document.getElementById(
                    `view_content_modal`
                  ) as HTMLDialogElement
                ).showModal();
              }}
            />
          </div>
        )
      ) : (
        <div className="">Media not available</div>
      )}
      {isHovered && (
        <>
          <ModeEditOutlineOutlinedIcon
            sx={{ fontSize: 25 }}
            className={`border-2 rounded-full p-[.12rem] absolute top-2 right-2 cursor-pointer ${
              isReverse
                ? "text-white border-[#3798E3] bg-[#3798E3]"
                : "text-[#3798E3] border-[#D7D7D7] bg-white"
            }`}
            onMouseEnter={() => {
              setIsHovered(true);
              setIsReverse(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsReverse(false);
            }}
            onClick={() => {
              dispatch(creatorContentInfo({ currentContent: props }));
              (
                document.getElementById(
                  `edit_content_modal`
                ) as HTMLDialogElement
              ).showModal();
            }}
          />
          <DeleteOutlineIcon
            sx={{ color: "#B21717", fontSize: 25 }}
            onClick={() => {
              dispatch(creatorContentInfo({ currentContent: props }));
              (
                document.getElementById(
                  "delete_content_modal"
                ) as HTMLDialogElement
              ).showModal();
            }}
            className="p-[.12rem] absolute bottom-4 left-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </>
      )}
    </div>
  );
};

export default PersonalPortfolioCard;
