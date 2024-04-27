import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ConfirmFormProps {
  handlePrevStep: () => void;
  handleFormChange: (event: any) => void;
  formData: any;
}

const ConfirmForm = ({
  formData,
  handlePrevStep,
}: ConfirmFormProps) => {
  return (
    <div className="grid grid-cols-10 grid-rows-10 gap-4 w-full h-full">
      <div className="col-start-1 col-span-1 row-start-1 row-span-1 justify-end">
        <Button
          onClick={handlePrevStep}
          variant="text"
          startIcon={<ArrowBackIcon />}
          className="col-span-1"
          sx={{ padding: "12px 24px" }}
        >
          back
        </Button>
      </div>

      {/* Header */}
      <div className="col-start-2 col-span-6 row-start-2 row-span-1 justify-center items-center">
        <header className="form-control w-full mb-8">
            <span className="label-text font-bold	text-2xl truncate">
              Confirm Your Information
            </span>
        </header>
      </div>


      {/* Grid for the form data */}
      <div className="col-start-2 col-span-8 row-start-3 row-span-7 justify-center items-center">
        <div className="grid grid-cols-3 grid-rows-4 w-full h-full">
          

          {/* This block is for populating the Brand Name and Industry */}
          <div className="col-start-1 col-span-1 row-start-1 row-span-1 justify-end">
              <div className="label-text font-semibold text-base ">Brand Name</div>
              <div className="pt-2">
             {formData.companyName}
             </div>
          </div>
          <div className="col-start-2 col-span-1 row-start-1 row-span-1 justify-end">
              <div className="label-text font-semibold text-base ">Industry</div>
              <div className="pt-2">
             {formData.industry}
             </div>
          </div>


          {/* This block is for populating the Brand Location  */}
          <div className="col-start-1 col-span-1 row-start-2 row-span-1 justify-end">
              <div className="label-text font-semibold text-base ">Location</div>
              <div className="pt-2">
              {formData.location.city}
              {formData.location.state}
              {formData.location.country}
             </div>
          </div>


          {/* This block is for populating the POC Name, Phone Number and Email  */}
          <div className="col-start-1 col-span-1 row-start-3 row-span-1 justify-end">
              <div className="label-text font-semibold text-base ">Contact Person Name</div>
              <div className="pt-2">
             {formData.contactPersonName}
             </div>
          </div>
          <div className="col-start-2 col-span-1 row-start-3 row-span-1 justify-end">
              <div className="label-text font-semibold text-base ">Phone Number</div>
              <div className="pt-2">
             {formData.contactPhoneNumber}
             </div>
          </div>
          <div className="col-start-3 col-span-1 row-start-3 row-span-1 justify-end">
              <div className="label-text font-semibold text-base ">Email</div>
              <div className="pt-2">
             {formData.contactEmail}
             </div>
          </div>


          {/* This block is for populating Social Media Preference */}
          <div className="col-start-1 col-span-3 row-start-4 row-span-1 justify-end">
              <div className="label-text font-semibold text-base ">Social Media Preference</div>
              <div className="pt-2">
             {formData.preferences.join(", ")}
             </div>
          </div>
        </div>
      </div>


      {/* Button to submit the form */}
      <div className="col-start-8 col-span-1 row-start-9 row-span-1 justify-end pt-5 pl-10">
        <Button
          type="submit"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className="col-span-1 bg-muiblue-style"
          style={{
            padding: "12px 24px",
            textAlign: "right",
            whiteSpace: "nowrap",
          }}
        >
          Looks Good!
        </Button>
      </div>
    </div>
  );
};

export default ConfirmForm;
