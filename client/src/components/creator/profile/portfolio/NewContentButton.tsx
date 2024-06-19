"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {};

const NewContentButton = (props: Props) => {
  return (
    <button
      type="button"
      onClick={() => (document.getElementById('add_content_modal') as HTMLDialogElement).showModal()}
    >
      <AddCircleOutlineIcon
        sx={{ color: "#3798E3" }}
        className="cursor-pointer"
      />
    </button>
  );
};

export default NewContentButton;
