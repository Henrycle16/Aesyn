import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ContactFormProps {
  handleNextStep: () => void;
  register: any;
  errors: any;
  getValues: any;
}

const ContactForm = ({
  handleNextStep,
  register,
  errors,
  getValues,
}: ContactFormProps) => {
  return (
    <div className="flex flex-col w-full">
      {/* Handles POC Contact Information */}
      <div className="w-4/6 mx-auto my-auto">
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text font-bold text-lg">
              Primary Contact Full Name
            </span>
          </div>
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            id="contactPersonName"
            {...register("contactPersonName")}
          />
          {errors.contactPersonName?.message && (
            <p className="mt-1 text-sm text-red-400">
              {errors.contactPersonName.message}
            </p>
          )}
        </label>
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text font-bold text-lg">
              Primary Contact Phone Number
            </span>
          </div>
          <input
            type="text"
            placeholder="(000) - 000 - 0000"
            className="input input-bordered w-full"
            id="contactPhoneNumber"
            {...register("contactPhoneNumber")}
            maxLength={10}
          />
          {errors.contactPhoneNumber?.message && (
            <p className="mt-1 text-sm text-red-400">
              {errors.contactPhoneNumber.message}
            </p>
          )}
        </label>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={
            !getValues('contactPersonName') ||
            !getValues('contactPhoneNumber') ||
            !!errors.contactPersonName ||
            !!errors.contactPhoneNumber
          }
          onClick={handleNextStep}
          type="button"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className="bg-muiblue py-3 px-6"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
