"use client";

import Upload from "@/components/ui/svgs/Upload";
import React, { useState, useEffect } from "react";

import {
  creatorContentInfo,
  editContent,
} from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

// TODO: Add logic to reset form fields after successfully submitting form

const EditCampaign = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentContent = useAppSelector(
    (state) => state.creatorContentReducer.value.currentContent
  );

  const [charCount, setCharCount] = useState(100);

  useEffect(() => {
    setCharCount(100 - currentContent.description.length);
  }, [currentContent.description]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editContent({ ...currentContent }));
    (
      document.getElementById(`edit_campaign_modal`) as HTMLDialogElement
    ).close();
  };

  return (
    <dialog id="edit_campaign_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        {/* Header Text */}
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Edit Previous Campaign Project
          </h1>
          <p className="pb-4 pt-2 text-sm">
            Display your past campaign work for brands to see. You can either
            paste a URl or upload your work.
          </p>
        </div>
        {/* Form */}
        <form method="dialog" onSubmit={onFormSubmit}>
          {/* Input Fields Container */}
          <div className="grid grid-cols-2 gap-14">
            <div className="grid-col-1 ">
              <label
                htmlFor="social_media"
                className="text-[#4A4A4A] block font-bold"
              >
                *Social Media
              </label>
              <select
                id="social_media"
                name="social_media"
                value={currentContent.socialMedia}
                onChange={(e) =>
                  dispatch(
                    creatorContentInfo({
                      currentContent: { socialMedia: e.target.value },
                    })
                  )
                }
                className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:border-[#3798E3] sm:text-sm"
              >
                <option value="">[Select]</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
              </select>
            </div>

            <div className="grid-col-2">
              <label
                htmlFor="description"
                className="text-[#4A4A4A] block font-bold pr-5"
              >
                Description
              </label>
              <textarea
                id="url"
                name="url"
                maxLength={100}
                onChange={(e) => {
                  setCharCount(100 - e.target.value.length);
                  dispatch(
                    creatorContentInfo({
                      currentContent: { description: e.target.value },
                    })
                  );
                }}
                className="pt-3 w-full h-20 mt-1 px-3 pl-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm resize-none"
                placeholder="Briefly describe your work on this campaign"
                value={currentContent.description}
              />
              <p className="flex justify-end">{charCount} characters left</p>
            </div>
          </div>

          <div className="w-full flex flex-col mt-10">
            <label
              htmlFor="url"
              className="text-[#4A4A4A] block font-bold pr-5"
            >
              Paste a link to your social media post or video
            </label>
            <input
              type="url"
              id="url"
              name="url"
              className="mt-1 py-3 px-3 pl-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
              placeholder="URL Link"
            />
          </div>

          <div className="flex justify-center items-center gap-3 mt-10">
            <span className="border-t border-gray-300 flex-1"></span>
            <span className="font-bold">OR</span>
            <span className="border-t border-gray-300 flex-1"></span>
          </div>

          <div className="flex flex-col mt-10">
            <p className="text-[#4A4A4A] block font-bold pr-5">
              Upload your photo or video
            </p>
            <div className="w-full mt-1 py-8 px-8 border-dotted border-2 border-gray-600 rounded-md shadow-sm flex justify-center">
              <div className="border-4 border-gray-300 w-min rounded-3xl p-1">
                <Upload />
              </div>
            </div>
          </div>

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
              (
                document.getElementById(
                  `edit_campaign_modal`
                ) as HTMLDialogElement
              ).close();
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

export default EditCampaign;