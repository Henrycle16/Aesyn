"use client";

import Image from "next/legacy/image";
import FileUpload from "../FileUpload";
import {
  creatorContentInfo,
  addContent,
  editContent,
  resetCurrentContent,
} from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

import React, { useState } from "react";
import ContentButton from "../ContentButton";
import ChangeButton from "../ChangeButton";

const AddPersonal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentContent = useAppSelector(
    (state) => state.creatorContentReducer.value.currentContent
  );

  const [resetContentButton, setResetContentButton] = useState(false);

  const handleResetComplete = () => {
    setResetContentButton(false);
  };

  const handleFileUpload = ({ uri, name }: { uri: string; name: string }) => {
    dispatch(creatorContentInfo({ currentContent: { uri, name } }));
  };

  const handleCloseModal = () => {
    dispatch(resetCurrentContent());
    setResetContentButton(true);
    (document.getElementById(`add_content_modal`) as HTMLDialogElement).close();
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addContent(currentContent));
    dispatch(resetCurrentContent());

    setResetContentButton(true);
    (document.getElementById(`add_content_modal`) as HTMLDialogElement).close();
  };

  return (
    <dialog id="add_content_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        {/* Header Text */}
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Add New Personal Content
          </h1>
          <p className="pb-4 pt-2 text-sm">
            Display your personal content for brands to see. You can either
            paste a URL or upload your content.
          </p>
        </div>
        {/* Form */}
        <form method="dialog" onSubmit={onFormSubmit}>
          {/* Input Fields Container */}

          {currentContent.uri ? (
            <>
              <div className="relative w-[100%] h-[400px] bg-gray-50 my-3">
                <Image
                  src={currentContent.uri}
                  alt="content"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center flex-col min-h-28">
                <ChangeButton
                  resetTrigger={resetContentButton}
                  onResetComplete={handleResetComplete}
                />
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center">
              <div className="border-dotted border-2 rounded-md border-gray-300 p-8 flex justify-center items-center flex-col w-5/12 h-96">
                <ContentButton
                  resetTrigger={resetContentButton}
                  onResetComplete={handleResetComplete}
                />
              </div>
            </div>
          )}

          {currentContent.name ? (
            <p className="text-gray-400 text-xs">.../{currentContent.name}</p>
          ) : (
            <></>
          )}

          {/* Action Buttons -- if there is a button in form, it will close the modal */}
          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="bg-[#3798E3] text-white font-bold py-3 px-6 capitalize rounded-md hover:bg-[#2C7AB6]"
            >
              Save
            </button>
          </div>
          <button
            onClick={() => {
              handleCloseModal();
              // TODO: Add logic to show unsaved changes modal if there are any changes
              // (document.getElementById(`unsaved_modal`) as HTMLDialogElement).showModal();
            }}
            type="button"
            className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg"
          >
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddPersonal;
