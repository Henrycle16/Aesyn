"use client";

import React, { useState } from 'react';
import {
  creatorContentInfo
} from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const LinkVideo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [imageUrl, setImageUrl] = useState('');

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      creatorContentInfo({
        currentContent: {
          uri: imageUrl,
          name: "",
          mediaType: "video",
        },
      })
    );
    setImageUrl(""),
    (
      document.getElementById(`link_video_modal`) as HTMLDialogElement
    ).close();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  return (
    <dialog id="link_video_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Link a video
          </h1>
        <form method="dialog" onSubmit={onFormSubmit}>
          <div className="w-full flex flex-col">
            <label
              htmlFor="url"
              className="text-[#4A4A4A] block font-bold pr-5 mt-5"
            >
              Paste a link to your YouTube video
            </label>
            <input
              type="url"
              id="url"
              name="url"
              className="mt-1 py-3 px-3 pl-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
              placeholder="YouTube Link"
              value={imageUrl}
              onChange={handleInputChange}
            />
          </div>
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
              setImageUrl(""),
              (document.getElementById(
                `link_video_modal`
              ) as HTMLDialogElement).close();
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

export default LinkVideo;