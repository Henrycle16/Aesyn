"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {};

const NewPackageButton = (props: Props) => {
  return (
    <button
      type="button"
      onClick={() => (document.getElementById('add_package_modal') as HTMLDialogElement).showModal()}
      className="flex gap-2 border-2 border-[#3798E3] text-[#3798E3] py-3 px-6 capitalize rounded-md hover:bg-[#F5F5F5]"
    >
      <AddCircleOutlineIcon
        sx={{ color: "#3798E3" }}
        className="cursor-pointer"
      />
      <span className="font-semibold">Add New Package</span>
    </button>
  );
};

export default NewPackageButton;
