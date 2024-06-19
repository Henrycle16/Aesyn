"use client"

import React, { useState } from 'react';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Image from "next/image";

type Props = {
  id: number;
  imageURI: string;
};

const PersonalPortfolioCard = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex relative max-w-full h-96 overflow-hidden">
      <Image
        src={props.imageURI}
        alt="image"
        layout="fill"
        objectFit="cover"
        className="rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && (
        <ModeEditOutlineOutlinedIcon
          sx={{ color: "#3798E3", fontSize: 25 }}
          className="border-2 border-[#3798E3] rounded-full p-[.12rem] absolute top-2 right-2 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      )}
    </div>
  );
};

export default PersonalPortfolioCard;