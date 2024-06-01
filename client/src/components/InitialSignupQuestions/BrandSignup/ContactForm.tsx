import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ContactFormProps {
  handleNextStep: () => void;
  handleFormChange: (event: any) => void;
  formData: any;
}

const ContactForm = ({ formData, handleFormChange, handleNextStep } : ContactFormProps) => {
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
            required
            className="input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
            name="contactPersonName"
            value={formData.contactPersonName}
            onChange={(e) => handleFormChange(e)}
          />
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
            required
            className="input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
            name="contactPhoneNumber"
            value={formData.contactPhoneNumber}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
        <label className="form-control w-full mb-6">
          <div className="label">
            <span className="label-text font-bold text-lg">
              Primary Contact Email
            </span>
          </div>
          <input
            type="email"
            placeholder="Email Address"
            required
            className="input input-bordered w-full focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500 focus:border-blue-500 rounded-md"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={(e) => handleFormChange(e)}
          />
        </label>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={
            !formData.contactPersonName ||
            !formData.contactPhoneNumber ||
            !formData.contactEmail
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
