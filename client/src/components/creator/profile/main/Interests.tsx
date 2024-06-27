"use client";

import React, { useEffect, useState } from "react";
import { nichesArray, Niche } from "@/lib/user/nichesLib";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Select, {
  components,
  ActionMeta,
  MultiValue,
  ValueContainerProps,
  GroupBase,
} from "react-select";
import "@/styles/nicheSelect.css";

type OptionType = {
  value: string;
  label: string;
};

const Interests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedNiches, setDisplayedNiches] = useState<Niche[]>([]);
  const [selectedNiches, setSelectedNiches] = useState<Niche[]>([]);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);

  // Handles the change in the selected options
  const handleChange = (
    selectedOptions: MultiValue<OptionType>,
  ) => {
    if (!selectedOptions) {
      setSelectedNiches([]);
      return;
    }

    const newSelectedNiches: Niche[] = selectedOptions.map((option) => ({
      key: parseInt(option.value),
      label: option.label,
    }));

    if (newSelectedNiches.length <= 6) {
      setSelectedNiches(newSelectedNiches);
      setIsLimitExceeded(false);
    } else {
      setIsLimitExceeded(true);
    }
  };

  // Convert nichesArray to options
  const options: OptionType[] = nichesArray.map((niche) => ({
    value: niche.key.toString(),
    label: niche.label,
  }));

  // Convert selectedNiches to value
  const value: OptionType[] = selectedNiches.map((niche) => ({
    value: niche.key.toString(),
    label: niche.label,
  }));

  // Remove the niche from the selected
  const removeNiche = (keyToRemove: number) => {
    setSelectedNiches(
      selectedNiches.filter((niche) => niche.key !== keyToRemove)
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
    setDisplayedNiches([...selectedNiches]);
    closeModal();
  };

  // This displays the selected niches in the main profile page when modal is open
  const openModal = () => {
    setIsModalOpen(true);
    setSelectedNiches([...displayedNiches]);
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
        {displayedNiches.map((niche) => (
          <div
            key={niche.key}
            className="rounded-3xl text-base font-semibold w-auto py-2 px-6 bg-[#D8EEFE] text-[#3798E3] border-[1.5px] border-[#3798E3] inline-flex items-center justify-center"
          >
            {niche.label}
          </div>
        ))}
      </div>

      {/* Modal Content */}
      <dialog id="interests_modal" className="modal">
        <div className="modal-box bg-white text-[#061119] min-w-[60.625rem] min-h-[27.938rem] pt-8 px-10 pb-6 overflow-y-hidden">
          <h1 className="text-[#184465] font-semibold text-2xl">Interests</h1>
          <h2 className="py-2 text-[#4A4A4A]">
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
                closeMenuOnSelect={selectedNiches.length === 5}
                options={options}
                onChange={handleChange}
                value={value}
                components={{ ValueContainer }}
                placeholder="[Select]"
                isDisabled={selectedNiches.length >= 6}
              />
              {selectedNiches.length === 6 && (
                <div className="text-[#B21717] mt-2">
                  You can select a maximum of 6 interests. Please deselect one before adding another.
                </div>
              )}
            </div>

            {/* Display the selected interests */}
            <div className="flex-grow border border-gray-300 rounded-md max-w-[31.063rem] ml-6 py-3 px-4 overflow-auto">
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {selectedNiches.map((niche) => (
                  <div
                    key={niche.key}
                    className="rounded-3xl text-base font-semibold w-auto py-2 px-4 bg-[#D8EEFE] text-[#3798E3] border-[1.5px] border-[#3798E3] inline-flex items-center justify-center"
                  >
                    <span>{niche.label}</span>
                    <button
                      className="ml-3 text-[#6D6D6D] font-semibold"
                      onClick={() => removeNiche(niche.key)}
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
                disabled={selectedNiches.length === 0}
                className={`ml-auto py-3 px-6 capitalize font-bold rounded-lg text-white ${
                  selectedNiches.length === 0
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
