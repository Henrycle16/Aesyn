import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../styles/nicheSelect.css";

interface NicheSelectProps {
  formData: any;
  handleNicheChange: (selected: string) => void;
  handleNextStep: () => void;
}

// Niche Options List
const nichesArray = [
  { key: 0, label: "Lifestyle" },
  { key: 1, label: "Fashion" },
  { key: 2, label: "Beauty" },
  { key: 3, label: "Travel" },
  { key: 4, label: "Health & Fitness" },
  { key: 5, label: "Food & Drink" },
  { key: 6, label: "Model" },
  { key: 7, label: "Art & Photography" },
  { key: 8, label: "Comedy & Entertainment" },
  { key: 9, label: "Music & Dance" },
  { key: 10, label: "Entrepreneur & Business" },
  { key: 11, label: "Family & Children" },
  { key: 12, label: "Animals & Pets" },
  { key: 13, label: "Education" },
  { key: 14, label: "Adventure & Outdoors" },
  { key: 15, label: "Athlete & Sports" },
  { key: 16, label: "Technology" },
  { key: 17, label: "Gaming" },
  { key: 18, label: "Celebrity & Public Figure" },
  { key: 19, label: "Actor" },
  { key: 20, label: "Healthcare" },
  { key: 21, label: "LGBTQ2+" },
  { key: 22, label: "Vegan" },
  { key: 23, label: "Cannabis" },
  { key: 24, label: "Skilled Trades" },
  { key: 25, label: "Automotive" },
];

const ContactForm = ({
  formData,
  handleNicheChange,
  handleNextStep,
}: NicheSelectProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-10/12 mx-auto my-auto">
        {/*Niche Selection Label*/}
        <label className="form-control mb-6">
          <div className="label flex flex-col items-start">
            <span className="label-text font-bold text-lg">
              Select the niche(s) that best fit your content
            </span>
            <p className="label-text font-light text-sm">
              Select up to 6 niches
            </p>
          </div>
        </label>

        {/* Niche Select Options */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 overflow-y-auto max-h-[16rem]">
          {nichesArray.map((data) => (
            <Chip
              key={data.key}
              onClick={() => {
                if (formData.niche.length < 6 || formData.niche.includes(data.label)) {
                  handleNicheChange(data.label)
                }
              }}
              variant={
                formData.niche.includes(data.label) ? "filled" : "outlined"
              }
              label={data.label}
              className={
                "text-base h-10 w-[16.5rem] " +
                `${
                  formData.niche.includes(data.label)
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`
              }
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="self-end">
        <Button
          disabled={!formData.niche.length}
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

export default ContactForm;
