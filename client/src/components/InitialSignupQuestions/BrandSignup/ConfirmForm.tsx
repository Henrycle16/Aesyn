import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ConfirmFormProps {
  formData: any;
}

const ConfirmForm = ({ formData }: ConfirmFormProps) => {
  return (
    <div className="flex flex-col w-full mt-5 ml-16">
      {/* Header */}
      <h1 className="form-control mb-8">
        <span className="label-text font-bold	text-2xl truncate">
          Confirm Your Information
        </span>
      </h1>

      {/* Grid for the form data */}
      <div className="grid grid-cols-3 grid-rows-4 gap-y-2 gap-x-3">
        {/* This block is for populating the Brand Name and Industry */}
        <div className="col-start-1 col-span-1 row-start-1 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">Brand Name</div>
          <div className="pt-1 font-light truncate">{formData.companyName}</div>
        </div>
        <div className="col-start-2 col-span-1 row-start-1 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">Industry</div>
          <div className="pt-1 font-light">{formData.industry}</div>
        </div>

        {/* This block is for populating the Brand Location  */}
        <div className="col-start-1 col-span-1 row-start-2 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">Location</div>
          <div className="pt-1 font-light">{formData.location}</div>
        </div>

        {/* This block is for populating the POC Name, Phone Number and Email  */}
        <div className="col-start-1 col-span-1 row-start-3 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">
            Contact Person Name
          </div>
          <div className="pt-1 font-light">{formData.contactPersonName}</div>
        </div>
        <div className="col-start-2 col-span-1 row-start-3 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">
            Phone Number
          </div>
          <div className="pt-1 font-light">{formData.contactPhoneNumber}</div>
        </div>
        <div className="col-start-3 col-span-1 row-start-3 row-span-1 justify-end">
          <div className="label-text font-semibold text-base ">Email</div>
          <div className="pt-1 font-light">{formData.contactEmail}</div>
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
      </div>

      {/* Button to submit the form */}
      <div className="self-end mt-auto">
        <Button
          type="submit"
          variant="contained"
          className="bg-muiblue py-3 px-6 whitespace-nowrap"
          endIcon={<ArrowForwardIcon />}
        >
          Looks Good!
        </Button>
      </div>
    </div>
  );
};

export default ConfirmForm;
