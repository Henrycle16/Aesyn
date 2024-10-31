"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { addPackage as addPackageStore } from "@/redux/slices/creatorPackages-slice";
import { addPackage } from "@/actions/creatorApi";
import PackageForm from "./PackageForm";
import { showSuccessToast, showDiscardedToast } from "@/utils/toast/toastEmitters";

const AddPackage =  () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPackage = useAppSelector(
    (state) => state.creatorPackagesReducer.value.currentPackage
  );

  const session = useSession();
  const userId = session.data?.user.id;

  const createPackage = async ( userId: string, currentPackage: any) => {
    try {
      const response = await addPackage(userId, currentPackage);
      dispatch(addPackageStore(response.data));
      showSuccessToast();
    } catch (error) {
      console.error(error);
    }
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPackage(userId, currentPackage);
    (document.getElementById(`add_package_modal`) as HTMLDialogElement).close();
  };

  return (
    <dialog id="add_package_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        {/* Header Text */}
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Add New Package
          </h1>
          <p className="pb-4 pt-2 text-sm">
            Create your content package plan to list on your profile for brands
            to purchase.
          </p>
        </div>
        {/* Form */}
        <PackageForm onFormSubmit={onFormSubmit} modalId="add" />
      </div>
    </dialog>
  );
};

export default AddPackage;
