"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
  isPersonalPortfolio: boolean;
  portfolioCount: number;
};

const NewContentButton = (props: Props) => {
  const { isPersonalPortfolio } = props;

  return (
    <button
      type="button"
      disabled={props.portfolioCount >= 8}
      onClick={() => isPersonalPortfolio ? (document.getElementById('add_content_modal') as HTMLDialogElement).showModal() : (document.getElementById('add_campaign_modal') as HTMLDialogElement).showModal()}
    >
      <AddCircleOutlineIcon
        className={props.portfolioCount >= 8 ? "cursor-pointer text-[#F5F5F5]" : "cursor-pointer text-[#3798E3]"}
      />
    </button>
  );
};

export default NewContentButton;
