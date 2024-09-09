"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { selectBio, profileDataInfo } from "@/redux/slices/profileData-slice";
import { updateCreatorBio } from "@/actions/creatorApi";
import { showSuccessToast, showDiscardedToast } from "@/utils/toast/toastEmitters";

const Bio: React.FC = () => {
  const dispatch = useAppDispatch();
  const bio = useAppSelector(selectBio); 

  // Local state for handling bio text within the modal
  const [tempBioText, setTempBioText] = useState<string>(bio || "");
  const [charCount, setCharCount] = useState(500 - (bio?.length || 0));
  const [isHovered, setIsHovered] = useState(false);

  const session = useSession();
  const userId = session.data?.user.id;

  // Update local state whenever the bio from Redux changes
  useEffect(() => {
    setTempBioText(bio || "");
    setCharCount(500 - (bio?.length || 0));
  }, [bio]);

  // Form submission handler
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasChanges) return; // Prevent submission if no changes
    try {
      const response = await updateCreatorBio(userId, tempBioText);
      const updatedBio = response.data;

      // Dispatch the updated bio to Redux store
      dispatch(profileDataInfo({ bio: updatedBio }));

      closeModal(true);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  // Handle bio text changes within the modal
  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setTempBioText(newText);
    setCharCount(500 - newText.length);
  };

  // Open the modal and reset the temporary bio text
  const openModal = () => {
    setTempBioText(bio || "");
    (document.getElementById("bio_modal") as HTMLDialogElement).showModal();
  };

  const closeModal = (submitted: any) => {
    if (hasChanges && submitted != true) {
      showDiscardedToast();
    } else if (hasChanges && submitted == true) {
      showSuccessToast();
    }
    (document.getElementById("bio_modal") as HTMLDialogElement).close();
  };

  // Determine if changes have been made to the bio text
  const hasChanges = bio !== tempBioText;

  return (
    <>
      {/* Bio display section */}
      <div className="min-h-[13rem]">
        <div className="flex justify-start">
          <h1 className="heading1 ts5-text">Bio</h1>
          <ModeEditOutlineOutlinedIcon
            sx={{ fontSize: 25 }}
            className={`mode-edit-icon ml-3 mt-1 ${
              isHovered ? "mode-edit-icon-hovered" : "mode-edit-icon-default"
            }`}
            onClick={openModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <div className="flex flex-col">
          <p className="g5-text text-md mt-4 mb-10 flex-grow">
            {bio || "Give a brief description for your profile."}
          </p>
        </div>
      </div>

      {/* Modal for editing bio */}
      <dialog id="bio_modal" className="modal">
        <form
          onSubmit={onFormSubmit}
          className="modal-box bg-white ts7-text min-w-[58.75rem] pt-8 px-10 pb-6"
        >
          <h1 className="heading1 ts5-text">Bio</h1>
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
              className="mt-1 block w-full border g3-border bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
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
              className={`save-btn ml-auto ${
                !hasChanges ? "bg-g3 hover:bg-g3" : "bg-ts1 hover:bg-ts2"
              }`}
              disabled={!hasChanges}
            >
              Save
            </button>
            <button
              onClick={closeModal}
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
