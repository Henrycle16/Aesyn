"use client";

import React, { useState } from "react";
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
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [selectedNiches, setSelectedNiches] = useState<Niche[]>([]);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);

  const handleChange = (
    selectedOptions: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
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
      setIsLimitExceeded(false); // Reset the limit exceeded flag when within limit
    } else {
      setIsLimitExceeded(true); // Set the flag instead of using alert
    }
  };

  const options: OptionType[] = nichesArray.map((niche) => ({
    value: niche.key.toString(),
    label: niche.label,
  }));

  const value: OptionType[] = selectedNiches.map((niche) => ({
    value: niche.key.toString(),
    label: niche.label,
  }));

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

  const removeNiche = (keyToRemove: number) => {
    setSelectedNiches(
      selectedNiches.filter((niche) => niche.key !== keyToRemove)
    );
  };

  const closeModal = () => {
    setIsModalClosed(true);
    (document.getElementById(`interests_modal`) as HTMLDialogElement).close();
  };

  return (
    <div className="border-r border-gray-300 py-8 px-10">
      <div className="flex justify-start">
        <h1 className="text-2xl font-semibold text-[#184465]">Interests </h1>
        <ModeEditOutlineOutlinedIcon
          sx={{ color: "#3798E3", fontSize: 25 }}
          className="border-2 border-[#3798E3] rounded-full p-[.12rem] cursor-pointer ml-3 mt-1"
          onClick={() =>
            (
              document.getElementById(`interests_modal`) as HTMLDialogElement
            ).showModal()
          }
        />
      </div>
      <div className="flex flex-wrap pt-8 gap-x-2 gap-y-3">
        {selectedNiches.slice(0, 6).map((data) => (
          <div
            key={data.key}
            className={
              "rounded-3xl text-base font-semibold w-auto py-2 px-6 bg-[#D8EEFE] text-[#3798E3] border-[1.5px] border-[#3798E3] inline-flex items-center justify-center"
            }
          >
            {data.label}
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
                closeMenuOnSelect={false}
                options={options}
                onChange={handleChange}
                value={value}
                components={{ ValueContainer }}
                placeholder="[Select]"
                isDisabled={selectedNiches.length >= 6}
                // className="css-1n6sfyn-MenuList"
              />
              {selectedNiches.length === 6 && (
                <div className="text-[#B21717] mt-2">
                  You can only choose up to 6 interests. Please remove an
                  interest to add another.
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
                onClick={closeModal}
                className="bg-[#3798E3] text-white ml-auto py-3 px-6 capitalize font-bold rounded-lg hover:bg-[#2C7AB6]"
              >
                Save
              </button>
            </div>
            <button className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Interests;
