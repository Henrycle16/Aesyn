"use client";

import React, {useState } from "react";
import { interestsArray, Interest } from "@/lib/user/interestsLib";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Select, {
  components,
  MultiValue,
  ValueContainerProps,
  GroupBase,
} from "react-select";
import "@/styles/interestSelect.css";

type OptionType = {
  value: string;
  label: string;
};

const Interests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedInterests, setDisplayedInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);

  // Handles the change in the selected options
  const handleChange = (
    selectedOptions: MultiValue<OptionType>,
  ) => {
    if (!selectedOptions) {
      setSelectedInterests([]);
      return;
    }

    const newSelectedInterests: Interest[] = selectedOptions.map((option) => ({
      key: parseInt(option.value),
      label: option.label,
    }));

    if (newSelectedInterests.length <= 6) {
      setSelectedInterests(newSelectedInterests);
      setIsLimitExceeded(false);
    } else {
      setIsLimitExceeded(true);
    }
  };

  // Convert interestsArray to options
  const options: OptionType[] = interestsArray.map((interest) => ({
    value: interest.key.toString(),
    label: interest.label,
  }));

  // Convert selectedInterests to value
  const value: OptionType[] = selectedInterests.map((interest) => ({
    value: interest.key.toString(),
    label: interest.label,
  }));

  // Remove the interest from the selected
  const removeInterest = (keyToRemove: number) => {
    setSelectedInterests(
      selectedInterests.filter((interest) => interest.key !== keyToRemove)
    );
  };

  // Custom ValueContainer to display the number of selected
  const ValueContainer = ({
    children,
    getValue,
    ...props
  }: ValueContainerProps<OptionType, boolean, GroupBase<OptionType>>) => {
    // Use getValue() to get the current value and count the selections
    const numValues = getValue().length;
    // Check if there are selections to display the count or default children
    let display = numValues > 0 ? `Selected: ${numValues}` : children;
    return (
      <components.ValueContainer getValue={getValue} {...props}>
        {display}
      </components.ValueContainer>
    );
  };

  const handleSave = () => {
    setDisplayedInterests([...selectedInterests]);
    closeModal();
  };

  // This displays the selected interests in the main profile page when modal is open
  const openModal = () => {
    setIsModalOpen(true);
    setSelectedInterests([...displayedInterests]);
    (
      document.getElementById(`interests_modal`) as HTMLDialogElement
    ).showModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    (document.getElementById(`interests_modal`) as HTMLDialogElement).close();
  };

  return (
    // Main Interests Display
    <div className="border-r border-gray-300 py-8 px-10">
      <div className="flex justify-start">
        <h1 className="text-2xl font-semibold text-[#184465]">Interests </h1>
        <ModeEditOutlineOutlinedIcon
          sx={{ color: "#3798E3", fontSize: 25 }}
          className="border-2 border-[#3798E3] rounded-full p-[.12rem] cursor-pointer ml-3 mt-1"
          onClick={openModal}
        />
      </div>
      <div className="flex flex-wrap pt-8 gap-x-2 gap-y-3">
        {displayedInterests.map((interest) => (
          <div
            key={interest.key}
            className="rounded-3xl text-base font-semibold w-auto py-2 px-6 bg-[#D8EEFE] text-[#3798E3] border-[1.5px] border-[#3798E3] inline-flex items-center justify-center"
          >
            {interest.label}
          </div>
        ))}
      </div>

      {/* Modal Content */}
      <dialog id="interests_modal" className="modal">
        <div className="modal-box bg-white text-[#061119] min-w-[60.625rem] min-h-[27.938rem] pt-8 px-10 pb-6 overflow-y-hidden">
          <h1 className="text-[#184465] font-semibold text-2xl">Interests</h1>
          <h2 className="py-2 gc-label-color body1">
            Add or remove interests that best match your content for brands to
            see. You can choose up to 6.
          </h2>

          {/* Sub-header for the modal */}
          <div className="font-bold py-2 text-[#4A4A4A]">Add Interests</div>

          {/* Body */}
          <div className="flex flew-row min-h-56">
            <div className="sm:text-sm w-80">
              <Select
                isMulti
                name="interests"
                instanceId="interests-select"
                closeMenuOnSelect={selectedInterests.length === 5}
                options={options}
                onChange={handleChange}
                value={value}
                components={{ ValueContainer }}
                placeholder="[Select]"
                isDisabled={selectedInterests.length >= 6}
              />
              {selectedInterests.length === 6 && (
                <div className="text-[#B21717] mt-2">
                  You can select a maximum of 6 interests. Please deselect one before adding another.
                </div>
              )}
            </div>    

            {/* Display the selected interests */}
            <div className="flex-grow border border-gray-300 rounded-md max-w-[31.063rem] ml-6 py-3 px-4 overflow-auto">
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {selectedInterests.map((interest) => (
                  <div
                    key={interest.key}
                    className="rounded-3xl text-base font-semibold w-auto py-2 px-4 bg-[#D8EEFE] text-[#3798E3] border-[1.5px] border-[#3798E3] inline-flex items-center justify-center"
                  >
                    <span>{interest.label}</span>
                    <button
                      className="ml-3 text-[#6D6D6D] font-semibold"
                      onClick={() => removeInterest(interest.key)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form method="dialog">
            <div className="flex justify-end mt-10">
              <button
                onClick={handleSave}
                disabled={selectedInterests.length === 0}
                className={`ml-auto py-3 px-6 capitalize font-bold rounded-lg text-white ${
                  selectedInterests.length === 0
                    ? "bg-gray-400 hover:bg-gray-400"
                    : "bg-[#3798E3] hover:bg-[#2C7AB6]"
                }`}
              >
                Save
              </button>
            </div>
            <button
              onClick={closeModal}
              className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg"
            >
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Interests;
