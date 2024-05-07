import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ConfirmFormProps {
  formData: any;
  handleNextStep: () => void;
}

const ConfirmForm = ({ formData, handleNextStep }: ConfirmFormProps) => {
  return (
    <div className="flex flex-col w-full mt-5 ml-16">
      {/* Header */}
      <h1 className="form-control mb-8">
        <span className="label-text font-bold	text-2xl truncate">
          Confirm Your Information
        </span>
      </h1>

      {/* Grid for the form data */}
      <div className="grid grid-cols-3 grid-rows-4 gap-y-3">
        {/* This block is for populating the Brand Name and Industry */}
        <div className="col-start-1 col-span-1 row-start-1 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">Username</div>
          <div className="pt-1 font-light">{formData.userName}</div>
        </div>
        <div className="col-start-2 col-span-1 row-start-1 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">Gender</div>
          <div className="pt-1 font-light">{formData.gender}</div>
        </div>

        {/* This block is for populating the Brand Location  */}
        <div className="col-start-1 col-span-1 row-start-2 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">Location</div>
          <div className="pt-1 font-light">{formData.location}</div>
        </div>

        {/* This block is for populating Social Media Preference */}
        <div className="col-start-1 col-span-3 row-start-4 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">
            Social Media Preference
          </div>
          <div className="pt-1 font-light">
            {formData.preferences.join(", ")}
          </div>
        </div>

        {/* This block is for populating the Niche Selection  */}
        <div className="col-start-1 col-span-1 row-start-3 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">Niche</div>
          <div className="pt-1 font-light">{formData.niche.join(", ")}</div>
        </div>
      </div>

      {/* Next Button */}
      <div className="self-end mt-auto">
        <Button
          // disabled={isNextButtonDisabled}
          // onClick={handleNextStep}
          type="button"
          variant="contained"
          className="bg-muiblue py-3 px-6"
          endIcon={<ArrowForwardIcon />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ConfirmForm;
