"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { resetCurrentPackage } from "@/redux/slices/creatorPackages-slice";
import { creatorProfileInfo } from "@/redux/slices/creatorProfile-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const NewPackageButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(creatorProfileInfo({ previousModalId: "add_package_modal" }));
        dispatch(resetCurrentPackage());
        (document.getElementById('add_package_modal') as HTMLDialogElement).showModal()}
      }
      className=""
    >
      <AddCircleOutlineIcon
        sx={{ color: "#3798E3", fontSize: "29px"}}
        className="cursor-pointer"
      />
    </button>
  );
};

export default NewPackageButton;
