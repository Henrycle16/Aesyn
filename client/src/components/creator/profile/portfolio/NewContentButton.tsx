"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
  isPersonalPortfolio: boolean;
};

const NewContentButton = (props: Props) => {
  const { isPersonalPortfolio } = props;

  return (
    <button
      type="button"
      onClick={() => isPersonalPortfolio ? (document.getElementById('add_content_modal') as HTMLDialogElement).showModal() : (document.getElementById('add_campaign_modal') as HTMLDialogElement).showModal()}
    >
      <AddCircleOutlineIcon
        sx={{ color: "#3798E3" }}
        className="cursor-pointer"
      />
    </button>
  );
};

export default NewContentButton;
