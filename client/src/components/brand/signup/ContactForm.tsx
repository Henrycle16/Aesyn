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
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-lg">
              Person of Contact
            </span>
          </div>
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full"
            id="firstName"
            {...register("firstName")}
          />
          <p className="mt-1 text-sm text-red-400 min-h-5">
            {errors.firstName?.message}
          </p>
        </label>
        <label className="form-control w-full mt-1">
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full"
            id="lastName"
            {...register("lastName")}
          />
          <p className="mt-1 text-sm text-red-400 min-h-5">
            {errors.lastName?.message}
          </p>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-lg">
              Phone Number
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
          <p className="mt-1 text-sm text-red-400 min-h-5">
            {errors.contactPhoneNumber?.message}
          </p>
        </label>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={
            !getValues('firstName') ||
            !getValues('lastName') ||
            !getValues('contactPhoneNumber') ||
            !!errors.firstName ||
            !!errors.lastName ||
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