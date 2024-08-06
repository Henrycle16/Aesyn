"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { updateCreatorBio } from "@/actions/creatorApi";

const Bio: React.FC = () => {
  const bio = useAppSelector((state) => state.profileDataReducer.value.bio);

  // Temp text state is needed so the text doesn't change until the user clicks save
  const [bioText, setBioText] = useState<string>(bio || "");
  const [tempBioText, setTempBioText] = useState(bioText);
  const [charCount, setCharCount] = useState(500 - (bio?.length || 0));

  const session = useSession();
  const userId = session.data?.user.id;

  useEffect(() => {
    setBioText(bio || "");
    setTempBioText(bio || "");
    setCharCount(500 - (bio?.length || 0));
  }, [bio]);

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateCreatorBio(userId, tempBioText);
      console.log("bio:", response.data);
      setBioText(tempBioText); // Update the main bio text after saving
      (document.getElementById("bio_modal") as HTMLDialogElement).close();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setTempBioText(newText);
    setCharCount(500 - newText.length);
  };

  const openModal = () => {
    setTempBioText(bioText);
    (document.getElementById("bio_modal") as HTMLDialogElement).showModal();
  };

  return (
    <>
      <div className="min-h-[13rem]">
        <div className="flex justify-start">
          <h1 className="text-2xl font-semibold text-[#184465]">Bio</h1>
          <ModeEditOutlineOutlinedIcon
            sx={{ color: "#3798E3", fontSize: 25 }}
            className="border-2 border-[#3798E3] rounded-full p-[.12rem] cursor-pointer ml-3 mt-1"
            onClick={openModal}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[#4A4A4A] text-md mt-4 mb-10 flex-grow">
            {bioText || "Give a brief description for your profile."}
          </p>
        </div>
      </div>

      {/* Modal */}
      <dialog id="bio_modal" className="modal">
        <form
          onSubmit={onFormSubmit}
          className="modal-box bg-white text-[#061119] min-w-[58.75rem] pt-8 px-10 pb-6"
        >
          <h1 className="text-[#184465] font-semibold text-2xl">Bio</h1>
          <h2 className="py-2 gc-label-color body1">
            Give a brief description for your profile.
          </h2>
          <div>
            <textarea
              name="description"
              placeholder="Enter your bio here..."
              maxLength={500}
              rows={7}
              value={tempBioText}
              onChange={handleBioChange}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
              style={{
                paddingLeft: "1%",
                paddingTop: "1%",
                resize: "none",
                fontSize: "16px",
              }}
            />
            <p className="flex justify-end">{charCount} characters left</p>
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="bg-[#3798E3] text-white ml-auto py-3 px-6 capitalize font-bold rounded-md hover:bg-[#2C7AB6]"
            >
              Save
            </button>
            <button
              onClick={() => (document.getElementById("bio_modal") as HTMLDialogElement).close()}
              type="button"
              className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg"
            >
              X
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Bio;
