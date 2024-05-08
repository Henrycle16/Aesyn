import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface GenderFormProps {
  formData: any;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
}

const GenderForm = ({
  formData,
  handleFormChange,
  handleNextStep,
}: GenderFormProps) => {
  return (
    <div className="flex flex-col w-full">
      {/* Handles Gender selection*/}
      <div className="w-4/6 mx-auto my-auto">
        <div className="form-control">
          <div className="label mb-5">
            <span className="label-text font-bold text-xl">
              Gender{" "}
              <Tooltip
                disableFocusListener
                placement="top"
                title="Brands sometimes look for specific gender(s) when searching. This is how they can filter for it."
              >
                <IconButton style={{ padding: "5px" }}>
                  <HelpOutlineIcon style={{ fontSize: "14px" }} />
                </IconButton>
              </Tooltip>
            </span>
          </div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={formData.gender}
              onChange={(e) => {
                handleFormChange(e);
              }}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                className="rounded border p-2 mb-4 w-full"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "grey",
                }}
              />
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                className="rounded border p-2 mb-4 w-full"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "grey",
                }}
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
                className="rounded border p-2 mb-4 w-full"
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "grey",
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={!formData.gender}
          onClick={handleNextStep}
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

export default GenderForm;
