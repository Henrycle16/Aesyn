"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
  
}

const NewPackageCard = (props: Props) => {
  return (
    <div className="border border-[#D7D7D7] min-w-[21rem] flex flex-col gap-3 justify-center items-center p-4 rounded-2xl">
      <AddCircleOutlineIcon
        sx={{ color: "#184465" }}
        fontSize="large"
        className="cursor-pointer"
        onClick={() => (document.getElementById('add_package_modal') as HTMLDialogElement).showModal()}
      />
      <p className=" font-bold">Add New Package</p>
    </div>
  );
};

export default NewPackageCard;
