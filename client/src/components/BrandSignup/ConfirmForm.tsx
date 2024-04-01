import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ConfirmFormProps {
  handlePrevStep: () => void;
  formData: any;
}

const ConfirmForm = ({ formData, handlePrevStep } : ConfirmFormProps) => {
  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
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
      <div className="col-start-3 col-span-5 row-start-2 row-span-3 justify-center items-center">
        <h1>
          Fuck You Henry
        </h1>
      </div>
    </div>

  );
}

export default ConfirmForm;