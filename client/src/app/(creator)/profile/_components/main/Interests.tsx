"use client";

import React, { useEffect, useState } from "react";
import { interestsArray, Interest } from "@/lib/user/interestsLib";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Select, {
  components,
  ValueContainerProps,
  GroupBase,
} from "react-select";
import "@/styles/interestSelect.css";
import { useSession } from "next-auth/react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { profileDataInfo } from "@/redux/slices/profileData-slice";
import { useDispatch } from "react-redux";
import { updateCreatorInterests } from "@/actions/creatorApi";

type OptionType = {
  value: string;
  label: string;
};

const Interests = () => {
  const interests = useAppSelector(
    (state) => state.profileDataReducer.value.interests
  );
  const dispatch = useDispatch<AppDispatch>();

  const [selectedInterests, setSelectedInterests] = useState<OptionType[]>([]);
  const [isLimitExceeded, setIsLimitExceeded] = useState(
    6 - interests.length < 0
  );
  const [isHovered, setIsHovered] = useState(false);

  const session = useSession();
  const userId = session.data?.user.id;

  useEffect(() => {
    const initialSelectedInterests = interests
      .map((interest) => {
        const interestObject = interestsArray.find(
          (item) => item.label === interest
        );
        return interestObject
          ? {
              value: interestObject.key.toString(),
              label: interestObject.label,
            }
          : null;
      })
      .filter(Boolean) as OptionType[];
    setSelectedInterests(initialSelectedInterests);
    setIsLimitExceeded(6 - interests.length < 0);
  }, [interests]);

  // Handles the form submission
  const onFormSubmit = async () => {
    try {
      const selectedInterestLabels = selectedInterests.map(
        (interest) => interest.label
      );
      console.log("Submitting interests:", selectedInterestLabels);
      if (userId) {
        await updateCreatorInterests(userId, selectedInterestLabels);
        dispatch(profileDataInfo({ interests: selectedInterestLabels }));
      }
      closeModal();
    } catch (error) {
      console.error("Failed to update interests:", error);
    }
  };

  // Handles the change in the selected options
  const handleInterestChange = (selectedOptions: OptionType[]) => {
    setSelectedInterests(selectedOptions);
  };

  // Remove the interest from the selected
  const removeInterest = (interest: OptionType) => {
    const updatedInterests = selectedInterests.filter(
      (selectedInterest) => selectedInterest.value !== interest.value
    );
    setSelectedInterests(updatedInterests);
  };

  // Convert interestsArray to options
  const options: OptionType[] = interestsArray.map((interest) => ({
    value: interest.key.toString(),
    label: interest.label,
  }));

  // Custom ValueContainer to display the number of selected
  const ValueContainer = ({
    children,
    getValue,
    ...props
  }: ValueContainerProps<OptionType, boolean, GroupBase<OptionType>>) => {
    const numValues = getValue().length;
    let display = numValues > 0 ? `Selected: ${numValues}` : children;
    return (
      <components.ValueContainer getValue={getValue} {...props}>
        {display}
      </components.ValueContainer>
    );
  };

  // This displays the selected interests in the main profile page when modal is open
  const openModal = () => {
    (
      document.getElementById(`interests_modal`) as HTMLDialogElement
    ).showModal();
  };

  const closeModal = () => {
    setSelectedInterests(
      interests
        .map((interest) => {
          const interestObject = interestsArray.find(
            (item) => item.label === interest
          );
          return interestObject
            ? {
                value: interestObject.key.toString(),
                label: interestObject.label,
              }
            : { value: "", label: "" };
        })
        .filter((interest) => interest.value !== "")
    );
    (document.getElementById(`interests_modal`) as HTMLDialogElement).close();
  };

  return (
    <div className="border-r border-gray-300 py-8 px-10">
      <div className="flex justify-start">
        <h1 className="heading1 text-ts5">Interests </h1>
        <ModeEditOutlineOutlinedIcon
          sx={{ fontSize: 25 }}
          className={`mode-edit-icon ml-3 mt-1 ${
            isHovered ? "mode-edit-icon-hovered" : "mode-edit-icon-default"
          }`}
          onClick={openModal}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        />
      </div>
      <div className="flex flex-wrap pt-8 gap-x-2 gap-y-3">
        {interests.map((data, index) => (
          <div
            key={index}
            className="rounded-3xl text-base font-semibold w-auto py-2 px-6 ts4-bg ts1-text border-[1.5px] border-[#3798E3] inline-flex items-center justify-center">
            {data}
          </div>
        ))}
      </div>

      <dialog id="interests_modal" className="modal">
        <div className="modal-box bg-white ts7-text min-w-[60.625rem] min-h-[27.938rem] pt-8 px-10 pb-6 overflow-y-hidden">
          <h1 className="text-[#184465] font-semibold text-2xl">Interests</h1>
          <h2 className="py-2 gc-label-color body1">
            Add or remove interests that best match your content for brands to
            see. You can choose up to 6.
          </h2>

          <div className="font-bold py-2 g5-text">Add Interests</div>

          <div className="flex flex-row min-h-56">
            <div className="sm:text-sm w-80">
              <Select
                isMulti
                name="interests"
                instanceId="interests-select"
                closeMenuOnSelect={selectedInterests.length === 5}
                options={options}
                onChange={(newValue, actionMeta) =>
                  handleInterestChange(newValue as OptionType[])
                }
                value={selectedInterests}
                components={{ ValueContainer }}
                placeholder="[Select]"
                isDisabled={selectedInterests.length >= 6}
              />
              {selectedInterests.length === 6 && (
                <div className="error-text mt-2">
                  You can select a maximum of 6 interests. Please deselect one
                  before adding another.
                </div>
              )}
            </div>

            <div className="flex-grow border g3-border rounded-md max-w-[31.063rem] ml-6 py-3 px-4 overflow-auto">
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {selectedInterests.map((interest) => (
                  <div
                    key={interest.value}
                    className="rounded-3xl text-base font-semibold w-auto py-2 px-4 ts4-bg ts1-text border-[1.5px] ts1-border inline-flex items-center justify-center">
                    {interest.label}
                    <button
                      className="ml-3 g4-text font-semibold"
                      onClick={() => removeInterest(interest)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onClick={onFormSubmit} method="dialog">
            <div className="flex justify-end mt-10">
              <button
                type="submit"
                disabled={selectedInterests.length === 0}
                className={`save-btn ml-auto ${
                  selectedInterests.length === 0
                    ? "bg-g3 hover:bg-g3"
                    : "bg-ts1 hover:bg-ts2"
                }`}>
                Save
              </button>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Interests;
