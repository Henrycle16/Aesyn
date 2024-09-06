"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { editPackage as editPackageStore } from "@/redux/slices/creatorPackages-slice";
import { updatePackage } from "@/actions/creatorApi";
import PackageForm from "./PackageForm";
import { showSuccessToast, showDiscardedToast } from "@/utils/toast/toastEmitters";

const EditPackage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPackage = useAppSelector(
    (state) => state.creatorPackagesReducer.value.currentPackage
  );

  const session = useSession();
  const userId = session.data?.user.id;

  const editPackage = async ( userId: string, currentPackage: any) => {
    try {
      const response = await updatePackage(userId, currentPackage);
      console.log(response.data);
      dispatch(editPackageStore(currentPackage));
      showSuccessToast();
    } catch (error) {
      console.error(error);
    }
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editPackage(userId, currentPackage);
    (document.getElementById(`edit_package_modal`) as HTMLDialogElement).close();
  };

  return (
    <dialog id="edit_package_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        {/* Header Text */}
        <div className="">
          <div className="flex gap-3 items-center">
            <h1 className="text-[#184465] font-semibold text-2xl">
              Edit Package
            </h1>
            <DeleteOutlineIcon
              sx={{ color: "#B21717", fontSize: 25 }}
              className="cursor-pointer"
              onClick={() => {
                (document.getElementById("edit_package_modal") as HTMLDialogElement).close();
                (document.getElementById("delete_package_modal") as HTMLDialogElement).showModal();
              }}
            />
          </div>
          <p className="pb-4 pt-2 text-sm">
            Edit your content package plan to list on your profile for brands to
            purchase.
          </p>
        </div>
        {/* Form */}
        <PackageForm onFormSubmit={onFormSubmit} modalId="edit" />
      </div>
    </dialog>
  );
};

export default EditPackage;
