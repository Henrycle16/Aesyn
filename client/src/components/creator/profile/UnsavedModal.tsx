"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { creatorProfileInfo } from "@/redux/slices/creatorProfile-slice";

const UnsavedModal = () => {
  const previousModalId = useAppSelector((state) => state.creatorProfileReducer.value.previousModalId);

  return (
    <dialog id="unsaved_modal" className="modal">
    <div className="modal-box bg-white text-[#4A4A4A] min-w-[38rem] pt-8 pl-8 pr-6 pb-6">
      {/* Header Text */}
      <div className="">
        <h1 className="text-[#184465] font-semibold text-2xl">
          Unsaved Changes
        </h1>
        <p className="pb-4 pt-2 text-sm">
          You have unsaved changes. Are you sure you want to leave?
        </p>
      </div>
      <form method="dialog">
        {/* Action Buttons -- if there is a button in form, it will close the modal */}
        <div className="flex justify-end mt-14 gap-2">
          <button
            onClick={() => {
              (document.getElementById(`${previousModalId}`) as HTMLDialogElement).showModal();
              (document.getElementById(`unsaved_modal`) as HTMLDialogElement).close();
            }}
            className="border-2 border-[#3798E3] text-[#3798E3] py-3 px-6 capitalize font-bold rounded-md hover:bg-[#F5F5F5]"
          >
            Cancel
          </button>
          <button
            className="bg-[#3798E3] text-white py-3 px-6 capitalize font-bold rounded-md hover:bg-[#2C7AB6]"
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  </dialog>
  )
}

export default UnsavedModal