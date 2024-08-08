"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/legacy/image";

import {
  creatorContentInfo,
  editContent,
} from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch } from "@/redux/store";
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

const CampaignPortfolioCard = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const overlayStyle = {
    content: '""',
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    zIndex: 1,
    display: isHovered ? "block" : "none",
  };

  return (
    <div className="relative">
      {props.uri && isClient ? (
        props.mediaType === "image" ? (
          <div
            className="relative w-[17.35rem] h-[13.88rem] rounded overflow-hidden"
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
          >
            <Image
              src={props.thumbnailUri}
              alt="personal content"
              width={500}
              height={400}
              objectFit="cover"
              className="rounded"
              style={{ cursor: "pointer" }}
            />
            <div style={overlayStyle}></div>
          </div>
        ) : (
          <div className="relative w-[17.35rem] h-[13.88rem] max-w-full max-h-full rounded overflow-hidden">
            <div
              className="relative w-full h-full"
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
            >
              <ReactPlayer
                url={props.uri}
                light={true}
                width="100%"
                height="100%"
                playing={false}
              />
              <div style={overlayStyle}></div>
            </div>
          </div>
        )
      ) : (
        <div className="">Media not available</div>
      )}
      {isHovered && (
        <>
          <ModeEditOutlineOutlinedIcon
            sx={{ fontSize: 25 }}
            className={`z-10 border-2 rounded-full p-[.12rem] absolute top-2 right-2 cursor-pointer ${
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
                  `edit_campaign_modal`
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
            className="z-10 p-[.12rem] absolute bottom-4 left-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </>
      )}
    </div>
  );
};

export default CampaignPortfolioCard;
