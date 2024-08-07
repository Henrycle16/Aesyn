"use client";

import AddIcon from '@mui/icons-material/Add';
import React, { useState } from "react";

type Props = {
  isPersonalPortfolio: boolean;
  portfolioCount: number;
};

const NewContentButton = (props: Props) => {
  const { isPersonalPortfolio } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      disabled={props.portfolioCount >= 8}
      onClick={() =>
        isPersonalPortfolio
          ? (
              document.getElementById("add_content_modal") as HTMLDialogElement
            ).showModal()
          : (
              document.getElementById("add_campaign_modal") as HTMLDialogElement
            ).showModal()
      }
    >
      <AddIcon
        className={
          props.portfolioCount >= 8
            ? `cursor-pointer text-[#F5F5F5] rounded-full border-2 bg-[#D7D7D7]`
            : `cursor-pointer rounded-full border-2 ${isHovered ? "text-[#F5F5F5] border-[#3798E3] bg-[#3798E3]" : "text-[#3798E3] border-[#D7D7D7]"}`
        }
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      />
    </button>
  );
};

export default NewContentButton;
