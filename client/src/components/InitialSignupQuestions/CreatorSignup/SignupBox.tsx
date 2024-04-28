"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UsernameForm from "./UsernameForm";
import ToDashboard from "../ToDashboard";
import LocationBox from "../LocationBox";
import SocialMediaSelect from "../SocialMediaSelect";
import NicheSelect from "./NicheSelect";
import GenderForm from "./GenderForm";
import ConfirmForm from "./ConfirmForm";

interface CreatorForm {
  userID: string;
  userName: string;
  gender: string;
  location: string;
  preferences: string[];
  niche: string[];
}

const creatorFormData: CreatorForm = {
  //TODO: grab userID after initial user signup page
  userID: "",
  userName: "",
  gender: "",
  location: "",
  preferences: [],
  niche: [],
};

const SignUpBox = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<CreatorForm>(creatorFormData);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);

  // Method to handle the next step
  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  // Method to handle the prev step
  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Method to handle the Form Change event
  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ! DELETE do not need
  // Method to handle the Gender change event
  // const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, gender: event.target.value });
  // };

  // Method to handle the location change event
  const handleLocationChange = (location: string) => {
    setFormData((prevData) => ({
      ...prevData,
      location: location,
    }));
  };

  // Method to handle the preference change event
  const handlePreferenceChange = (selected: string) => {
    setFormData((prevData) => {
      const preferences = prevData.preferences.includes(selected)
        ? prevData.preferences.filter((preference) => preference !== selected)
        : [...prevData.preferences, selected];
      return { ...prevData, preferences };
    });
  };

  const steps = [
    <UsernameForm
      key="userName"
      formData={formData}
      handleFormChange={handleFormChange}
      // handleNextStep={handleNextStep}
      setNextButtonDisabled={setNextButtonDisabled}
    />,
    <GenderForm
      key="GenderForm"
      formData={formData}
      // handleGenderChange={handleGenderChange}
      handleFormChange={handleFormChange}
      setNextButtonDisabled={setNextButtonDisabled}
      // handleNextStep={handleNextStep}
      // handlePrevStep={handlePrevStep}
    />,
    <LocationBox
      key="LocationBox"
      formData={formData}
      handleLocationChange={handleLocationChange}
      setNextButtonDisabled={setNextButtonDisabled}
      // handleNextStep={handleNextStep}
      // handlePrevStep={handlePrevStep}
    />,
    <SocialMediaSelect
      key="SocialMediaSelect"
      formData={formData}
      handlePreferenceChange={handlePreferenceChange}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <NicheSelect
      key="NicheSelect"
      formData={formData}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <ConfirmForm
      key="ConfirmForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
    />,
    <ToDashboard key="ToDashboard" handleNextStep={handleNextStep} />,
  ];

  return (
    // <div className="flex justify-center items-center">
    // <div className="mx-auto">
    // <Box
    //     className="mx-auto p-5 bg-base-200 rounded-box"
    //     sx={{ width: 900, height: 600, border: "1px solid black" }}
    //   >
    // <Box
    //   className="mx-auto bg-base-200 rounded-box"
    //   height={600}
    //   width={900}
    //   sx={{border: "1px solid black" }}
    // >
    //   {/* Render Form Parts Here */}
    //   {steps[step]}
    // </Box>
    // </div>
    <div className="border border-gray-300 rounded-md mx-auto max-w-3xl p-7">
      <form action="" className="min-h-[32rem] flex flex-col">
        {/* Back Button */}
        <div className="flex">
          <Button
            onClick={handlePrevStep}
            variant="text"
            startIcon={<ArrowBackIcon />}
            className={step === 0 ? "hidden" : ""}
            sx={{ padding: "12px 24px" }}
          >
            back
          </Button>
        </div>

        {/* Render Form Parts Here */}
        <div className="flex-1 flex justify-center items-center">
          {steps[step]}
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <Button
            disabled={isNextButtonDisabled}
            onClick={handleNextStep}
            // type="button"
            type={step !== 5 ? "button" : "submit"}
            variant="contained"
            className="bg-muiblue"
            endIcon={<ArrowForwardIcon />}
            style={{ padding: "12px 24px" }}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpBox;
